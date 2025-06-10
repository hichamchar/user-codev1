// Professional Registration Page for Association Plume d'Espoir
// src/pages/Inscription.wsvko.js

import { wixData } from 'wix-data';
import { wixLocation } from 'wix-location-frontend';
import wixWindow from 'wix-window-frontend';
import { triggeredEmails } from 'wix-crm-backend';
import { contacts } from 'wix-crm-backend';

// Page state management
let currentStep = 1;
let formData = {
    responsable: {},
    enfants: [],
    droitImage: false,
    acceptConditions: false,
    modePaiement: '',
    total: 0
};

// Constants
const STEPS_COUNT = 4;
const PRICE_PER_CHILD = 140;
const DISCOUNT_PRICE = 70; // Price from 3rd child onwards
const COLLECTION_NAME = "Inscriptions";

$w.onReady(function () {
    initializePage();
    setupEventHandlers();
    showStep(1);
});

// ===========================================
// INITIALIZATION FUNCTIONS
// ===========================================

function initializePage() {
    // Hide all steps initially
    for (let i = 1; i <= STEPS_COUNT; i++) {
        $w(`#step${i}`).hide();
    }
    
    // Initialize form elements
    initializeFormElements();
    
    // Add first child by default
    addEnfant();
    
    // Hide alerts
    hideAllAlerts();
    
    // Update progress
    updateProgressBar(1);
}

function initializeFormElements() {
    // Pre-populate niveau scolaire options
    const niveauOptions = [
        { label: "Sélectionner le niveau", value: "" },
        { label: "Maternelle PS", value: "Maternelle PS" },
        { label: "Maternelle MS", value: "Maternelle MS" },
        { label: "Maternelle GS", value: "Maternelle GS" },
        { label: "CP", value: "CP" },
        { label: "CE1", value: "CE1" },
        { label: "CE2", value: "CE2" },
        { label: "CM1", value: "CM1" },
        { label: "CM2", value: "CM2" },
        { label: "6ème", value: "6ème" },
        { label: "5ème", value: "5ème" },
        { label: "4ème", value: "4ème" },
        { label: "3ème", value: "3ème" },
        { label: "Lycée", value: "Lycée" },
        { label: "Adulte", value: "Adulte" }
    ];
    
    // Set up payment method options
    $w('#radioGroupModePaiement').options = [
        { label: "Chèque à l'ordre de l'Association Plume d'Espoir", value: "cheque" },
        { label: "Virement bancaire (IBAN : FR76-3000-4007-0600-0101-6768-102)", value: "virement" },
        { label: "Espèces auprès du Trésorier", value: "especes" },
        { label: "Je souhaite être contacté pour le paiement", value: "contact" }
    ];
    
    // Set up droit image options
    $w('#radioGroupDroitImage').options = [
        { label: "J'autorise l'association à photographier/filmer mon/mes enfant(s)", value: "oui" },
        { label: "Je n'autorise pas l'association à photographier/filmer mon/mes enfant(s)", value: "non" }
    ];
}

function setupEventHandlers() {
    // Navigation buttons
    $w('#btnNext1').onClick(() => nextStep());
    $w('#btnNext2').onClick(() => nextStep());
    $w('#btnNext3').onClick(() => nextStep());
    $w('#btnPrev2').onClick(() => prevStep());
    $w('#btnPrev3').onClick(() => prevStep());
    $w('#btnPrev4').onClick(() => prevStep());
    $w('#btnSubmit').onClick(() => submitRegistration());
    
    // Add child button
    $w('#btnAddEnfant').onClick(() => addEnfant());
    
    // Form field change handlers
    setupFormFieldHandlers();
    
    // Validation on field change
    setupRealTimeValidation();
}

function setupFormFieldHandlers() {
    // Responsable legal fields
    ['#inputNomResponsable', '#textareaAdresse', '#inputEmail', 
     '#inputTelephone1', '#inputTelephone2'].forEach(id => {
        if ($w(id)) {
            $w(id).onChange(() => {
                const fieldName = id.replace('#input', '').replace('#textarea', '').toLowerCase();
                formData.responsable[fieldName] = $w(id).value;
            });
        }
    });
    
    // Payment and authorization handlers
    $w('#radioGroupModePaiement').onChange(() => {
        formData.modePaiement = $w('#radioGroupModePaiement').value;
    });
    
    $w('#radioGroupDroitImage').onChange(() => {
        formData.droitImage = $w('#radioGroupDroitImage').value === 'oui';
    });
    
    $w('#checkboxConditions').onChange(() => {
        formData.acceptConditions = $w('#checkboxConditions').checked;
    });
}

