  // Import required modules
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

// Function to generate a JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d', // Token expires in 30 days
  });
};

// User signup controller
exports.signup = async (req, res) => {
  try {
    // Extract user data from request body
    const { name, username, email, phoneNumber, password } = req.body;

    // Check if user already exists
    const userExists = await User.findOne({ $or: [{ email }, { username }] });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create new user
    const user = await User.create({
      name,
      username,
      email,
      phoneNumber,
      password,
    });

    if (user) {
      // If user is created successfully, send response with user data and token
      res.status(201).json({
        _id: user._id,
        name: user.name,
        username: user.username,
        email: user.email,
        phoneNumber: user.phoneNumber,
        token: generateToken(user._id),
      });
    } else {
      // If user creation fails, send error response
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    // Handle any server errors
    res.status(500).json({ message: 'Server error' });
  }
};

// User login controller
exports.login = async (req, res) => {
  try {
    // Extract login credentials from request body
    const { username, password } = req.body;

    // Find user by username
    const user = await User.findOne({ username });

    // Check if user exists and password matches
    if (user && (await user.matchPassword(password))) {
      // If login is successful, send response with user data and token
      res.json({
        _id: user._id,
        name: user.name,
        username: user.username,
        email: user.email,
        phoneNumber: user.phoneNumber,
        token: generateToken(user._id),
      });
    } else {
      // If login fails, send error response
      res.status(401).json({ message: 'Invalid username or password' });
    }
  } catch (error) {
    // Handle any server errors
    res.status(500).json({ message: 'Server error' });
  }
};