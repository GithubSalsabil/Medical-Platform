import Appointment from '../models/AppointmentDoctor.js';
import AppointmentN from '../models/AppointmentNut.js';
import AppointmentP from '../models/AppointmentPsy.js'; // Exemple pour les psychologues
import BlockedDate from '../models/BlockedDate.js';
import BlockedDateNut from '../models/BlockedDateNut.js';
import BlockedDatePsy from '../models/BlockedDatePsy.js';



async function getDoctorAppointments(patientId) {
    const appointments = await Appointment.find({
        patientId: patientId,
        doctorName: { $ne: null }, // S'assurer qu'il s'agit d'un médecin
        status: 'confirmed', // Statut confirmé
    });
    return appointments;
}

async function getNutritionistAppointments(patientId) {
    const appointments = await AppointmentN.find({
        patientId: patientId,
        nutritionistName: { $ne: null }, // S'assurer qu'il s'agit d'un nutritionniste
        status: 'confirmed', // Statut confirmé
    });
    return appointments;
}

async function getPsychologistAppointments(patientId) {
    const appointments = await AppointmentP.find({
        patientId: patientId,
        psychologistName: { $ne: null }, // S'assurer qu'il s'agit d'un psychologue
        status: 'confirmed', // Statut confirmé
    });
    return appointments;
}

      export const getAllConfirmedAppointmentsToday = async (req, res) => {

        try {
            const { patientId } = req.params;
        
            if (!patientId) {
              return res.status(400).json({ message: "L'ID du patient est requis." });
            }
        
            const doctorAppointments = await getDoctorAppointments(patientId);
        const nutritionistAppointments = await getNutritionistAppointments(patientId);
        const psychologistAppointments = await getPsychologistAppointments(patientId);

        // Calculer les totaux
        const doctorAppointmentsCount = doctorAppointments.length;
        const nutritionistAppointmentsCount = nutritionistAppointments.length;
        const psychologistAppointmentsCount = psychologistAppointments.length;

        // Log des informations pour débogage
        console.log('doctorAppointments:', doctorAppointments);
        console.log('nutritionistAppointments:', nutritionistAppointments);
        console.log('psychologistAppointments:', psychologistAppointments);
        console.log('Doctor Appointments:', doctorAppointmentsCount);
        console.log('Nutritionist Appointments:', nutritionistAppointmentsCount);
        console.log('Psychologist Appointments:', psychologistAppointmentsCount);
            // Exemple de réponse pour renvoyer les données
            res.json({
                totalAppointments: doctorAppointmentsCount + nutritionistAppointmentsCount + psychologistAppointmentsCount,
                doctorAppointmentsCount,
                nutritionistAppointmentsCount,
                psychologistAppointmentsCount,
                doctorAppointments, // Liste des rendez-vous confirmés avec les médecins
                nutritionistAppointments, // Liste des rendez-vous confirmés avec les nutritionnistes
                psychologistAppointments, // Liste des rendez-vous confirmés avec les psychologues
            });
          } catch (error) {
            console.error("Erreur lors de la récupération des données :", error);
            res.status(500).json({ message: 'Erreur interne du serveur', error: error.message });
          }
        };
    
