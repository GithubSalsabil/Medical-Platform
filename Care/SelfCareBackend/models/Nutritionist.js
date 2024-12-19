// models/Doctor.js
import mongoose from 'mongoose';

const SecretarySchema = new mongoose.Schema({
    login: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

const NutritionistSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    gender: { 
        type: String, 
        enum: ['male', 'female'],  // Restrict to 'male' or 'female'
        required: true 
      },
      role: { type: String, default: 'Nutritionist', required: true },
    secretary: { type: SecretarySchema, required: true }
}, { timestamps: true });

export default mongoose.models.Nutritionist || mongoose.model('Nutritionist', NutritionistSchema);