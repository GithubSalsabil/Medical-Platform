import mongoose from 'mongoose';

const blockedDatePsySchema = new mongoose.Schema({
  psychologistId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Référence au médecin (utilisateur)
    required: true,
  },
  date: {
    type: String, // Format de date "YYYY-MM-DD"
    required: true,
  },
  time: {
    type: String, // Format de l'heure "HH:mm"
    required: true,
  },
}, { 
  timestamps: true, // Pour ajouter createdAt et updatedAt
});

// Empêche les doublons pour psychologistId, date, et time
blockedDatePsySchema.index({ psychologistId: 1, date: 1, time: 1 }, { unique: true });

export default mongoose.models.BlockedDatePsy || mongoose.model('BlockedDatePsy', blockedDatePsySchema);