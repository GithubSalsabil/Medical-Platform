import AppointmentN from '../models/AppointmentNut.js';
import BlockedDateNut from '../models/BlockedDateNut.js';
// Patient request for appointment
export const requestAppointment = async (req, res) => {
  try {
    const { patientId, nutritionistId, patientName, nutritionistName, patientAge, patientPhone, description } = req.body;

    const newAppointment = new AppointmentN({
      patientId,
      nutritionistId,
      patientName,
      nutritionistName,
      patientAge,
      patientPhone,
      description,
      status: 'pending', // Default status
    });

    await newAppointment.save();
    res.status(201).json({ message: 'Appointment request sent successfully.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Secretary responds to appointment
export const respondAppointment = async (req, res) => { 
  try {
    const { appointmentNId, date, time, nutritionistId } = req.body;

    if (!appointmentNId || !date || !time || !nutritionistId) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Check if the selected slot is blocked
    const isBlocked = await BlockedDateNut.findOne({ nutritionistId, date, time });
    if (isBlocked) {
      return res.status(400).json({ message: 'The selected slot is unavailable.' });
    }

    // Update the appointment with the date, time, and status
    const appointmentNut = await AppointmentN.findByIdAndUpdate(
      appointmentNId,
      { date, time, status: 'confirmed' },
      { new: true }
    );

    if (!appointmentNut) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    // Block the selected slot
    const newBlockedDateNut = new BlockedDateNut({ nutritionistId, date, time });
    await newBlockedDateNut.save();

    res.status(200).json({ message: 'Appointment confirmed.', appointmentNut });
  } catch (error) {
    console.error('Error responding to appointment:', error);  // Log the error details for debugging
    res.status(500).json({ error: error.message });
  }
};

export const getAppointmentsByNutritionistId = async (req, res) => {
    const nutritionistId = req.params.id;
  
    try {
      console.log("ID reçu :", nutritionistId);
      const appointmentNut = await AppointmentN.find({ nutritionistId: nutritionistId });
      console.log("Rendez-vous trouvés :", appointmentNut);
  
     
  
      return res.status(200).json(appointmentNut || []);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Erreur lors de la récupération des rendez-vous' });
    }
  };

  export const getAppointmentsByPatientId = async (req, res) => {
    try {
        const { patientId } = req.params;
    
        const appointmentNut = await AppointmentN.find({ patientId });
        res.json(appointmentNut);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching appointments' });
      }
  };

  export const getAppointmentByPatientId = async (req, res) => {
    try {
      const { patientId } = req.params;
  
      // Trouver les rendez-vous pour le patient
      const appointmentNut = await AppointmentN.find({ patientId });
  
      // Retourner le nombre de rendez-vous avec la liste des rendez-vous
      res.status(200).json({
        totalAppointments: appointmentNut.length,
        appointmentNut,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erreur lors de la récupération des rendez-vous.' });
    }
  };

  export const getConfirmedAppointmentsBynutritionist = async (req, res) => {
    try {
      const { nutritionistId } = req.params;
  
      // Filtrer les rendez-vous confirmés pour un médecin spécifique
      const appointments = await AppointmentN.find({
        nutritionistId,
        status: 'confirmed',
      });
  
      if (appointments.length === 0) {
        return res.status(404).json({ message: 'Aucun rendez-vous confirmé trouvé.' });
      }
  
      return res.status(200).json(appointments);
    } catch (error) {
      console.error('Erreur lors de la récupération des rendez-vous confirmés:', error);
      return res.status(500).json({ message: 'Erreur serveur.' });
    }
  };
  
  export const getConfirmedAppointmentsByMonth = async (req, res) => {
    try {
      const { nutritionistId } = req.params;
  
      // Filtrer les rendez-vous confirmés pour un médecin spécifique
      const appointments = await AppointmentN.find({
        nutritionistId,
        status: 'confirmed',
      });

      const appointmentsByMonth = new Array(12).fill(0);

    // Regrouper par mois
    appointments.forEach((appointment) => {
      const date = new Date(appointment.date);
      if (!isNaN(date.getTime())) {
        const month = date.getMonth(); // Obtenir le mois (0-11)
        appointmentsByMonth[month]++;
      }
    });
  
      if (appointments.length === 0) {
        return res.status(404).json({ message: 'Aucun rendez-vous confirmé trouvé.' });
      }
      console.log('Appointments by month:', appointmentsByMonth);
  
      return res.status(200).json(appointmentsByMonth);
    } catch (error) {
      console.error('Erreur lors de la récupération des rendez-vous confirmés:', error);
      return res.status(500).json({ message: 'Erreur serveur.' });
    }
  };