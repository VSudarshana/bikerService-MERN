  // Import required modules
const express = require('express');
const router = express.Router();
const { signup, login } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

// Define routes
// POST /api/auth/signup - User signup
router.post('/signup', signup);

// POST /api/auth/login - User login
router.post('/login', login);

// GET /api/auth/profile - Get user profile (protected route)
router.get('/profile', protect, (req, res) => {
  res.json({
    _id: req.user._id,
    name: req.user.name,
    username: req.user.username,
    email: req.user.email,
    phoneNumber: req.user.phoneNumber,
  });
});

// Export router
module.exports = router;
