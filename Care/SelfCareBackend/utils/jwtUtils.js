import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key';

export const generateToken = (user) => {
  return jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: '1d' });
};

export const generateTokenS = (user) => {
    return jwt.sign({ id: user._id, role: user.role , login: user.secretary.login }, JWT_SECRET, { expiresIn: '1d' });
  };

export const verifyToken = (token) => {
  return jwt.verify(token, JWT_SECRET);
};
//, login: user.secretary.login