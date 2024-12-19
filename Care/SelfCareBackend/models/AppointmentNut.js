import mongoose from 'mongoose';

const appointmentNSchema = new mongoose.Schema({
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  patientName: { type: String, ref: 'User', required: true },
  patientAge: { type: Number },
  patientPhone: { type: String },
  description: { type: String },
  nutritionistName: { type: String, ref: 'Nutritionist', required: true },
  nutritionistId: { type: mongoose.Schema.Types.ObjectId, ref: 'Nutritionist', required: true },
  date: { type: Date },
  time: { type: String },
  status: { type: String, enum: ['pending', 'confirmed', 'rejected'], default: 'pending' },
});

export default mongoose.models.AppointmentN || mongoose.model('AppointmentN', appointmentNSchema);