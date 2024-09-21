 // Import the mongoose library for MongoDB object modeling
const mongoose = require('mongoose');

// Define the schema for the Service model
const serviceSchema = new mongoose.Schema({
  // Name of the service
  name: {
    type: String,
    required: true // This field is mandatory
  },
  
  // Indicates whether the service is currently active
  isActive: {
    type: Boolean,
    default: true // By default, a new service is set to active
  },
  
  // Indicates whether this is a default service
  isDefault: {
    type: Boolean,
    default: false // By default, a new service is not set as a default service
  }
});

// Create and export the Service model
// This model can be used to interact with the 'services' collection in the database
module.exports = mongoose.model('Service', serviceSchema);
