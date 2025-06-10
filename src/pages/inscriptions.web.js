// Backend functions for the Registration System
// src/backend/inscriptions.web.js

import { webMethod, Permissions } from 'wix-web-module';
import { wixData } from 'wix-data-backend';
import { triggeredEmails } from 'wix-crm-backend';
import { contacts } from 'wix-crm-backend';

// ===========================================
// WEB METHODS (Callable from frontend)
// ===========================================

/**
 * Save a new registration to the database
 */
export const saveRegistration = webMethod(
    Permissions.Anyone,
    async (registrationData) => {
        try {
            // Validate the data
            const validationResult = validateRegistrationData(registrationData);
            if (!validationResult.isValid) {
                throw new Error(validationResult.error);
            }
            
            // Prepare data for insertion
            const dataToInsert = {
                ...registrationData,
                _id: undefined,
                createdDate: new Date(),
                status: 'pending',
                paymentStatus: 'pending',
                year: '2025-2026'
            };
            
            // Save to collection
            const result = await wixData.insert('Inscriptions', dataToInsert);
            
            // Send confirmation emails
            await Promise.all([
                sendConfirmationEmailToParent(result),
                sendNotificationToAdmin(result)
            ]);
            
            // Create or update contact
            await createOrUpdateContact(registrationData.responsable);
            
            return {
                success: true,
                registrationId: result._id,
                message: 'Inscription enregistrée avec succès'
            };
            
        } catch (error) {
            console.error('Error saving registration:', error);
            return {
                success: false,
                error: error.message || 'Erreur lors de l\'enregistrement'
            };
        }
    }
);

/**
 * Get registration by ID
 */
export const getRegistration = webMethod(
    Permissions.SiteMember,
    async (registrationId) => {
        try {
            const result = await wixData.get('Inscriptions', registrationId);
            return {
                success: true,
                data: result
            };
        } catch (error) {
            console.error('Error fetching registration:', error);
            return {
                success: false,
                error: 'Inscription non trouvée'
            };
        }
    }
);

/**
 * Update registration status (admin only)
 */
export const updateRegistrationStatus = webMethod(
    Permissions.Admin,
    async (registrationId, status, paymentStatus) => {
        try {
            const updateData = {
                status,
                paymentStatus,
                lastModified: new Date()
            };
            
            const result = await wixData.update('Inscriptions', updateData, {
                _id: registrationId
            });
            
            // Send status update email if needed
            if (status === 'confirmed') {
                await sendConfirmationEmailToParent(result);
            }
            
            return {
                success: true,
                data: result
            };
            
        } catch (error) {
            console.error('Error updating registration:', error);
            return {
                success: false,
                error: 'Erreur lors de la mise à jour'
            };
        }
    }
);

/**
 * Get registrations by year (admin only)
 */
export const getRegistrationsByYear = webMethod(
    Permissions.Admin,
    async (year = '2025-2026') => {
        try {
            const results = await wixData.query('Inscriptions')
                .eq('year', year)
                .descending('createdDate')
                .find();
                
            return {
                success: true,
                data: results.items,
                total: results.totalCount
            };
            
        } catch (error) {
            console.error('Error fetching registrations:', error);
            return {
                success: false,
                error: 'Erreur lors de la récupération des inscriptions'
            };
        }
    }
);

/**
 * Calculate statistics for the admin dashboard
 */
export const getRegistrationStats = webMethod(
    Permissions.Admin,
    async (year = '2025-2026') => {
        try {
            const allRegistrations = await wixData.query('Inscriptions')
                .eq('year', year)
                .find();
                
            const stats = {
                totalRegistrations: allRegistrations.totalCount,
                totalChildren: 0,
                totalRevenue: 0,
                statusBreakdown: {
                    pending: 0,
                    confirmed: 0,
                    cancelled: 0
                },
                paymentBreakdown: {
                    pending: 0,
                    paid: 0,
                    partial: 0
                },
                activityBreakdown: {
                    coursArabe: 0,
                    coursCoran: 0,
                    animations: 0
                }
            };
            
            allRegistrations.items.forEach(registration => {
                // Count children
                stats.totalChildren += registration.enfants.length;
                
                // Sum revenue
                stats.totalRevenue += registration.total || 0;
                
                // Status breakdown
                stats.statusBreakdown[registration.status] = 
                    (stats.statusBreakdown[registration.status] || 0) + 1;
                
                // Payment breakdown
                stats.paymentBreakdown[registration.paymentStatus] = 
                    (stats.paymentBreakdown[registration.paymentStatus] || 0) + 1;
                
                // Activity breakdown
                registration.enfants.forEach(enfant => {
                    if (enfant.coursArabe) stats.activityBreakdown.coursArabe++;
                    if (enfant.coursCoran) stats.activityBreakdown.coursCoran++;
                    if (enfant.animations) stats.activityBreakdown.animations++;
                });
            });
            
            return {
                success: true,
                data: stats
            };
            
        } catch (error) {
            console.error('Error calculating stats:', error);
            return {
                success: false,
                error: 'Erreur lors du calcul des statistiques'
            };
        }
    }
);

