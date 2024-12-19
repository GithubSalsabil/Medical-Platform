import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import doctorRoutes from './routes/doctorRoutes.js'; // Assurez-vous que ce chemin est correct
import nutritionistRoutes from './routes/nutritionistRoutes.js';
import fitnessTRoutes from './routes/fitnessTrainerRoutes.js';
import psychologistRoutes from './routes/psychologistRoutes.js';
import PatientRoutes from './routes/PatientRoutes.js';
import authRoutes from "./routes/authRoutes.js";
import appointmentsRoutes from './routes/appoinmentsRoutes.js';
import appointmentDoctorRoutes from './routes/appointmentDoctorRoutes.js';
import appointmentNutRoutes from './routes/AppointmentNutRoutes.js';
import AppointmentPsyRoutes from './routes/AppointmentPsyRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import commentRoutes from './routes/commentRoutes.js';


const app = express();

// Middleware
app.use(cors({
    origin: 'http://localhost:3000' // Remplacez par l'URL de votre frontend
}));
app.use(express.json());

// Routes
app.use('/api/doctor', doctorRoutes);
app.use('/api/nutritionist', nutritionistRoutes);
app.use('/api/fitnessT', fitnessTRoutes);
app.use('/api/psychologist', psychologistRoutes);
app.use('/api/patient', PatientRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/appointmentT', appointmentsRoutes);
app.use('/api/appointments', appointmentDoctorRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/appointmentN', appointmentNutRoutes);
app.use('/api/appointmentPsy', AppointmentPsyRoutes);
app.use('/api/comments', commentRoutes);

// Connexion à MongoDB Atlas  
const uri = process.env.MONGODB_URI;

mongoose.connect(uri)
    .then(() => {
        console.log('Connexion à MongoDB réussie');
    })
    .catch(err => {
        console.error('Erreur de connexion à MongoDB:', err);
    });

// Démarrage du serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Serveur est en cours d'exécution sur le port ${PORT}`);
});
