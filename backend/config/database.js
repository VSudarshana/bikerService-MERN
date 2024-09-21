 // Import the mongoose library
const mongoose = require('mongoose');

// Define an asynchronous function to connect to the database
const connectDB = async () => {
  try {
    // Attempt to connect to MongoDB using the URI stored in environment variables
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Log a success message if the connection is established
    console.log('MongoDB connected successfully');
  } catch (error) {
    // If an error occurs during connection, log the error
    console.error('MongoDB connection error:', error);
    // Exit the process with a failure code (1)
    process.exit(1);
  }
};

// Export the connectDB function to be used in other parts of the application
module.exports = connectDB;