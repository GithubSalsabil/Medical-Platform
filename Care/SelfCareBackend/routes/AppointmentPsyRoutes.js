import express from 'express';
import {respondAppointment, requestAppointment, getAppointmentsBypsychologistId, getAppointmentsByPatientId, getAppointmentByPatientId, getConfirmedAppointmentsBypsychologist, getConfirmedAppointmentsByMonth} from '../controllers/AppointmentPsyController.js';

const router = express.Router();

// Patient requests an appointment
router.post('/request', requestAppointment);

// Secretary responds to a pending appointment
router.post('/respond', respondAppointment);

router.get('/:id', getAppointmentsBypsychologistId);
router.get('/demande/:patientId', getAppointmentsByPatientId);
router.get('/dashboard/:patientId', getAppointmentByPatientId);
router.get('/confirmed/:psychologistId', getConfirmedAppointmentsBypsychologist); 
router.get('/ByMonth/:psychologistId', getConfirmedAppointmentsByMonth);

export default router;