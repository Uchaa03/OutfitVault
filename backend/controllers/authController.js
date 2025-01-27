import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

// Controller for user registration
export const register = async (req, res) => {
    const { username, email, password } = req.body;
  
    try {
      // Check if the user already exists
      const userExists = await User.findOne({ email });
      if (userExists) {
        return res.status(400).json({ success: false, message: 'Email already in use' });
      }
  
      // Encrypt the password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
  
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
  

// Controller for user login
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

export const getUserDetails = async (req, res) => {
  try {
    const user = req.user; // Obtener el usuario del middleware `protect`

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.status(200).json({ success: true, user: { username: user.username, email: user.email } });
  } catch (error) {
    console.error('Error getting user details:', error.message);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

// Controller to change the username of the logged-in user
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