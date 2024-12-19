import express from 'express';
import {respondAppointment, requestAppointment, getAppointmentsByNutritionistId, getAppointmentsByPatientId, getAppointmentByPatientId, getConfirmedAppointmentsBynutritionist, getConfirmedAppointmentsByMonth} from '../controllers/AppointmentNutController.js';

const router = express.Router();

// Patient requests an appointment
router.post('/request', requestAppointment);

// Secretary responds to a pending appointment
router.post('/respond', respondAppointment);

router.get('/:id', getAppointmentsByNutritionistId);
router.get('/demande/:patientId', getAppointmentsByPatientId);
router.get('/dashboard/:patientId', getAppointmentByPatientId);
router.get('/confirmed/:nutritionistId', getConfirmedAppointmentsBynutritionist); 
router.get('/ByMonth/:nutritionistId', getConfirmedAppointmentsByMonth);

export default router;