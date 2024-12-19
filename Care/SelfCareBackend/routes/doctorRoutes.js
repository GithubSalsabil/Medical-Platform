import express from 'express';
import { addDoctor, getDoctors, getDoctorById, updateDoctor, deleteDoctor,getDashboardData } from '../controllers/doctorController.js';
import { authenticate, authorize } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Route pour ajouter un médecin et une secrétaire
router.post('/add', addDoctor);
router.get('/doctors', getDoctors);
router.get('/:id', getDoctorById);

// Route pour mettre à jour un médecin
router.put('/:id', updateDoctor);

// Route pour supprimer un médecin
router.delete('/:id', deleteDoctor);

router.get('/dashboard/sec', authenticate, authorize(['doctor']), getDashboardData);

export default router;