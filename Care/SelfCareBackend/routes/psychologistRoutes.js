// routes/PsychologistRoutes.js
import express from 'express';
import { createPsychologist, getAllPsychologist, getPsychologistById, updatePsychologist, deletePsychologist } from '../controllers/psychologistController.js';
const router = express.Router();

// Route pour créer un utilisateur
router.post('/add', createPsychologist);

// Route pour obtenir tous les utilisateurs
router.get('/psychologist', getAllPsychologist);

// Route pour obtenir un utilisateur par ID
router.get('/psychologist/:id', getPsychologistById);

// Route pour mettre à jour un utilisateur
router.put('/:id', updatePsychologist);

// Route pour supprimer un utilisateur
router.delete('/:id', deletePsychologist);

export default router;