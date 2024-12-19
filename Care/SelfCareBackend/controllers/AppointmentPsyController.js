import AppointmentPsy from '../models/AppointmentPsy.js';
import BlockedDatePsy from '../models/BlockedDatePsy.js';
// Patient request for appointment
export const requestAppointment = async (req, res) => {
  try {
    const { patientId, psychologistId, patientName, psychologistName, patientAge, patientPhone, description } = req.body;

    const newAppointment = new AppointmentPsy({
      patientId,
      psychologistId,
      patientName,
      psychologistName,
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
    const { appointmentId, date, time } = req.body;

    // Check if the selected slot is blocked
    const isBlocked = await BlockedDatePsy.findOne({ psychologistId: req.body.psychologistId, date, time });
    if (isBlocked) {
      return res.status(400).json({ message: 'The selected slot is unavailable.' });
    }

    // Update the appointment with the date, time, and status
    const appointment = await AppointmentPsy.findByIdAndUpdate(
      appointmentId,
      { date, time, status: 'confirmed' },
      { new: true }
    );

    // Block the selected slot
    const newBlockedDate = new BlockedDatePsy({ psychologistId: appointment.psychologistId, date, time });
    await newBlockedDate.save();

    res.status(200).json({ message: 'Appointment confirmed.', appointment });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAppointmentsBypsychologistId = async (req, res) => {
    const psychologistId = req.params.id;
  
    try {
      const appointments = await AppointmentPsy.find({ psychologistId: psychologistId});
  
      return res.status(200).json(appointments);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Erreur lors de la récupération des rendez-vous' });
    }
  };

  export const getAppointmentsByPatientId = async (req, res) => {
    try {
        const { patientId } = req.params;
    
        const appointments = await AppointmentPsy.find({ patientId });
        res.json(appointments);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching appointments' });
      }
  };

  export const getAppointmentByPatientId = async (req, res) => {
    try {
      const { patientId } = req.params;
  
      // Trouver les rendez-vous pour le patient
      const appointments = await AppointmentPsy.find({ patientId });
  
      // Retourner le nombre de rendez-vous avec la liste des rendez-vous
      res.status(200).json({
        totalAppointments: appointments.length,
        appointments,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erreur lors de la récupération des rendez-vous.' });
    }
  };

  export const getConfirmedAppointmentsBypsychologist = async (req, res) => {
    try {
      const { psychologistId } = req.params;
  
      // Filtrer les rendez-vous confirmés pour un médecin spécifique
      const appointments = await AppointmentPsy.find({
        psychologistId,
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
      const { psychologistId } = req.params;
  
      // Filtrer les rendez-vous confirmés pour un médecin spécifique
      const appointments = await AppointmentPsy.find({
        psychologistId,
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