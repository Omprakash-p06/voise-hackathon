// FetoSense - Shared JavaScript Module

// ===== DATA MANAGEMENT =====
const FetoSense = {
    // Storage key
    STORAGE_KEY: 'fetosense_data',
    
    // Initialize data
    init() {
        if (!localStorage.getItem(this.STORAGE_KEY)) {
            this.saveData(this.getDefaultData());
        }
    },
    
    // Get default patient data
    getDefaultData() {
        return {
            patients: [
                {
                    id: 1,
                    name: "Sunita Devi",
                    age: 22,
                    phone: "9876543210",
                    village: "Rampur",
                    ashaName: "Rekha Sharma",
                    familyContact: "9876543211",
                    visits: [
                        { date: "2025-11-01", hemoglobin: 8.5, systolicBP: 120, diastolicBP: 80, weight: 55, symptoms: [] },
                        { date: "2025-11-15", hemoglobin: 9.2, systolicBP: 125, diastolicBP: 82, weight: 56, symptoms: [] },
                        { date: "2025-11-22", hemoglobin: 9.8, systolicBP: 118, diastolicBP: 78, weight: 56.5, symptoms: [] }
                    ],
                    adherence: { ironMorning: true, ironEvening: false, protein: true, rest: true }
                },
                {
                    id: 2,
                    name: "Geeta Kumari",
                    age: 19,
                    phone: "9876543220",
                    village: "Shivpur",
                    ashaName: "Meena Devi",
                    familyContact: "9876543221",
                    visits: [
                        { date: "2025-10-20", hemoglobin: 6.5, systolicBP: 110, diastolicBP: 70, weight: 48, symptoms: ["swelling"] },
                        { date: "2025-11-10", hemoglobin: 7.2, systolicBP: 115, diastolicBP: 75, weight: 49, symptoms: ["swelling"] },
                        { date: "2025-11-20", hemoglobin: 7.8, systolicBP: 112, diastolicBP: 72, weight: 49.5, symptoms: [] }
                    ],
                    adherence: { ironMorning: true, ironEvening: true, protein: false, rest: true }
                },
                {
                    id: 3,
                    name: "Radha Sharma",
                    age: 37,
                    phone: "9876543230",
                    village: "Rampur",
                    ashaName: "Rekha Sharma",
                    familyContact: "9876543231",
                    visits: [
                        { date: "2025-10-15", hemoglobin: 10.5, systolicBP: 145, diastolicBP: 95, weight: 68, symptoms: ["headache"] },
                        { date: "2025-11-01", hemoglobin: 10.8, systolicBP: 150, diastolicBP: 98, weight: 69, symptoms: ["headache", "swelling"] },
                        { date: "2025-11-15", hemoglobin: 11.0, systolicBP: 155, diastolicBP: 100, weight: 69.5, symptoms: ["headache"] }
                    ],
                    adherence: { ironMorning: false, ironEvening: false, protein: true, rest: false }
                },
                {
                    id: 4,
                    name: "Anita Singh",
                    age: 28,
                    phone: "9876543240",
                    village: "Lakshmipur",
                    ashaName: "Sita Devi",
                    familyContact: "9876543241",
                    visits: [
                        { date: "2025-11-05", hemoglobin: 11.5, systolicBP: 115, diastolicBP: 75, weight: 58, symptoms: [] },
                        { date: "2025-11-19", hemoglobin: 11.8, systolicBP: 118, diastolicBP: 76, weight: 59, symptoms: [] }
                    ],
                    adherence: { ironMorning: true, ironEvening: true, protein: true, rest: true }
                },
                {
                    id: 5,
                    name: "Kavita Devi",
                    age: 17,
                    phone: "9876543250",
                    village: "Shivpur",
                    ashaName: "Meena Devi",
                    familyContact: "9876543251",
                    visits: [
                        { date: "2025-10-25", hemoglobin: 9.0, systolicBP: 165, diastolicBP: 105, weight: 52, symptoms: ["headache", "blurredVision"] },
                        { date: "2025-11-08", hemoglobin: 9.5, systolicBP: 170, diastolicBP: 110, weight: 52.5, symptoms: ["headache", "swelling", "blurredVision"] }
                    ],
                    adherence: { ironMorning: true, ironEvening: false, protein: false, rest: true }
                },
                {
                    id: 6,
                    name: "Priya Verma",
                    age: 25,
                    phone: "9876543260",
                    village: "Lakshmipur",
                    ashaName: "Sita Devi",
                    familyContact: "9876543261",
                    visits: [
                        { date: "2025-11-12", hemoglobin: 10.2, systolicBP: 122, diastolicBP: 80, weight: 60, symptoms: [] },
                        { date: "2025-11-26", hemoglobin: 10.5, systolicBP: 120, diastolicBP: 78, weight: 60.5, symptoms: [] }
                    ],
                    adherence: { ironMorning: true, ironEvening: true, protein: true, rest: false }
                }
            ],
            currentDate: new Date().toISOString().split('T')[0]
        };
    },
    
    // Get all data
    getData() {
        const data = localStorage.getItem(this.STORAGE_KEY);
        return data ? JSON.parse(data) : this.getDefaultData();
    },
    
    // Save all data
    saveData(data) {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
    },
    
    // Get all patients
    getPatients() {
        return this.getData().patients;
    },
    
    // Get patient by ID
    getPatient(id) {
        const patients = this.getPatients();
        return patients.find(p => p.id === parseInt(id));
    },
    
    // Add new patient
    addPatient(patient) {
        const data = this.getData();
        const newId = Math.max(...data.patients.map(p => p.id), 0) + 1;
        patient.id = newId;
        data.patients.push(patient);
        this.saveData(data);
        return newId;
    },
    
    // Update patient
    updatePatient(id, updates) {
        const data = this.getData();
        const index = data.patients.findIndex(p => p.id === parseInt(id));
        if (index !== -1) {
            data.patients[index] = { ...data.patients[index], ...updates };
            this.saveData(data);
            return true;
        }
        return false;
    },
    
    // Add visit to patient
    addVisit(patientId, visit) {
        const data = this.getData();
        const patient = data.patients.find(p => p.id === parseInt(patientId));
        if (patient) {
            patient.visits.push(visit);
            this.saveData(data);
            return true;
        }
        return false;
    },
    
    // Get current date
    getCurrentDate() {
        return new Date().toISOString().split('T')[0];
    }
};

