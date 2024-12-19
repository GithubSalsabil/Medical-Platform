import mongoose from 'mongoose';

const appointmentPsySchema = new mongoose.Schema({
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  patientName: { type: String, ref: 'User', required: true },
  patientAge: { type: Number },
  patientPhone: { type: String },
  description: { type: String },
  psychologistName: { type: String, ref: 'Psychologist', required: true },
  psychologistId: { type: mongoose.Schema.Types.ObjectId, ref: 'Psychologist', required: true },
  date: { type: Date },
  time: { type: String },
  status: { type: String, enum: ['pending', 'confirmed', 'rejected'], default: 'pending' },
});

export default mongoose.models.AppointmentPsy || mongoose.model('AppointmentPsy', appointmentPsySchema);