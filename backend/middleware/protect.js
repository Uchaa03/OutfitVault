import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

/**
 * Middleware to protect routes by verifying the JSON Web Token (JWT) and attaching user data to the request.
 *
 * The middleware checks for the presence of a JWT in the request headers, verifies it, and attaches the
 * corresponding user to the request object if the token is valid.
 * If the token is missing or invalid, the request is rejected with a 401 Unauthorized error.
 *
 * @param {Object} req - The request object representing the HTTP request.
 * @param {Object} res - The response object representing the HTTP response.
 * @param {Function} next - The next middleware function to pass control to the next handler.
 *
 * @returns {void}
 *
 * @throws {401} - If no token is provided or the token is invalid.
 *
 * @example
 * // Example of using protect middleware in a route
 * app.use('/protected-route', protect, (req, res) => {
 *   res.send('This is a protected route!');
 * });
 *
 * @description
 * The middleware expects the JWT to be sent in the 'Authorization' header as 'Bearer <token>'.
 * The token is verified using a secret stored in the environment variable `JWT_SECRET`.
 * If the token is valid, the user's details (excluding password) are attached to the `req.user` object.
 * If the token is missing or invalid, a 401 Unauthorized response is sent with an appropriate error message.
 */
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