// ===== RISK CALCULATION =====
const RiskCalculator = {
    calculateScore(patient) {
        const latestVisit = patient.visits[patient.visits.length - 1];
        let score = 0;
        
        // Age risk
        if (patient.age < 18 || patient.age > 35) {
            score += 2;
        }
        
        // Hemoglobin risk
        if (latestVisit.hemoglobin < 7) {
            score += 3;
        } else if (latestVisit.hemoglobin < 11) {
            score += 1;
        }
        
        // Blood pressure risk
        if (latestVisit.systolicBP > 160 || latestVisit.diastolicBP > 110) {
            score += 3;
        } else if (latestVisit.systolicBP >= 140 || latestVisit.diastolicBP >= 90) {
            score += 1;
        }
        
        // Symptoms
        if (latestVisit.symptoms.includes('swelling')) {
            score += 1;
        }
        
        if (latestVisit.symptoms.includes('headache') && 
            (latestVisit.systolicBP >= 140 || latestVisit.diastolicBP >= 90)) {
            score += 2;
        }
        
        return score;
    },
    
    getCategory(score) {
        if (score >= 6) return 'HIGH';
        if (score >= 3) return 'MODERATE';
        return 'LOW';
    },
    
    getNextFollowupDate(patient) {
        const latestVisit = patient.visits[patient.visits.length - 1];
        const visitDate = new Date(latestVisit.date);
        const score = this.calculateScore(patient);
        const category = this.getCategory(score);
        
        let daysToAdd = 56; // LOW: 8 weeks
        if (category === 'HIGH') daysToAdd = 14; // 2 weeks
        else if (category === 'MODERATE') daysToAdd = 28; // 4 weeks
        
        visitDate.setDate(visitDate.getDate() + daysToAdd);
        return visitDate.toISOString().split('T')[0];
    },
    
    getFollowupStatus(followupDate) {
        const today = new Date(FetoSense.getCurrentDate());
        const followup = new Date(followupDate);
        
        if (followup < today) return 'OVERDUE';
        
        const diffDays = Math.ceil((followup - today) / (1000 * 60 * 60 * 24));
        if (diffDays <= 3) return 'PENDING';
        
        return 'SCHEDULED';
    },
    
    getRecommendations(patient) {
        const latestVisit = patient.visits[patient.visits.length - 1];
        const score = this.calculateScore(patient);
        const category = this.getCategory(score);
        const recommendations = [];
        
        // Hemoglobin recommendations
        if (latestVisit.hemoglobin < 7) {
            recommendations.push('⚠️ URGENT: Severe anemia - Refer to PHC immediately for blood transfusion');
            recommendations.push('Iron tablets: 2 tablets daily (morning & evening with vitamin C)');
        } else if (latestVisit.hemoglobin < 11) {
            recommendations.push('Iron tablets: 2 tablets daily (morning & evening)');
            recommendations.push('Diet: Increase green leafy vegetables, jaggery, dates');
        } else {
            recommendations.push('Continue iron supplementation: 1 tablet daily');
        }
        
        // Blood pressure recommendations
        if (latestVisit.systolicBP > 160 || latestVisit.diastolicBP > 110) {
            recommendations.push('⚠️ URGENT: Severe hypertension - Refer to PHC/Hospital immediately');
            recommendations.push('Monitor BP daily and report any headache or vision changes');
        } else if (latestVisit.systolicBP >= 140 || latestVisit.diastolicBP >= 90) {
            recommendations.push('Monitor BP twice weekly');
            recommendations.push('Reduce salt intake, ensure adequate rest');
        }
        
        // Age-based recommendations
        if (patient.age < 18) {
            recommendations.push('Young age pregnancy - ensure adequate nutrition and rest');
            recommendations.push('Calcium supplementation recommended');
        } else if (patient.age > 35) {
            recommendations.push('Advanced maternal age - close monitoring required');
        }
        
        // Symptom-based recommendations
        if (latestVisit.symptoms.includes('swelling')) {
            recommendations.push('Swelling detected - elevate legs when resting, reduce salt');
        }
        
        if (latestVisit.symptoms.includes('headache')) {
            recommendations.push('Monitor for severe headache - could indicate pre-eclampsia');
        }
        
        if (latestVisit.symptoms.includes('blurredVision')) {
            recommendations.push('⚠️ Vision changes - Refer to PHC immediately');
        }
        
        // Follow-up recommendations
        if (category === 'HIGH') {
            recommendations.push('🔴 Return for follow-up in 2 weeks or immediately if symptoms worsen');
        } else if (category === 'MODERATE') {
            recommendations.push('🟡 Return for follow-up in 4 weeks');
        } else {
            recommendations.push('🟢 Return for follow-up in 8 weeks');
        }
        
        // General recommendations
        recommendations.push('Ensure adequate protein intake (dal, eggs, milk)');
        recommendations.push('Rest for at least 2 hours daily');
        recommendations.push('Attend all ANC checkups at PHC');
        
        return recommendations;
    }
};

