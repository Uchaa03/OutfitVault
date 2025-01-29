import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

/**
 * Controller for user registration.
 *
 * Registers a new user by validating the input, hashing the password, creating a user in the database,
 * and returning a JWT token to authenticate the user.
 *
 * @param {Object} req - The HTTP request object containing the user's registration details (username, email, password).
 * @param {Object} res - The HTTP response object used to send the registration status and response.
 * @returns {void} - A JSON response containing the success status and message, or an error message if registration fails.
 *
 * @throws {400} - If the email is already in use.
 * @throws {500} - If an internal server error occurs.
 *
 * @example
 * // Example of calling the register controller
 * app.post('/register', register);
 */
export const register = async (req, res) => {
    const { username, email, password } = req.body;
  
    try {
      // Check if the user already exists
      const existingUser = await User.findOne({ $or: [{ email }, { username }] });
      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: existingUser.email === email ? "Email already in use" : "Username already in use",
        });
      }


      // Encrypt the password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create the new user
      const newUser = new User({
        username,
        email,
        password: hashedPassword,
      });
  
      // Save the new user to the database
      await newUser.save();
      
      // Create the JWT token
      const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  
      res.status(201).json({
        success: true,
        message: 'User registered successfully',
        token, // Send the JWT token in the response
      });
    } catch (error) {
      console.error('Error registering user:', error.message);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  };
  

/**
 * Controller for user login.
 *
 * Logs in a user by validating the username and password, and if valid, returns a JWT token for authentication.
 *
 * @param {Object} req - The HTTP request object containing the login details (username, password).
 * @param {Object} res - The HTTP response object used to send the login status and response.
 * @returns {void} - A JSON response containing the success status and token, or an error message if login fails.
 *
 * @throws {400} - If username or password is missing or invalid credentials are provided.
 * @throws {500} - If an internal server error occurs.
 *
 * @example
 * // Example of calling the login controller
 * app.post('/login', login);
 */
export const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ success: false, message: 'Username and password are required' });
  }

  try {
    // Find the user
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ success: false, message: 'Invalid credentials' });
    }

    // Compare the password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: 'Invalid credentials' });
    }

    // Create a JWT
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ success: true, token });
  } catch (error) {
    console.error('Error in login:', error.message);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

/**
 * Controller to get user details for the logged-in user.
 *
 * Retrieves the logged-in user's details (username and email) from the request and returns them in the response.
 *
 * @param {Object} req - The HTTP request object containing the user data (from the `protect` middleware).
 * @param {Object} res - The HTTP response object used to send the user details or error messages.
 * @returns {void} - A JSON response containing the user details or an error message if user details cannot be retrieved.
 *
 * @throws {404} - If the user is not found.
 * @throws {500} - If an internal server error occurs.
 *
 * @example
 * // Example of calling the getUserDetails controller
 * app.get('/user-details', protect, getUserDetails);
 */
export const getUserDetails = async (req, res) => {
  try {
    const user = req.user; // Get the user from the middleware `protect`

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.status(200).json({ success: true, user: { username: user.username, email: user.email } });
  } catch (error) {
    console.error('Error getting user details:', error.message);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

/**
 * Controller to change the username of the logged-in user.
 *
 * Changes the username of the logged-in user if the new username is available, otherwise returns an error.
 *
 * @param {Object} req - The HTTP request object containing the new username.
 * @param {Object} res - The HTTP response object used to send the status and response.
 * @returns {void} - A JSON response containing the success status or an error message if the username change fails.
 *
 * @throws {400} - If the new username is already in use.
 * @throws {404} - If the user is not found.
 * @throws {500} - If an internal server error occurs.
 *
 * @example
 * // Example of calling the changeUsername controller
 * app.put('/change-username', protect, changeUsername);
 */
export const changeUsername = async (req, res) => {
  const { newUsername } = req.body;

  try {
    // Check if the new username already exists
    const usernameExists = await User.findOne({ username: newUsername });
    if (usernameExists) {
      return res.status(400).json({ success: false, message: 'Username already in use' });
    }

    // Find the user and update the username
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    user.username = newUsername;
    await user.save();

    res.status(200).json({ success: true, message: 'Username updated successfully' });
  } catch (error) {
    console.error('Error changing username:', error.message);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};