function setupRealTimeValidation() {
    // Email validation
    $w('#inputEmail').onInput(() => {
        const email = $w('#inputEmail').value;
        if (email && !isValidEmail(email)) {
            $w('#inputEmail').style.borderColor = '#dc3545';
        } else {
            $w('#inputEmail').style.borderColor = '#ced4da';
        }
    });
    
    // Phone validation
    ['#inputTelephone1', '#inputTelephone2'].forEach(id => {
        if ($w(id)) {
            $w(id).onInput(() => {
                const phone = $w(id).value;
                if (phone && !isValidPhone(phone)) {
                    $w(id).style.borderColor = '#dc3545';
                } else {
                    $w(id).style.borderColor = '#ced4da';
                }
            });
        }
    });
}

// ===========================================
// STEP NAVIGATION FUNCTIONS
// ===========================================

function showStep(step) {
    // Hide all steps
    for (let i = 1; i <= STEPS_COUNT; i++) {
        $w(`#step${i}`).hide();
    }
    
    // Show current step
    $w(`#step${step}`).show();
    currentStep = step;
    
    // Update progress bar
    updateProgressBar(step);
    
    // Update step-specific content
    if (step === 4) {
        updateSummary();
        updateTotal();
    }
    
    // Scroll to top
    wixWindow.scrollTo(0, 0);
}

function nextStep() {
    if (validateCurrentStep()) {
        if (currentStep < STEPS_COUNT) {
            showStep(currentStep + 1);
        }
    }
}

function prevStep() {
    if (currentStep > 1) {
        showStep(currentStep - 1);
    }
}

function updateProgressBar(step) {
    const progress = (step / STEPS_COUNT) * 100;
    $w('#progressBar').value = progress;
    $w('#textProgress').text = `Étape ${step} sur ${STEPS_COUNT}`;
}

// ===========================================
// CHILDREN MANAGEMENT FUNCTIONS
// ===========================================

function addEnfant() {
    if (formData.enfants.length >= 5) {
        showErrorAlert('Maximum 5 enfants autorisés par inscription.');
        return;
    }
    
    const enfantId = Date.now(); // Unique ID
    const enfant = {
        id: enfantId,
        nom: '',
        prenom: '',
        dateNaissance: '',
        niveauScolaire: '',
        coursArabe: false,
        coursCoran: false,
        animations: false
    };
    
    formData.enfants.push(enfant);
    createEnfantContainer(enfant, formData.enfants.length);
    updateTotal();
}

function createEnfantContainer(enfant, index) {
    // This would be implemented in the Wix Editor by:
    // 1. Creating a repeater for children
    // 2. Setting up template with form fields
    // 3. Binding data to the repeater
    
    // For code reference, this shows the structure:
    const enfantData = {
        enfantId: enfant.id,
        enfantNumber: index,
        nom: '',
        prenom: '',
        dateNaissance: '',
        niveauScolaire: '',
        activites: []
    };
    
    // In actual implementation, you would:
    // - Use $w('#repeaterEnfants').data = formData.enfants
    // - Set up onChange handlers for each field in the repeater
    console.log('Creating enfant container for:', enfantData);
}

function removeEnfant(enfantId) {
    if (formData.enfants.length <= 1) {
        showErrorAlert('Au moins un enfant doit être inscrit.');
        return;
    }
    
    formData.enfants = formData.enfants.filter(e => e.id !== enfantId);
    updateTotal();
    
    // Update repeater data
    // $w('#repeaterEnfants').data = formData.enfants;
}

function updateEnfantData(enfantId, field, value) {
    const enfant = formData.enfants.find(e => e.id === enfantId);
    if (enfant) {
        enfant[field] = value;
        updateTotal();
    }
}

// ===========================================
// VALIDATION FUNCTIONS
// ===========================================

function validateCurrentStep() {
    hideAllAlerts();
    
    switch (currentStep) {
        case 1:
            return validateStep1();
        case 2:
            return validateStep2();
        case 3:
            return validateStep3();
        case 4:
            return validateStep4();
        default:
            return true;
    }
}

function validateStep1() {
    const errors = [];
    
    // Required fields validation
    if (!$w('#inputNomResponsable').value.trim()) {
        errors.push('Le nom du responsable légal est obligatoire.');
    }
    
    if (!$w('#textareaAdresse').value.trim()) {
        errors.push('L\'adresse complète est obligatoire.');
    }
    
    const email = $w('#inputEmail').value.trim();
    if (!email) {
        errors.push('L\'email est obligatoire.');
    } else if (!isValidEmail(email)) {
        errors.push('L\'email n\'est pas valide.');
    }
    
    const phone = $w('#inputTelephone1').value.trim();
    if (!phone) {
        errors.push('Le téléphone principal est obligatoire.');
    } else if (!isValidPhone(phone)) {
        errors.push('Le numéro de téléphone n\'est pas valide.');
    }
    
    if (errors.length > 0) {
        showErrorAlert(errors.join('\n'));
        return false;
    }
    
    // Update form data
    formData.responsable = {
        nom: $w('#inputNomResponsable').value.trim(),
        adresse: $w('#textareaAdresse').value.trim(),
        email: email,
        telephone1: phone,
        telephone2: $w('#inputTelephone2').value.trim()
    };
    
    return true;
}

