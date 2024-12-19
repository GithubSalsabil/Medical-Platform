// routes/fitnessTRoutes.js
import express from 'express';
import { createFitnessT, getAllFitnessT, getFitnessTById, updateFitnessT, deleteFitnessT } from '../controllers/fitnessTrainerController.js';
const router = express.Router();

// Route pour créer un utilisateur
router.post('/add', createFitnessT);

// Route pour obtenir tous les utilisateurs
router.get('/fitnessT', getAllFitnessT);

// Route pour obtenir un utilisateur par ID
router.get('/fitnessT/:id', getFitnessTById);

// Route pour mettre à jour un utilisateur
router.put('/:id', updateFitnessT);

// Route pour supprimer un utilisateur
router.delete('/:id', deleteFitnessT);

export default router;