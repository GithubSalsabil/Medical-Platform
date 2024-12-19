import express from 'express';
import { addNutritionist, getNutritionist, getNutritionistById,getSecretaire, updateNutritionist, deleteNutritionist } from '../controllers/nutritionistController.js';

const router = express.Router();

// Route pour ajouter un médecin et une secrétaire
router.post('/add', addNutritionist);
router.get('/nutritionists', getNutritionist);
router.get('/:id', getNutritionistById);
router.get('/secretary/sec', getSecretaire);

// Route pour mettre à jour un médecin
router.put('/:id', updateNutritionist);

// Route pour supprimer un médecin
router.delete('/:id', deleteNutritionist);
export default router;

