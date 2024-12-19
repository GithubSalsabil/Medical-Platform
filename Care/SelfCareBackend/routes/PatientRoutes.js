import express from 'express';
import { register, getDashboard, updatePatient } from '../controllers/PatientController.js';
import { authenticate, authorize } from '../middlewares/authMiddleware.js';
const router = express.Router();

router.post('/register', register);
router.put('/update', authenticate, updatePatient);

router.get('/dashboard', authenticate, authorize(['Patient']), getDashboard);  

export default router;