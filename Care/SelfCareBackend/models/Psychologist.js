import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';


const PsychologistSchema = new mongoose.Schema({ 
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    password: { type: String, required: true },
    gender: { 
      type: String, 
      enum: ['male', 'female'],  // Restrict to 'male' or 'female'
      required: true 
    },
    role: { type: String, default: 'Psychologist', required: true },
  }, { timestamps: true });
  PsychologistSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
  });


export default mongoose.models.Psychologist || mongoose.model('Psychologist', PsychologistSchema);