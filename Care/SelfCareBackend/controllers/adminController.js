import Doctor from '../models/Doctor.js';
import FitnessTrainer from '../models/FitnessTrainer.js';
import Nutritionist from '../models/Nutritionist.js';
import Psychologist from '../models/Psychologist.js';

export const getAdminDashboard = async (req, res) => {
    try {
        // Comptes pour chaque rôle
        const doctorCount = await Doctor.countDocuments();
        const fitnessTrainerCount = await FitnessTrainer.countDocuments();
        const nutritionistCount = await Nutritionist.countDocuments();
        const psychologistCount = await Psychologist.countDocuments();
        const totalUsers = doctorCount + fitnessTrainerCount + nutritionistCount + psychologistCount ;

        const months = [
            'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
            'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
        ];
        const usersPerMonth = Array(12).fill(0); // Initialiser chaque mois à 0 utilisateur
        const usersPerMonthF = Array(12).fill(0);
        const usersPerMonthN = Array(12).fill(0);
        const usersPerMonthP = Array(12).fill(0);

        // Trouver tous les utilisateurs et les grouper par mois
        const doctors = await Doctor.find({}, 'createdAt'); // Obtenez uniquement le champ `createdAt`
        doctors.forEach(user => {
            const createdAt = new Date(user.createdAt);
            const monthIndex = createdAt.getMonth(); // Obtenir l'indice du mois (0 pour Janvier, 11 pour Décembre)
            usersPerMonth[monthIndex]++;
        });

        const fitnessTrainer = await FitnessTrainer.find({}, 'createdAt'); // Obtenez uniquement le champ `createdAt`
        fitnessTrainer.forEach(user => {
            const createdAt = new Date(user.createdAt);
            const monthIndex = createdAt.getMonth(); // Obtenir l'indice du mois (0 pour Janvier, 11 pour Décembre)
            usersPerMonthF[monthIndex]++;
        });

        const nutritionist = await Nutritionist.find({}, 'createdAt'); // Obtenez uniquement le champ `createdAt`
        nutritionist.forEach(user => {
            const createdAt = new Date(user.createdAt);
            const monthIndex = createdAt.getMonth(); // Obtenir l'indice du mois (0 pour Janvier, 11 pour Décembre)
            usersPerMonthN[monthIndex]++;
        });

        const psychologist = await Psychologist.find({}, 'createdAt'); // Obtenez uniquement le champ `createdAt`
        psychologist.forEach(user => {
            const createdAt = new Date(user.createdAt);
            const monthIndex = createdAt.getMonth(); // Obtenir l'indice du mois (0 pour Janvier, 11 pour Décembre)
            usersPerMonthP[monthIndex]++;
        });

        // Exemple de données pour les graphiques (vous pouvez les ajuster selon vos besoins)
        const specialtyChartData = await Doctor.aggregate([
            { $group: { _id: "$specialty", count: { $sum: 1 } } },
        ]);

        console.log('totalUsers', totalUsers);
        res.status(200).json({
            stats: {
                doctorCount,
                fitnessTrainerCount,
                nutritionistCount,
                psychologistCount,
                totalUsers
            },
            charts: {
                specialtyDistribution: specialtyChartData,
                months,
                usersPerMonth,
                usersPerMonthF,
                usersPerMonthN,
                usersPerMonthP
            },
        });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération des données du tableau de bord.', error });
    }
};