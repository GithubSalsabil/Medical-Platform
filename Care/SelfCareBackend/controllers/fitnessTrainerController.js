// controllers/fitnessTController.js
import FitnessT from '../models/FitnessTrainer.js';

// Créer un nouvel utilisateur
export const createFitnessT = async (req, res) => {
    const { firstName, lastName, email, address, phone, password, gender } = req.body;
  try {
    const existingFitnessT = await FitnessT.findOne({ email });
        if (existingFitnessT) {
            return res.status(400).json({ error: 'Email du FitnessTrainer déjà utilisé.' });
        }

    const newFitnessT = new FitnessT({
      firstName,
      lastName,
      email,
      address,
      phone,
      password,
      gender,
      role: 'FitnessTrainer'
    });

    await newFitnessT.save();
    res.status(201).json({ message: 'User created successfully', data: newFitnessT });
  } catch (error) {
    console.log('error', error)
    res.status(500).json({ message: 'Error creating user', error });
    
  }
};


// Récupérer tous les utilisateurs
export const getAllFitnessT = async (req, res) => {
  try {
    const fitnessT = await FitnessT.find();
    res.status(200).json({ message: 'Users fetched successfully', data: fitnessT });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error });
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
export const getFitnessTById = async (req, res) => {
  try {
    const user = await FitnessT.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'User fetched successfully', data: user });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user', error });
  }
};

// Mettre à jour un utilisateur
export const updateFitnessT = async (req, res) => {
  try {
    const updatedUser = await FitnessT.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: 'Error updating user', error });
  }
};

// Supprimer un utilisateur
export const deleteFitnessT = async (req, res) => {
  try {
    const deletedUser = await FitnessT.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user', error });
  }
};