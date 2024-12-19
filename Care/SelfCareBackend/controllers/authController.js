import Doctor from '../models/Doctor.js';
import Patient from '../models/Patient.js';
import Nutritionist from '../models/Nutritionist.js';
import FitnessTrainer from '../models/FitnessTrainer.js';
import Psychologist from '../models/Psychologist.js';
import bcrypt from 'bcryptjs';
import { generateToken, generateTokenS } from '../utils/jwtUtils.js';

const collections = [Doctor, Patient, Nutritionist, FitnessTrainer, Psychologist];

export const login = async (req, res) => {
  const { email, password, } = req.body;

  try {
    // Vérifiez l'utilisateur dans chaque collection
    for (const Collection of collections) {
      switch (Collection) {
        case Doctor:
            const user1 = await Doctor.findOne({ "secretary.login":email });
            console.log("user1", user1);
            if (user1) {
              const isPasswordValid = await bcrypt.compare(password, user1.secretary.password);
              if (!isPasswordValid) return res.status(401).json({ message: 'Invalid credentials' });
      
              // Générer un token
              const token = generateTokenS(user1);
              console.log("token",token)
              return res.json({ token, role: user1.role, id :user1._id, user: user1 });
            }
            break;
            case Nutritionist :
                const user2 = await Nutritionist.findOne({ "secretary.login":email });
                console.log("user2", user2);
                if (user2) {
                  const isPasswordValid = await bcrypt.compare(password, user2.secretary.password);
                  if (!isPasswordValid) return res.status(401).json({ message: 'Invalid credentials' });
          
                  // Générer un token
                  const token = generateTokenS(user2);
                  console.log(user2._id);
                  console.log("token",token)
                  return res.json({ token, role: user2.role, id :user2._id, user: user2 });
                }
                break;
            case Patient:
                const user = await Collection.findOne({ email });
                console.log(user);
                if (user) {
                const isPasswordValid = await bcrypt.compare(password, user.password);
                if (!isPasswordValid) return res.status(401).json({ message: 'Invalid credentials' });
        
                // Générer un token
                const token = generateToken(user);
                console.log(token)
                return res.json({ token, role: user.role, PatientID: user._id, user: user });
                }
                break;
            case FitnessTrainer:
            const user3 = await Collection.findOne({ email });
            console.log(user3);
            if (user3) {
              const isPasswordValid = await bcrypt.compare(password, user3.password);
              if (!isPasswordValid) return res.status(401).json({ message: 'Invalid credentials' });
      
              // Générer un token
              const token = generateToken(user3);
              console.log(token)
              return res.json({ token, role: user3.role, id: user3._id,  user: user3 });
            }
            break;
            case Psychologist:
            const user4 = await Collection.findOne({ email });
            console.log(user4);
            if (user4) {
              const isPasswordValid = await bcrypt.compare(password, user4.password);
              if (!isPasswordValid) return res.status(401).json({ message: 'Invalid credentials' });
      
              // Générer un token
              const token = generateToken(user4);
              console.log(token)
              return res.json({ token, role: user4.role, id: user4._id, user: user4 });
            }
            break;
        default:
            return res.status(500).json({ message: "error message" });
      }
    }
    return res.status(404).json({ message: 'User not found'});
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};