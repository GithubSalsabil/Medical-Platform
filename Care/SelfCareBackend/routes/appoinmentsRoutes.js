import express from 'express';
import { getAllConfirmedAppointmentsToday} from '../controllers/appointmentController.js';

const router = express.Router();

router.get('/appointments/dashboard/:patientId', getAllConfirmedAppointmentsToday);

export default router;