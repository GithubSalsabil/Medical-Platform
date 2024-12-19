import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema({
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  patientName: { type: String, ref: 'User', required: true },
  patientAge: { type: Number },
  patientPhone: { type: String },
  description: { type: String },
  doctorName: { type: String, ref: 'Doctor', required: true },
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true },
  date: { type: Date },
  time: { type: String },
  status: { type: String, enum: ['pending', 'confirmed', 'rejected'], default: 'pending' },
});

export default mongoose.models.Appointment || mongoose.model('Appointment', appointmentSchema);