// ===== UTILITY FUNCTIONS =====
const Utils = {
    formatDate(dateStr) {
        const date = new Date(dateStr);
        const options = { day: '2-digit', month: 'short', year: 'numeric' };
        return date.toLocaleDateString('en-IN', options);
    },
    
    formatDateLong(dateStr) {
        const date = new Date(dateStr);
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString('en-IN', options);
    },
    
    getActiveNavLink() {
        const path = window.location.pathname;
        const filename = path.substring(path.lastIndexOf('/') + 1) || 'index.html';
        return filename;
    },
    
    setActiveNav() {
        const currentPage = this.getActiveNavLink();
        document.querySelectorAll('.nav-link').forEach(link => {
            const href = link.getAttribute('href');
            if (href === currentPage || (currentPage === 'index.html' && href === 'index.html')) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    },
    
    showToast(message, type = 'success') {
        // Simple toast notification
        const toast = document.createElement('div');
        toast.className = `alert alert-${type}`;
        toast.style.position = 'fixed';
        toast.style.top = '20px';
        toast.style.right = '20px';
        toast.style.zIndex = '9999';
        toast.style.minWidth = '300px';
        toast.textContent = message;
        
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.remove();
        }, 3000);
    }
};

// ===== CHART UTILITIES =====
const ChartUtils = {
    createHemoglobinChart(canvasId, patient) {
        const ctx = document.getElementById(canvasId).getContext('2d');
        const dates = patient.visits.map(v => Utils.formatDate(v.date));
        const hemoglobinData = patient.visits.map(v => v.hemoglobin);
        
        return new Chart(ctx, {
            type: 'line',
            data: {
                labels: dates,
                datasets: [{
                    label: 'Hemoglobin (g/dL)',
                    data: hemoglobinData,
                    borderColor: '#1976D2',
                    backgroundColor: 'rgba(25, 118, 210, 0.1)',
                    tension: 0.3,
                    fill: true,
                    pointRadius: 4,
                    pointHoverRadius: 6
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: true,
                        position: 'top'
                    }
                },
                scales: {
                    y: {
                        beginAtZero: false,
                        min: 5,
                        max: 15,
                        title: {
                            display: true,
                            text: 'Hemoglobin (g/dL)'
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: 'Visit Date'
                        }
                    }
                }
            }
        });
    },
    
    createBPChart(canvasId, patient) {
        const ctx = document.getElementById(canvasId).getContext('2d');
        const dates = patient.visits.map(v => Utils.formatDate(v.date));
        const systolicData = patient.visits.map(v => v.systolicBP);
        const diastolicData = patient.visits.map(v => v.diastolicBP);
        
        return new Chart(ctx, {
            type: 'line',
            data: {
                labels: dates,
                datasets: [
                    {
                        label: 'Systolic BP (mmHg)',
                        data: systolicData,
                        borderColor: '#C62828',
                        backgroundColor: 'rgba(198, 40, 40, 0.1)',
                        tension: 0.3,
                        pointRadius: 4,
                        pointHoverRadius: 6
                    },
                    {
                        label: 'Diastolic BP (mmHg)',
                        data: diastolicData,
                        borderColor: '#2E7D32',
                        backgroundColor: 'rgba(46, 125, 50, 0.1)',
                        tension: 0.3,
                        pointRadius: 4,
                        pointHoverRadius: 6
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: true,
                        position: 'top'
                    }
                },
                scales: {
                    y: {
                        beginAtZero: false,
                        min: 60,
                        max: 180,
                        title: {
                            display: true,
                            text: 'Blood Pressure (mmHg)'
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: 'Visit Date'
                        }
                    }
                }
            }
        });
    }
};

// Initialize on load
document.addEventListener('DOMContentLoaded', function() {
    FetoSense.init();
    Utils.setActiveNav();
});
