import express from 'express';
import { getAdminDashboard } from '../controllers/adminController.js';

const router = express.Router();

// Route pour le tableau de bord admin
router.get('/dashboard', getAdminDashboard);

export default router;