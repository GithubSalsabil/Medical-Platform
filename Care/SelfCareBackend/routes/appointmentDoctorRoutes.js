import express from 'express';
import {respondAppointment, requestAppointment, getAppointmentsByDoctorId, getAppointmentsByPatientId, getAppointmentByPatientId, getConfirmedAppointmentsByDoctor, getConfirmedAppointmentsByMonth} from '../controllers/AppointmentDoctorController.js';

const router = express.Router();

// Patient requests an appointment
router.post('/request', requestAppointment);

// Secretary responds to a pending appointment
router.post('/respond', respondAppointment);

router.get('/:id', getAppointmentsByDoctorId);
router.get('/demande/:patientId', getAppointmentsByPatientId);
router.get('/dashboard/:patientId', getAppointmentByPatientId);
router.get('/confirmed/:doctorId', getConfirmedAppointmentsByDoctor); 
router.get('/ByMonth/:doctorId', getConfirmedAppointmentsByMonth);

export default router;