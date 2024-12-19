import Patient from '../models/Patient.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';


// Create JWT token
const createToken = (id) => {
  return jwt.sign({ id }, 'secret-key', { expiresIn: '1d' }); // Replace 'secret-key' with an env variable
};

// Register patient
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const newPatient = await Patient.create({ name, email, password, role: 'Patient' });
    res.status(201).json({ message: 'Patient registered successfully', patient: newPatient });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Login patient


// Get dashboard data
export const getDashboard = async (req, res) => {
  try {
    const patient = await Patient.findById(req.user.id).select('-password');
    if (!patient) return res.status(404).json({ error: 'Patient not found' });

    res.status(200).json({ patient });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updatePatient = async (req, res) => {
  try {
    const { name, email } = req.body; // Récupération des données à modifier
    const updatedPatient = await Patient.findByIdAndUpdate(
      req.user.id, // ID du patient connecté
      { name, email }, // Données à mettre à jour
      { new: true, runValidators: true } // Options pour retourner les données mises à jour et valider
    );

    if (!updatedPatient) return res.status(404).json({ error: 'Patient not found' });

    res.status(200).json({ message: 'Patient updated successfully', patient: updatedPatient });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};