function validateStep2() {
    if (formData.enfants.length === 0) {
        showErrorAlert('Vous devez inscrire au moins un enfant.');
        return false;
    }
    
    for (let i = 0; i < formData.enfants.length; i++) {
        const enfant = formData.enfants[i];
        
        if (!enfant.nom || !enfant.prenom || !enfant.dateNaissance || !enfant.niveauScolaire) {
            showErrorAlert(`Toutes les informations de l'enfant ${i + 1} sont obligatoires.`);
            return false;
        }
        
        if (!enfant.coursArabe && !enfant.coursCoran && !enfant.animations) {
            showErrorAlert(`Vous devez sélectionner au moins une activité pour l'enfant ${i + 1}.`);
            return false;
        }
        
        // Validate age for Arabic courses
        if (enfant.coursArabe && !isAgeValidForArabic(enfant.dateNaissance)) {
            showErrorAlert(`Les cours d'arabe sont disponibles à partir de 6 ans (Enfant ${i + 1}).`);
            return false;
        }
    }
    
    return true;
}

function validateStep3() {
    if (!$w('#radioGroupDroitImage').value) {
        showErrorAlert('Vous devez choisir une option pour le droit à l\'image.');
        return false;
    }
    
    if (!$w('#checkboxConditions').checked) {
        showErrorAlert('Vous devez accepter les conditions générales.');
        return false;
    }
    
    formData.droitImage = $w('#radioGroupDroitImage').value === 'oui';
    formData.acceptConditions = true;
    
    return true;
}

function validateStep4() {
    if (!$w('#radioGroupModePaiement').value) {
        showErrorAlert('Vous devez choisir un mode de paiement.');
        return false;
    }
    
    formData.modePaiement = $w('#radioGroupModePaiement').value;
    return true;
}

// ===========================================
// UTILITY VALIDATION FUNCTIONS
// ===========================================

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPhone(phone) {
    const phoneRegex = /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
}

function isAgeValidForArabic(dateNaissance) {
    const today = new Date();
    const birthDate = new Date(dateNaissance);
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        return age - 1 >= 6;
    }
    
    return age >= 6;
}

// ===========================================
// PRICING FUNCTIONS
// ===========================================

function calculateTotal() {
    const nbEnfants = formData.enfants.length;
    let total = 0;
    
    if (nbEnfants <= 2) {
        total = nbEnfants * PRICE_PER_CHILD;
    } else {
        // First 2 children at full price, others at discount
        total = (2 * PRICE_PER_CHILD) + ((nbEnfants - 2) * DISCOUNT_PRICE);
    }
    
    return total;
}

function updateTotal() {
    const total = calculateTotal();
    formData.total = total;
    
    if ($w('#textTotal')) {
        $w('#textTotal').text = `${total}€`;
    }
    
    if ($w('#textNbEnfants')) {
        $w('#textNbEnfants').text = `${formData.enfants.length} enfant(s)`;
    }
}

function updateSummary() {
    // Update summary display
    if ($w('#textSummaryResponsable')) {
        $w('#textSummaryResponsable').text = formData.responsable.nom;
    }
    
    if ($w('#textSummaryEmail')) {
        $w('#textSummaryEmail').text = formData.responsable.email;
    }
    
    if ($w('#textSummaryNbEnfants')) {
        $w('#textSummaryNbEnfants').text = `${formData.enfants.length} enfant(s)`;
    }
    
    // Build children summary
    let enfantsSummary = '';
    formData.enfants.forEach((enfant, index) => {
        const activites = [];
        if (enfant.coursArabe) activites.push('Cours d\'arabe');
        if (enfant.coursCoran) activites.push('Cours de Coran');
        if (enfant.animations) activites.push('Animations');
        
        enfantsSummary += `Enfant ${index + 1}: ${enfant.prenom} ${enfant.nom} (${enfant.niveauScolaire})\n`;
        enfantsSummary += `Activités: ${activites.join(', ')}\n\n`;
    });
    
    if ($w('#textEnfantsSummary')) {
        $w('#textEnfantsSummary').text = enfantsSummary;
    }
    
    updateTotal();
}

// ===========================================
// FORM SUBMISSION FUNCTIONS
// ===========================================

