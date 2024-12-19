// controllers/PsychologistController.js
import Psychologist from '../models/Psychologist.js';

// Créer un nouvel utilisateur
export const createPsychologist = async (req, res) => {
    const { firstName, lastName, email, address, phone, password, gender } = req.body;
  try {
    const existingPsychologist = await Psychologist.findOne({ email });
        if (existingPsychologist) {
            return res.status(400).json({ error: 'Email du Psychologist déjà utilisé.' });
        }

    const newPsychologist = new Psychologist({
      firstName,
      lastName,
      email,
      address,
      phone,
      password,
      gender,
      role: 'Psychologist'
    });

    await newPsychologist.save();
    res.status(201).json({ message: 'Psychologist created successfully', data: newPsychologist });
  } catch (error) {
    console.log('error', error)
    res.status(500).json({ message: 'Error creating Psychologist', error });
    
  }
};


// Récupérer tous les utilisateurs
export const getAllPsychologist = async (req, res) => {
  try {
    const psychologist = await Psychologist.find();
    res.status(200).json({ message: 'Psychologists fetched successfully', data: psychologist });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching Psychologists', error });
  }
};

/* export const getDoctors = async (req, res) => {
    try {
      const doctors = await Doctor.find();
      res.status(200).json(doctors);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }; */

// Récupérer un utilisateur par son ID
export const getPsychologistById = async (req, res) => {
  try {
    const user = await Psychologist.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'Psychologist not found' });
    }
    res.status(200).json({ message: 'Psychologist fetched successfully', data: user });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching Psychologist', error });
  }
};

// Mettre à jour un utilisateur
export const updatePsychologist = async (req, res) => {
  try {
    const updatedUser = await Psychologist.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedUser) {
      return res.status(404).json({ message: 'Psychologist not found' });
    }
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: 'Error updating Psychologist', error });
  }
};

// Supprimer un utilisateur
export const deletePsychologist = async (req, res) => {
  try {
    const deletedUser = await Psychologist.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ message: 'Psychologist not found' });
    }
    res.status(200).json({ message: 'Psychologist deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting Psychologist', error });
  }
};