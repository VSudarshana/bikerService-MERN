  // Import the mongoose library
const mongoose = require('mongoose');

// Define the booking schema
const bookingSchema = new mongoose.Schema({
  // User who made the booking
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
    required: true // This field is mandatory
  },
  
  // Array of services booked
  services: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Service' // Reference to the Service model
  }],
  
  // Date for which the booking is made
  bookingDate: {
    type: Date,
    required: true // This field is mandatory
  },
  
  // Timestamp for when the booking was created
  createdAt: {
    type: Date,
    default: Date.now // Automatically set to the current date/time when a new booking is created
  },
  
  // Status of the booking
  status: {
    type: String,
    enum: ['pending', 'ready', 'completed'], // Only these values are allowed
    default: 'pending' // Default status when a new booking is created
  }
});

// Create and export the Booking model
module.exports = mongoose.model('Booking', bookingSchema);