async function submitRegistration() {
    if (!validateCurrentStep()) {
        return;
    }
    
    try {
        // Show loading state
        $w('#btnSubmit').disable();
        $w('#loadingIcon').show();
        $w('#textSubmitting').show();
        
        // Prepare data for submission
        const submissionData = {
            timestamp: new Date(),
            status: 'pending',
            ...formData,
            // Additional metadata
            source: 'site_inscription',
            year: '2025-2026'
        };
        
        // Save to Wix Data
        const savedItem = await saveToWixData(submissionData);
        
        // Create contact if doesn't exist
        await createOrUpdateContact(formData.responsable);
        
        // Send confirmation email
        await sendConfirmationEmail(formData.responsable.email, submissionData);
        
        // Send notification to admin
        await sendAdminNotification(submissionData);
        
        // Show success message
        showSuccessAlert();
        
        // Redirect after delay
        setTimeout(() => {
            wixLocation.to('/merci-inscription');
        }, 3000);
        
    } catch (error) {
        console.error('Submission error:', error);
        showErrorAlert('Une erreur s\'est produite. Veuillez réessayer ou nous contacter directement.');
        
        // Re-enable submit button
        $w('#btnSubmit').enable();
        $w('#loadingIcon').hide();
        $w('#textSubmitting').hide();
    }
}

async function saveToWixData(data) {
    try {
        const toInsert = {
            ...data,
            _id: undefined // Let Wix generate the ID
        };
        
        const result = await wixData.insert(COLLECTION_NAME, toInsert);
        console.log('Registration saved:', result._id);
        return result;
        
    } catch (error) {
        console.error('Error saving to Wix Data:', error);
        throw error;
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
            const contactData = {
                firstName: responsableData.nom.split(' ')[0],
                lastName: responsableData.nom.split(' ').slice(1).join(' '),
                primaryEmail: responsableData.email,
                primaryPhone: responsableData.telephone1,
                addresses: [{
                    street: responsableData.adresse,
                    tag: 'HOME'
                }],
                source: 'SITE_REGISTRATION'
            };
            
            await contacts.createContact(contactData);
            console.log('Contact created for:', responsableData.email);
        } else {
            console.log('Contact already exists:', responsableData.email);
        }
        
    } catch (error) {
        console.error('Error managing contact:', error);
        // Don't throw - contact creation is not critical
    }
}

async function sendConfirmationEmail(email, data) {
    try {
        const emailData = {
            emailId: 'inscription-confirmation', // Template ID in Wix
            recipients: [email],
            variables: {
                nomResponsable: data.responsable.nom,
                nbEnfants: data.enfants.length,
                total: data.total,
                modePaiement: getPaymentMethodLabel(data.modePaiement)
            }
        };
        
        await triggeredEmails.emailContact(emailData);
        console.log('Confirmation email sent to:', email);
        
    } catch (error) {
        console.error('Error sending confirmation email:', error);
        // Don't throw - email is not critical for registration
    }
}

async function sendAdminNotification(data) {
    try {
        const adminEmail = 'cours.arabe04@gmail.com';
        const emailData = {
            emailId: 'new-inscription-admin', // Admin template ID
            recipients: [adminEmail],
            variables: {
                nomResponsable: data.responsable.nom,
                email: data.responsable.email,
                telephone: data.responsable.telephone1,
                nbEnfants: data.enfants.length,
                total: data.total,
                timestamp: data.timestamp.toLocaleString('fr-FR')
            }
        };
        
        await triggeredEmails.emailContact(emailData);
        console.log('Admin notification sent');
        
    } catch (error) {
        console.error('Error sending admin notification:', error);
        // Don't throw - admin notification is not critical
    }
}

// ===========================================
// UI HELPER FUNCTIONS
// ===========================================

function showSuccessAlert() {
    hideAllAlerts();
    $w('#alertSuccess').show();
    $w('#textSuccess').text = 'Votre inscription a été envoyée avec succès ! Vous recevrez une confirmation par email.';
    wixWindow.scrollTo(0, 0);
}

function showErrorAlert(message) {
    hideAllAlerts();
    $w('#alertError').show();
    $w('#textError').text = message;
    wixWindow.scrollTo(0, 0);
}

function hideAllAlerts() {
    if ($w('#alertSuccess')) $w('#alertSuccess').hide();
    if ($w('#alertError')) $w('#alertError').hide();
}

function getPaymentMethodLabel(value) {
    const methods = {
        'cheque': 'Chèque',
        'virement': 'Virement bancaire',
        'especes': 'Espèces',
        'contact': 'À définir (contact requis)'
    };
    return methods[value] || value;
}

// ===========================================
// EXPORT FOR TESTING (if needed)
// ===========================================

export {
    validateStep1,
    validateStep2,
    validateStep3,
    calculateTotal,
    isValidEmail,
    isValidPhone
};