// ===========================================
// INTERNAL HELPER FUNCTIONS
// ===========================================

function validateRegistrationData(data) {
    const errors = [];
    
    // Validate responsable
    if (!data.responsable) {
        errors.push('Informations du responsable manquantes');
    } else {
        if (!data.responsable.nom || !data.responsable.nom.trim()) {
            errors.push('Nom du responsable obligatoire');
        }
        if (!data.responsable.email || !isValidEmail(data.responsable.email)) {
            errors.push('Email valide obligatoire');
        }
        if (!data.responsable.telephone1 || !data.responsable.telephone1.trim()) {
            errors.push('Téléphone principal obligatoire');
        }
        if (!data.responsable.adresse || !data.responsable.adresse.trim()) {
            errors.push('Adresse obligatoire');
        }
    }
    
    // Validate enfants
    if (!data.enfants || data.enfants.length === 0) {
        errors.push('Au moins un enfant doit être inscrit');
    } else {
        data.enfants.forEach((enfant, index) => {
            if (!enfant.nom || !enfant.nom.trim()) {
                errors.push(`Nom obligatoire pour l'enfant ${index + 1}`);
            }
            if (!enfant.prenom || !enfant.prenom.trim()) {
                errors.push(`Prénom obligatoire pour l'enfant ${index + 1}`);
            }
            if (!enfant.dateNaissance) {
                errors.push(`Date de naissance obligatoire pour l'enfant ${index + 1}`);
            }
            if (!enfant.niveauScolaire) {
                errors.push(`Niveau scolaire obligatoire pour l'enfant ${index + 1}`);
            }
            if (!enfant.coursArabe && !enfant.coursCoran && !enfant.animations) {
                errors.push(`Au moins une activité obligatoire pour l'enfant ${index + 1}`);
            }
        });
    }
    
    // Validate other required fields
    if (typeof data.droitImage !== 'boolean') {
        errors.push('Autorisation droit à l\'image obligatoire');
    }
    
    if (!data.acceptConditions) {
        errors.push('Acceptation des conditions obligatoire');
    }
    
    if (!data.modePaiement) {
        errors.push('Mode de paiement obligatoire');
    }
    
    return {
        isValid: errors.length === 0,
        error: errors.join(', ')
    };
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

async function sendConfirmationEmailToParent(registration) {
    try {
        const emailData = {
            emailId: 'inscription-confirmation',
            recipients: [registration.responsable.email],
            variables: {
                nomResponsable: registration.responsable.nom,
                enfants: registration.enfants.map(e => `${e.prenom} ${e.nom}`).join(', '),
                nbEnfants: registration.enfants.length,
                total: registration.total,
                modePaiement: getPaymentMethodLabel(registration.modePaiement),
                registrationId: registration._id,
                year: registration.year || '2025-2026'
            }
        };
        
        await triggeredEmails.emailContact(emailData);
        console.log('Confirmation email sent to parent:', registration.responsable.email);
        
    } catch (error) {
        console.error('Error sending confirmation email:', error);
    }
}

async function sendNotificationToAdmin(registration) {
    try {
        const adminEmail = 'cours.arabe04@gmail.com';
        
        const enfantsDetails = registration.enfants.map(enfant => {
            const activites = [];
            if (enfant.coursArabe) activites.push('Arabe');
            if (enfant.coursCoran) activites.push('Coran');
            if (enfant.animations) activites.push('Animations');
            
            return `${enfant.prenom} ${enfant.nom} (${enfant.niveauScolaire}) - ${activites.join(', ')}`;
        }).join('\n');
        
        const emailData = {
            emailId: 'new-inscription-admin',
            recipients: [adminEmail],
            variables: {
                nomResponsable: registration.responsable.nom,
                email: registration.responsable.email,
                telephone: registration.responsable.telephone1,
                adresse: registration.responsable.adresse,
                nbEnfants: registration.enfants.length,
                enfantsDetails: enfantsDetails,
                total: registration.total,
                modePaiement: getPaymentMethodLabel(registration.modePaiement),
                droitImage: registration.droitImage ? 'Autorisé' : 'Non autorisé',
                registrationId: registration._id,
                timestamp: new Date().toLocaleString('fr-FR')
            }
        };
        
        await triggeredEmails.emailContact(emailData);
        console.log('Admin notification sent');
        
    } catch (error) {
        console.error('Error sending admin notification:', error);
    }
}

async function createOrUpdateContact(responsableData) {
    try {
        // Check if contact exists
        const existingContacts = await contacts.queryContacts()
            .eq('primaryEmail', responsableData.email)
            .find();
        
        if (existingContacts.items.length === 0) {
            // Create new contact
            const nameParts = responsableData.nom.trim().split(' ');
            const contactData = {
                firstName: nameParts[0],
                lastName: nameParts.slice(1).join(' ') || '',
                primaryEmail: responsableData.email,
                primaryPhone: responsableData.telephone1,
                addresses: [{
                    street: responsableData.adresse,
                    tag: 'HOME'
                }],
                source: 'SITE_REGISTRATION',
                customFields: {
                    'association-member': true,
                    'registration-year': '2025-2026'
                }
            };
            
            const newContact = await contacts.createContact(contactData);
            console.log('Contact created:', newContact._id);
            
        } else {
            // Update existing contact
            const existingContact = existingContacts.items[0];
            const updateData = {
                primaryPhone: responsableData.telephone1,
                addresses: [{
                    street: responsableData.adresse,
                    tag: 'HOME'
                }],
                customFields: {
                    ...existingContact.customFields,
                    'association-member': true,
                    'registration-year': '2025-2026',
                    'last-registration': new Date().toISOString()
                }
            };
            
            await contacts.updateContact(existingContact._id, updateData);
            console.log('Contact updated:', existingContact._id);
        }
        
    } catch (error) {
        console.error('Error managing contact:', error);
    }
}

function getPaymentMethodLabel(value) {
    const methods = {
        'cheque': 'Chèque à l\'ordre de l\'Association Plume d\'Espoir',
        'virement': 'Virement bancaire',
        'especes': 'Espèces auprès du Trésorier',
        'contact': 'À définir (contact requis)'
    };
    return methods[value] || value;
}

// ===========================================
// DATA VALIDATION AND BUSINESS LOGIC
// ===========================================

/**
 * Calculate pricing based on business rules
 */
export const calculatePricing = webMethod(
    Permissions.Anyone,
    (numberOfChildren) => {
        const PRICE_PER_CHILD = 140;
        const DISCOUNT_PRICE = 70;
        
        let total = 0;
        
        if (numberOfChildren <= 2) {
            total = numberOfChildren * PRICE_PER_CHILD;
        } else {
            // First 2 children at full price, others at discount
            total = (2 * PRICE_PER_CHILD) + ((numberOfChildren - 2) * DISCOUNT_PRICE);
        }
        
        return {
            numberOfChildren,
            pricePerChild: PRICE_PER_CHILD,
            discountPrice: DISCOUNT_PRICE,
            totalAmount: total,
            breakdown: numberOfChildren <= 2 
                ? `${numberOfChildren} × ${PRICE_PER_CHILD}€`
                : `2 × ${PRICE_PER_CHILD}€ + ${numberOfChildren - 2} × ${DISCOUNT_PRICE}€`
        };
    }
);

/**
 * Validate child age for Arabic courses
 */
export const validateChildAge = webMethod(
    Permissions.Anyone,
    (dateNaissance, activity) => {
        if (activity !== 'coursArabe') {
            return { isValid: true };
        }
        
        const today = new Date();
        const birthDate = new Date(dateNaissance);
        const age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        
        let actualAge = age;
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            actualAge = age - 1;
        }
        
        return {
            isValid: actualAge >= 6,
            age: actualAge,
            message: actualAge < 6 ? 'Les cours d\'arabe sont disponibles à partir de 6 ans' : ''
        };
    }
);

// ===========================================
// EXPORT CONFIGURATION
// ===========================================

/* 
 * Collection Schema for "Inscriptions":
 * 
 * {
 *   "_id": "string",
 *   "createdDate": "date",
 *   "year": "string",
 *   "status": "string", // pending, confirmed, cancelled
 *   "paymentStatus": "string", // pending, paid, partial
 *   "responsable": {
 *     "nom": "string",
 *     "adresse": "string", 
 *     "email": "string",
 *     "telephone1": "string",
 *     "telephone2": "string"
 *   },
 *   "enfants": [{
 *     "id": "number",
 *     "nom": "string",
 *     "prenom": "string", 
 *     "dateNaissance": "date",
 *     "niveauScolaire": "string",
 *     "coursArabe": "boolean",
 *     "coursCoran": "boolean", 
 *     "animations": "boolean"
 *   }],
 *   "droitImage": "boolean",
 *   "acceptConditions": "boolean",
 *   "modePaiement": "string",
 *   "total": "number",
 *   "lastModified": "date"
 * }
 */