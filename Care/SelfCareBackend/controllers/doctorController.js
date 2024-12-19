// controllers/doctorController.js
import Doctor from '../models/Doctor.js';
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";

export const addDoctor = async (req, res) => {
    const { firstName, lastName, email, specialty, address, phone, gender, secretaryLogin, secretaryPassword } = req.body;

    try {
        // Vérifier si l'email du médecin existe déjà
        const existingDoctor = await Doctor.findOne({ email });
        if (existingDoctor) {
            return res.status(400).json({ error: 'Email du médecin déjà utilisé.' });
        }

        // Vérifier si le login de la secrétaire existe déjà
        const existingSecretary = await Doctor.findOne({ 'secretary.login': secretaryLogin });
        if (existingSecretary) {
            return res.status(400).json({ error: 'Login de la secrétaire déjà utilisé.' });
        }

        // Hashing du mot de passe de la secrétaire
        const hashedPassword = await bcrypt.hash(secretaryPassword, 10);

        const newDoctor = new Doctor({
            firstName,
            lastName,
            email,
            specialty,
            address,
            phone,
            gender,
            secretary: {
                login: secretaryLogin,
                password: hashedPassword
            },
            role: 'doctor',
        });

        await newDoctor.save();
        res.status(201).json({ message: "Médecin et secrétaire ajoutés avec succès !" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.status(200).json(doctors);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getDoctorById = async (req, res) => {
    try {
        const doctor = await Doctor.findById(req.params.id);
        if (!doctor) {
            return res.status(404).json({ message: 'Médecin non trouvé' });
        }
        res.status(200).json(doctor);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération du médecin' });
    }
};

export const updateDoctor = async (req, res) => {
    try {
        const updatedDoctor = await Doctor.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedDoctor) {
            return res.status(404).json({ message: 'Médecin non trouvé' });
        }
        res.status(200).json(updatedDoctor);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la mise à jour du médecin' });
    }
};

export const deleteDoctor = async (req, res) => {
    try {
        const deletedDoctor = await Doctor.findByIdAndDelete(req.params.id);
        if (!deletedDoctor) {
            return res.status(404).json({ message: 'Médecin non trouvé' });
        }
        res.status(200).json({ message: 'Médecin supprimé avec succès' });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la suppression du médecin' });
    }
};

export const authenticateSecretary = async (req, res) => {
    const { login, password } = req.body;
  
    try {
      // Rechercher le secrétaire par son login
      const doctor = await Doctor.findOne({ "secretary.login": login });
      if (!doctor) {
        return res.status(404).json({ error: "Secrétaire introuvable." });
      }
  
      // Vérifier le mot de passe
      const isPasswordValid = await bcrypt.compare(password, doctor.secretary.password);
      if (!isPasswordValid) {
        return res.status(401).json({ error: "Mot de passe incorrect." });
      }
  
      // Générer un token JWT
      const token = jwt.sign(
        { secretaryLogin: doctor.secretary.login, doctorId: doctor._id },
        "secret-key",
        { expiresIn: "1h" }
      );
  
      res.status(200).json({ token, message: "Authentification réussie." });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  export const getDashboardData = async (req, res) => {
    try {
      // Récupérer les informations spécifiques pour la secrétaire connectée
      const doctor = await Doctor.findOne({ "secretary.login": req.user.secretaryLogin });
  
      if (!doctor) {
        return res.status(404).json({ error: "Aucun médecin trouvé pour cette secrétaire." });
      }
  
      // Structure des données pour le dashboard
      const dashboardData = {
        doctorName: `${doctor.firstName} ${doctor.lastName}`,
        specialty: doctor.specialty,
        address: doctor.address,
        patients: [
          // Exemple de patients
          { id: 1, name: "John Doe", appointment: "2024-12-01" },
          { id: 2, name: "Jane Smith", appointment: "2024-12-05" },
        ],
      };
  
      res.status(200).json(dashboardData);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };