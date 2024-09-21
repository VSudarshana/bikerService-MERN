 // Import required modules
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

// Middleware to protect routes
exports.protect = async (req, res, next) => {
  let token;

  // Check if token is present in the Authorization header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Extract token from the Authorization header
      token = req.headers.authorization.split(' ')[1];

      // Verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Find user by id and attach to request object
      req.user = await User.findById(decoded.id).select('-password');

      next();
    } catch (error) {
      // If token verification fails, send error response
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  // If no token is present, send error response
  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
}; 