<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Inscription Association Plume d'Espoir</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            background-color: #f8f9fa;
        }
        
        .form-container {
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            background: white;
            border-radius: 12px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.1);
        }
        
        .header {
            text-align: center;
            margin-bottom: 30px;
            padding: 20px;
            background: linear-gradient(135deg, #007bff, #0056b3);
            color: white;
            border-radius: 8px;
        }
        
        .header h1 {
            font-size: 24px;
            margin-bottom: 10px;
        }
        
        .header p {
            font-size: 14px;
            opacity: 0.9;
        }
        
        .progress-bar {
            width: 100%;
            height: 6px;
            background-color: #e9ecef;
            border-radius: 3px;
            margin-bottom: 20px;
            overflow: hidden;
        }
        
        .progress-fill {
            height: 100%;
            background: linear-gradient(90deg, #007bff, #28a745);
            width: 25%;
            transition: width 0.3s ease;
        }
        
        .step {
            display: none;
            animation: fadeIn 0.3s ease;
        }
        
        .step.active {
            display: block;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        .form-group {
            margin-bottom: 20px;
        }
        
        .form-group label {
            display: block;
            margin-bottom: 8px;
            font-weight: 600;
            color: #2c3e50;
        }
        
        .form-group input,
        .form-group textarea,
        .form-group select {
            width: 100%;
            padding: 12px 16px;
            border: 2px solid #e9ecef;
            border-radius: 8px;
            font-size: 16px;
            transition: border-color 0.3s ease, box-shadow 0.3s ease;
        }
        
        .form-group input:focus,
        .form-group textarea:focus,
        .form-group select:focus {
            outline: none;
            border-color: #007bff;
            box-shadow: 0 0 0 3px rgba(0,123,255,0.1);
        }
        
        .form-row {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
        }
        
        .enfant-container {
            border: 2px solid #e9ecef;
            border-radius: 8px;
            padding: 20px;
            margin-bottom: 20px;
            background: #f8f9fa;
            position: relative;
        }
        
        .enfant-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 15px;
        }
        
        .enfant-title {
            font-size: 18px;
            font-weight: 600;
            color: #007bff;
        }
        
        .remove-btn {
            background: #dc3545;
            color: white;
            border: none;
            padding: 8px 12px;
            border-radius: 6px;
            cursor: pointer;
            font-size: 12px;
            transition: background 0.3s ease;
        }
        
        .remove-btn:hover {
            background: #c82333;
        }
        
        .checkbox-group {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 15px;
            margin-top: 10px;
        }
        
        .checkbox-item {
            display: flex;
            align-items: center;
            padding: 10px;
            background: white;
            border-radius: 6px;
            border: 2px solid #e9ecef;
            transition: all 0.3s ease;
        }
        
        .checkbox-item:hover {
            border-color: #007bff;
            background: #f8f9ff;
        }
        
        .checkbox-item input[type="checkbox"] {
            width: auto;
            margin-right: 10px;
            transform: scale(1.2);
        }
        
        .radio-group {
            display: grid;
            gap: 10px;
            margin-top: 10px;
        }
        
        .radio-item {
            display: flex;
            align-items: center;
            padding: 12px;
            background: white;
            border-radius: 6px;
            border: 2px solid #e9ecef;
            cursor: pointer;
            transition: all 0.3s ease;
        }
        
        .radio-item:hover {
            border-color: #007bff;
            background: #f8f9ff;
        }
        
        .radio-item input[type="radio"] {
            width: auto;
            margin-right: 10px;
            transform: scale(1.2);
        }
        
        .btn {
            padding: 12px 24px;
            border: none;
            border-radius: 8px;
            font-size: 16px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            display: inline-flex;
            align-items: center;
            gap: 8px;
        }
        
        .btn-primary {
            background: #007bff;
            color: white;
        }
        
        .btn-primary:hover {
            background: #0056b3;
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(0,123,255,0.3);
        }
        
        .btn-secondary {
            background: #6c757d;
            color: white;
        }
        
        .btn-secondary:hover {
            background: #545b62;
        }
        
        .btn-success {
            background: #28a745;
            color: white;
        }
        
        .btn-success:hover {
            background: #1e7e34;
        }
        
        .btn:disabled {
            background: #6c757d;
            cursor: not-allowed;
            transform: none;
        }
        
        .navigation {
            display: flex;
            justify-content: space-between;
            margin-top: 30px;
            padding-top: 20px;
            border-top: 2px solid #e9ecef;
        }
        
        .add-enfant-btn {
            background: #17a2b8;
            color: white;
            border: none;
            padding: 12px 20px;
            border-radius: 8px;
            cursor: pointer;
            font-weight: 600;
            transition: all 0.3s ease;
            margin-bottom: 20px;
        }
        
        .add-enfant-btn:hover {
            background: #117a8b;
            transform: translateY(-2px);
        }
        
        .total-section {
            background: linear-gradient(135deg, #28a745, #20c997);
            color: white;
            padding: 20px;
            border-radius: 8px;
            margin-bottom: 20px;
            text-align: center;
        }
        
        .total-amount {
            font-size: 24px;
            font-weight: bold;
            margin-top: 10px;
        }
        
        .alert {
            padding: 15px;
            border-radius: 8px;
            margin-bottom: 20px;
            display: none;
        }
        
        .alert-success {
            background: #d4edda;
            border: 1px solid #c3e6cb;
            color: #155724;
        }
        
        .alert-error {
            background: #f8d7da;
            border: 1px solid #f5c6cb;
            color: #721c24;
        }
        
        .summary-box {
            background: #f8f9fa;
            padding: 20px;
            border-radius: 8px;
            margin-bottom: 20px;
        }
        
        .summary-item {
            display: flex;
            justify-content: space-between;
            margin-bottom: 10px;
            padding-bottom: 10px;
            border-bottom: 1px solid #dee2e6;
        }
        
        .summary-item:last-child {
            border-bottom: none;
            font-weight: bold;
            font-size: 18px;
            color: #007bff;
        }
        
        .loading {
            display: none;
            text-align: center;
            margin: 20px 0;
        }
        
        .spinner {
            border: 4px solid #f3f3f3;
            border-top: 4px solid #007bff;
            border-radius: 50%;
            width: 40px;
            height: 40px;
            animation: spin 1s linear infinite;
            margin: 0 auto 10px;
        }
        
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        
        @media (max-width: 768px) {
            .form-container {
                margin: 10px;
                padding: 15px;
            }
            
            .form-row {
                grid-template-columns: 1fr;
            }
            
            .checkbox-group {
                grid-template-columns: 1fr;
            }
            
            .navigation {
                flex-direction: column;
                gap: 10px;
            }
        }
    </style>
</head>
<body>
    <div class="form-container">
        <div class="header">
            <h1>Association Plume d'Espoir</h1>
            <p>278, Avenue Georges Pompidou - 04100 MANOSQUE</p>
            <p>Email: cours.arabe04@gmail.com - Tél: 07.49.31.14.70</p>
            <p><strong>Inscription aux cours arabe 2025-2026</strong></p>
        </div>
        
        <div class="progress-bar">
            <div class="progress-fill" id="progressFill"></div>
        </div>
        
        <div class="alert alert-success" id="successAlert">
            <strong>Succès !</strong> Votre inscription a été envoyée avec succès. Vous recevrez une confirmation par email.
        </div>
        
        <div class="alert alert-error" id="errorAlert">
            <strong>Erreur !</strong> <span id="errorMessage"></span>
        </div>
        
        <form id="inscriptionForm">
            <!-- Étape 1: Responsable légal -->
            <div class="step active" id="step1">
                <h2>Informations du responsable légal</h2>
                
                <div class="form-row">
                    <div class="form-group">
                        <label for="nomResponsable">Nom et prénom du responsable légal *</label>
                        <input type="text" id="nomResponsable" name="nomResponsable" required>
                    </div>
                </div>
                
                <div class="form-group">
                    <label for="adresse">Adresse complète *</label>
                    <textarea id="adresse" name="adresse" rows="3" required></textarea>
                </div>
                
                <div class="form-row">
                    <div class="form-group">
                        <label for="email">Email *</label>
                        <input type="email" id="email" name="email" required>
                    </div>
                    <div class="form-group">
                        <label for="telephone1">Téléphone principal *</label>
                        <input type="tel" id="telephone1" name="telephone1" required>
                    </div>
                </div>
                
                <div class="form-group">
                    <label for="telephone2">Téléphone secondaire (optionnel)</label>
                    <input type="tel" id="telephone2" name="telephone2">
                </div>
                
                <div class="navigation">
                    <div></div>
                    <button type="button" class="btn btn-primary" onclick="nextStep()">Suivant →</button>
                </div>
            </div>
            
            <!-- Étape 2: Enfants -->
            <div class="step" id="step2">
                <h2>Informations des enfants</h2>
                
                <button type="button" class="add-enfant-btn" onclick="addEnfant()">+ Ajouter un enfant</button>
                
                <div id="enfantsContainer">
                    <!-- Les enfants seront ajoutés dynamiquement ici -->
                </div>
                
                <div class="navigation">
                    <button type="button" class="btn btn-secondary" onclick="prevStep()">← Précédent</button>
                    <button type="button" class="btn btn-primary" onclick="nextStep()">Suivant →</button>
                </div>
            </div>
            
            <!-- Étape 3: Autorisations -->
            <div class="step" id="step3">
                <h2>Autorisations et conditions</h2>
                
                <div class="form-group">
                    <label>Autorisation droit à l'image *</label>
                    <p style="font-size: 14px; color: #666; margin-bottom: 15px;">
                         hicham L'association peut être amenée à réaliser des photographies ou vidéos lors des activités. 
                        Ces images seront utilisées exclusivement pour la communication de l'association.
                    </p>
                    <div class="radio-group">
                        <label class="radio-item">
                            <input type="radio" name="droitImage" value="oui" required>
                            J'autorise l'association Plume d'Espoir à photographier/filmer et exploiter l'image de mon/mes enfant(s)
                        </label>
                        <label class="radio-item">
                            <input type="radio" name="droitImage" value="non" required>
                            Je n'autorise pas l'association Plume d'Espoir à photographier/filmer et exploiter l'image de mon/mes enfant(s)
                        </label>
                    </div>
                </div>
                
                <div class="form-group">
                    <div class="checkbox-item">
                        <input type="checkbox" id="conditions" name="conditions" required>
                        <label for="conditions">
                            J'ai pris connaissance et j'accepte les conditions générales de l'association 
                            (tarifs, règlement intérieur, fournitures à prévoir) *
                        </label>
                    </div>
                </div>
                
                <div style="background: #e9ecef; padding: 15px; border-radius: 8px; margin-top: 20px;">
                    <h4>Rappels importants :</h4>
                    <ul style="margin-left: 20px; margin-top: 10px;">
                        <li>Tarif : 140€ par enfant/an (70€ à partir du 3ème enfant)</li>
                        <li>Fournir l'attestation d'assurance de responsabilité civile</li>
                        <li>Fournitures scolaires à prévoir (liste détaillée sera fournie)</li>
                        <li>Livres à acheter (se rapprocher de l'association)</li>
                    </ul>
                </div>
                
                <div class="navigation">
                    <button type="button" class="btn btn-secondary" onclick="prevStep()">← Précédent</button>
                    <button type="button" class="btn btn-primary" onclick="nextStep()">Suivant →</button>
                </div>
            </div>
            
            <!-- Étape 4: Récapitulatif et paiement -->
            <div class="step" id="step4">
                <h2>Récapitulatif et finalisation</h2>
                
                <div class="summary-box" id="summaryBox">
                    <!-- Le récapitulatif sera généré dynamiquement -->
                </div>
                
                <div class="total-section">
                    <h3>Total à payer</h3>
                    <div class="total-amount" id="totalAmount">0€</div>
                </div>
                
                <div class="form-group">
                    <label>Mode de paiement souhaité *</label>
                    <div class="radio-group">
                        <label class="radio-item">
                            <input type="radio" name="modePaiement" value="cheque" required>
                            Chèque à l'ordre de l'Association Plume d'Espoir
                        </label>
                        <label class="radio-item">
                            <input type="radio" name="modePaiement" value="virement" required>
                            Virement bancaire (IBAN : FR76-3000-4007-0600-0101-6768-102)
                        </label>
                        <label class="radio-item">
                            <input type="radio" name="modePaiement" value="especes" required>
                            Espèces auprès du Trésorier de l'Association
                        </label>
                        <label class="radio-item">
                            <input type="radio" name="modePaiement" value="contact" required>
                            Je souhaite être contacté pour le paiement
                        </label>
                    </div>
                </div>
                
                <div class="loading" id="loading">
                    <div class="spinner"></div>
                    <p>Envoi de votre inscription en cours...</p>
                </div>
                
                <div class="navigation">
                    <button type="button" class="btn btn-secondary" onclick="prevStep()">← Précédent</button>
                    <button type="submit" class="btn btn-success" id="submitBtn">Finaliser l'inscription</button>
                </div>
            </div>
        </form>
    </div>

    <script>
        let currentStep = 1;
        let enfants = [];
        let enfantCounter = 0;

        // Initialisation
        document.addEventListener('DOMContentLoaded', function() {
            updateProgress();
            addEnfant(); // Ajouter un premier enfant par défaut
            
            // Gestionnaire de soumission du formulaire
            document.getElementById('inscriptionForm').addEventListener('submit', function(e) {
                e.preventDefault();
                submitForm();
            });
        });

        function showStep(step) {
            // Masquer toutes les étapes
            document.querySelectorAll('.step').forEach(s => s.classList.remove('active'));
            // Afficher l'étape demandée
            document.getElementById('step' + step).classList.add('active');
            currentStep = step;
            updateProgress();
            
            if (step === 4) {
                updateSummary();
            }
        }

        function nextStep() {
            if (validateCurrentStep()) {
                if (currentStep < 4) {
                    showStep(currentStep + 1);
                }
            }
        }

        function prevStep() {
            if (currentStep > 1) {
                showStep(currentStep - 1);
            }
        }

        function updateProgress() {
            const progress = (currentStep / 4) * 100;
            document.getElementById('progressFill').style.width = progress + '%';
        }

        function validateCurrentStep() {
            hideAlerts();
            
            switch(currentStep) {
                case 1:
                    return validateStep1();
                case 2:
                    return validateStep2();
                case 3:
                    return validateStep3();
                default:
                    return true;
            }
        }

        function validateStep1() {
            const requiredFields = ['nomResponsable', 'adresse', 'email', 'telephone1'];
            
            for (let field of requiredFields) {
                const element = document.getElementById(field);
                if (!element.value.trim()) {
                    showError('Tous les champs obligatoires doivent être remplis.');
                    element.focus();
                    return false;
                }
            }
            
            // Validation email
            const email = document.getElementById('email').value;
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showError('Veuillez saisir une adresse email valide.');
                document.getElementById('email').focus();
                return false;
            }
            
            return true;
        }

        function validateStep2() {
            if (enfants.length === 0) {
                showError('Vous devez inscrire au moins un enfant.');
                return false;
            }
            
            // Vérifier que tous les enfants ont les informations obligatoires
            for (let i = 0; i < enfants.length; i++) {
                const enfant = enfants[i];
                if (!enfant.nom || !enfant.prenom || !enfant.dateNaissance || !enfant.niveauScolaire) {
                    showError(`Toutes les informations de l'enfant ${i + 1} sont obligatoires.`);
                    return false;
                }
                
                // Vérifier qu'au moins une activité est sélectionnée
                if (!enfant.coursArabe && !enfant.coursCoran && !enfant.animations) {
                    showError(`Vous devez sélectionner au moins une activité pour l'enfant ${i + 1}.`);
                    return false;
                }
            }
            
            return true;
        }

        function validateStep3() {
            // Vérifier l'autorisation droit à l'image
            const droitImage = document.querySelector('input[name="droitImage"]:checked');
            if (!droitImage) {
                showError('Vous devez choisir une option pour le droit à l\'image.');
                return false;
            }
            
            // Vérifier l'acceptation des conditions
            const conditions = document.getElementById('conditions');
            if (!conditions.checked) {
                showError('Vous devez accepter les conditions générales.');
                return false;
            }
            
            return true;
        }

        function addEnfant() {
            if (enfants.length >= 5) {
                showError('Maximum 5 enfants autorisés.');
                return;
            }
            
            enfantCounter++;
            const enfantId = enfantCounter;
            
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
            
            enfants.push(enfant);
            
            const container = document.getElementById('enfantsContainer');
            const enfantDiv = document.createElement('div');
            enfantDiv.className = 'enfant-container';
            enfantDiv.id = 'enfant' + enfantId;
            
            enfantDiv.innerHTML = `
                <div class="enfant-header">
                    <h3 class="enfant-title">Enfant ${enfants.length}</h3>
                    ${enfants.length > 1 ? `<button type="button" class="remove-btn" onclick="removeEnfant(${enfantId})">Retirer</button>` : ''}
                </div>
                
                <div class="form-row">
                    <div class="form-group">
                        <label for="nom${enfantId}">Nom *</label>
                        <input type="text" id="nom${enfantId}" onchange="updateEnfant(${enfantId}, 'nom', this.value)" required>
                    </div>
                    <div class="form-group">
                        <label for="prenom${enfantId}">Prénom *</label>
                        <input type="text" id="prenom${enfantId}" onchange="updateEnfant(${enfantId}, 'prenom', this.value)" required>
                    </div>
                </div>
                
                <div class="form-row">
                    <div class="form-group">
                        <label for="dateNaissance${enfantId}">Date de naissance *</label>
                        <input type="date" id="dateNaissance${enfantId}" onchange="updateEnfant(${enfantId}, 'dateNaissance', this.value)" required>
                    </div>
                    <div class="form-group">
                        <label for="niveauScolaire${enfantId}">Niveau scolaire (rentrée 2024) *</label>
                        <select id="niveauScolaire${enfantId}" onchange="updateEnfant(${enfantId}, 'niveauScolaire', this.value)" required>
                            <option value="">Sélectionner le niveau</option>
                            <option value="Maternelle PS">Maternelle PS</option>
                            <option value="Maternelle MS">Maternelle MS</option>
                            <option value="Maternelle GS">Maternelle GS</option>
                            <option value="CP">CP</option>
                            <option value="CE1">CE1</option>
                            <option value="CE2">CE2</option>
                            <option value="CM1">CM1</option>
                            <option value="CM2">CM2</option>
                            <option value="6ème">6ème</option>
                            <option value="5ème">5ème</option>
                            <option value="4ème">4ème</option>
                            <option value="3ème">3ème</option>
                            <option value="Lycée">Lycée</option>
                            <option value="Adulte">Adulte</option>
                        </select>
                    </div>
                </div>
                
                <div class="form-group">
                    <label>Activités souhaitées *</label>
                    <div class="checkbox-group">
                        <div class="checkbox-item">
                            <input type="checkbox" id="coursArabe${enfantId}" onchange="updateEnfant(${enfantId}, 'coursArabe', this.checked)">
                            <label for="coursArabe${enfantId}">Cours d'arabe (à partir de 6 ans)</label>
                        </div>
                        <div class="checkbox-item">
                            <input type="checkbox" id="coursCoran${enfantId}" onchange="updateEnfant(${enfantId}, 'coursCoran', this.checked)">
                            <label for="coursCoran${enfantId}">Cours de Coran</label>
                        </div>
                        <div class="checkbox-item">
                            <input type="checkbox" id="animations${enfantId}" onchange="updateEnfant(${enfantId}, 'animations', this.checked)">
                            <label for="animations${enfantId}">Animations</label>
                        </div>
                    </div>
                    <p style="font-size: 12px; color: #666; margin-top: 5px;">
                        * Cours de Coran organisés par la « Mosquée Nasr »
                    </p>
                </div>
            `;
            
            container.appendChild(enfantDiv);
            updateTotal();
        }

        function removeEnfant(enfantId) {
            if (enfants.length <= 1) {
                showError('Au moins un enfant doit être inscrit.');
                return;
            }
            
            // Retirer de la liste
            enfants = enfants.filter(e => e.id !== enfantId);
            
            // Retirer de l'interface
            const element = document.getElementById('enfant' + enfantId);
            element.remove();
            
            // Mettre à jour les numéros
            updateEnfantNumbers();
            updateTotal();
        }

        function updateEnfant(enfantId, field, value) {
            const enfant = enfants.find(e => e.id === enfantId);
            if (enfant) {
                enfant[field] = value;
                updateTotal();
            }
        }

        function updateEnfantNumbers() {
            const containers = document.querySelectorAll('.enfant-container');
            containers.forEach((container, index) => {
                const title = container.querySelector('.enfant-title');
                title.textContent = `Enfant ${index + 1}`;
            });
        }

        function calculateTotal() {
            const nbEnfants = enfants.length;
            let total = 0;
            
            if (nbEnfants <= 2) {
                total = nbEnfants * 140;
            } else {
                total = (2 * 140) + ((nbEnfants - 2) * 70);
            }
            
            return total;
        }

        function updateTotal() {
            const total = calculateTotal();
            document.getElementById('totalAmount').textContent = total + '€';
        }

        function updateSummary() {
            const summaryBox = document.getElementById('summaryBox');
            const responsable = {
                nom: document.getElementById('nomResponsable').value,
                email: document.getElementById('email').value
            };
            
            let summaryHTML = `
                <div class="summary-item">
                    <span>Responsable légal :</span>
                    <span>${responsable.nom}</span>
                </div>
                <div class="summary-item">
                    <span>Email :</span>
                    <span>${responsable.email}</span>
                </div>
                <div class="summary-item">
                    <span>Nombre d'enfants :</span>
                    <span>${enfants.length}</span>
                </div>
            `;
            
            enfants.forEach((enfant, index) => {
                const activites = [];
                if (enfant.coursArabe) activites.push('Cours d\'arabe');
                if (enfant.coursCoran) activites.push('Cours de Coran');
                if (enfant.animations) activites.push('Animations');
                
                summaryHTML += `
                    <div class="summary-item">
                        <span>Enfant ${index + 1} :</span>
                        <span>${enfant.prenom} ${enfant.nom} (${enfant.niveauScolaire})</span>
                    </div>
                    <div class="summary-item">
                        <span>Activités :</span>
                        <span>${activites.join(', ')}</span>
                    </div>
                `;
            });
            
            const total = calculateTotal();
            summaryHTML += `
                <div class="summary-item">
                    <span>Total à payer :</span>
                    <span>${total}€</span>
                </div>
            `;
            
            summaryBox.innerHTML = summaryHTML;
        }

        async function submitForm() {
            if (!validateCurrentStep()) {
                return;
            }
            
            // Validation du mode de paiement
            const modePaiement = document.querySelector('input[name="modePaiement"]:checked');
            if (!modePaiement) {
                showError('Vous devez choisir un mode de paiement.');
                return;
            }
            
            // Afficher le loading
            document.getElementById('loading').style.display = 'block';
            document.getElementById('submitBtn').disabled = true;
            
            // Collecter toutes les données
            const formData = {
                timestamp: new Date().toISOString(),
                responsable: {
                    nom: document.getElementById('nomResponsable').value,
                    adresse: document.getElementById('adresse').value,
                    email: document.getElementById('email').value,
                    telephone1: document.getElementById('telephone1').value,
                    telephone2: document.getElementById('telephone2').value
                },
                enfants: enfants,
                droitImage: document.querySelector('input[name="droitImage"]:checked').value === 'oui',
                acceptConditions: true,
                modePaiement: modePaiement.value,
                total: calculateTotal(),
                nbEnfants: enfants.length
            };
            
            try {
                // Ici vous pouvez envoyer les données à Google Sheets
                // Pour l'instant, on simule l'envoi
                await simulateSubmission(formData);
                
                // Afficher le succès
                document.getElementById('loading').style.display = 'none';
                showSuccess();
                
                // Optionnel : envoyer un email de confirmation
                // await sendConfirmationEmail(formData);
                
            } catch (error) {
                console.error('Erreur:', error);
                document.getElementById('loading').style.display = 'none';
                document.getElementById('submitBtn').disabled = false;
                showError('Une erreur s\'est produite lors de l\'envoi. Veuillez réessayer.');
            }
        }

        async function simulateSubmission(data) {
            // Simulation d'envoi (remplacer par l'envoi réel vers Google Sheets)
            return new Promise((resolve) => {
                setTimeout(() => {
                    console.log('Données à envoyer:', data);
                    resolve();
                }, 2000);
            });
        }

        function showSuccess() {
            hideAlerts();
            document.getElementById('successAlert').style.display = 'block';
            window.scrollTo(0, 0);
        }

        function showError(message) {
            hideAlerts();
            document.getElementById('errorMessage').textContent = message;
            document.getElementById('errorAlert').style.display = 'block';
            window.scrollTo(0, 0);
        }

        function hideAlerts() {
            document.getElementById('successAlert').style.display = 'none';
            document.getElementById('errorAlert').style.display = 'none';
        }
    </script>
</body>
</html>