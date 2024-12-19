require('dotenv').config(); // Charger les variables d'environnement
const mongoose = require('mongoose');

const uri = process.env.MONGODB_URI;

// Connexion à MongoDB Atlas
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connexion à MongoDB réussie');
    })
    .catch(err => {
        console.error('Erreur de connexion à MongoDB:', err);
    });