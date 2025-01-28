import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

export const protect = async (req, res, next) => {
  let token;

  // Check if the token is in the request headers
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Get the token from the headers
      token = req.headers.authorization.split(' ')[1];

      // Verify if the token is valid
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Find the user in the database and attach it to the request
      req.user = await User.findById(decoded.userId).select('-password');
      next(); // Continue to the next middleware or controller
    } catch (error) {
      console.error(error);
      return res.status(401).json({ success: false, message: 'Not authorized' });
    }
  }

  if (!token) {
    return res.status(401).json({ success: false, message: 'Not authorized, no token' });
  }
};