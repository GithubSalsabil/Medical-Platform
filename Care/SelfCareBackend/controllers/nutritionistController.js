// controllers/NutritionistController.js
import Nutritionist from '../models/Nutritionist.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const addNutritionist = async (req, res) => {
    const { firstName, lastName, email, address, phone, gender, secretaryLogin, secretaryPassword } = req.body;

    try {
        // Vérifier si l'email du Nutritionist existe déjà
        const existingNutritionist = await Nutritionist.findOne({ email });
        if (existingNutritionist) {
            return res.status(400).json({ error: 'Email du Nutritionist déjà utilisé.' });
        }

        // Vérifier si le login de la secrétaire existe déjà
        const existingSecretary = await Nutritionist.findOne({ 'secretary.login': secretaryLogin });
        if (existingSecretary) {
            return res.status(400).json({ error: 'Login de la secrétaire déjà utilisé.' });
        }

        // Hashing du mot de passe de la secrétaire
        const hashedPassword = await bcrypt.hash(secretaryPassword, 10);

        const newNutritionist = new Nutritionist({
            firstName,
            lastName,
            email,
            address,
            phone,
            gender,
            role: 'Nutritionist',
            secretary: {
                login: secretaryLogin,
                password: hashedPassword
            }
        });

        await newNutritionist.save();
        res.status(201).json({ message: "Nutritionist et secrétaire ajoutés avec succès !" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getNutritionist = async (req, res) => {
  try {
    const nutritionist = await Nutritionist.find();
    res.status(200).json(nutritionist);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getNutritionistById = async (req, res) => {
    try {
        const nutritionist = await Nutritionist.findById(req.params.id);
        if (!nutritionist) {
            return res.status(404).json({ message: 'Médecin non trouvé' });
        }
        res.status(200).json(nutritionist);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération du nutritionist' });
    }
};

/* export const getSecretaire = async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1]; // Récupère le jeton
        const decodedToken = jwt.verify(token, "your_secret_key"); // Vérifiez le jeton
    
        const nutritionist = await Nutritionist.findOne({ "secretary.login": decodedToken.id });
    
        if (!nutritionist) {
          return res.status(404).json({ message: "Nutritionist introuvable." });
        }
    
        res.json(nutritionist);
      } catch (error) {
        res.status(500).json({ message: "Erreur serveur" });
      }
}; */

export const getSecretaire = async (req, res) => {
    try {
        // Récupérer le jeton d'authentification
        const token = req.headers.authorization?.split(' ')[1];
        
        if (!token) {
            return res.status(400).json({ message: "Token manquant." });
        }

        // Vérifier et décoder le jeton
        const decodedToken = jwt.verify(token, "your_secret_key");

        // Chercher le nutritionniste qui correspond au login de la secrétaire dans le jeton décodé
        const nutritionist = await Nutritionist.findOne({ "secretary.login": decodedToken.login });

        // Si le nutritionniste n'est pas trouvé
        if (!nutritionist) {
            return res.status(404).json({ message: "Nutritionniste introuvable." });
        }

        // Retourner le nutritionniste trouvé
        res.status(200).json(nutritionist);
    } catch (error) {
        // Gestion des erreurs
        console.error(error);
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ message: "Token invalide." });
        }
        return res.status(500).json({ message: "Erreur serveur." });
    }
};

export const updateNutritionist = async (req, res) => {
    try {
        const updatedNutritionist = await Nutritionist.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedNutritionist) {
            return res.status(404).json({ message: 'Médecin non trouvé' });
        }
        res.status(200).json(updatedNutritionist);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la mise à jour du médecin' });
    }
};

export const deleteNutritionist = async (req, res) => {
    try {
        const deletedNutritionist = await Nutritionist.findByIdAndDelete(req.params.id);
        if (!deletedNutritionist) {
            return res.status(404).json({ message: 'Médecin non trouvé' });
        }
        res.status(200).json({ message: 'Médecin supprimé avec succès' });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la suppression du médecin' });
    }
};