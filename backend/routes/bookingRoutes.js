 // Import required modules
const express = require('express');
const router = express.Router();
const Booking = require('../models/userBookings');
const Service = require('../models/serviceModel');
const User = require('../models/userModel');
const nodemailer = require('nodemailer');

// Route to get all bookings
router.get('/', async (req, res) => {
  try {
    // Fetch all bookings and populate user and services data
    const bookings = await Booking.find().populate('user').populate('services');
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route to create a new booking
router.post('/', async (req, res) => {
  try {
    const { userId, services, bookingDate } = req.body;

    // Check if user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Fetch service details
    const serviceDetails = await Service.find({ _id: { $in: services } });

    // Create new booking
    const booking = new Booking({
      user: userId,
      services: services,
      bookingDate: new Date(bookingDate),
      status: 'pending'
    });
    await booking.save();

    // Set up email transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    // Configure email options
    const mailOptions = {
      from: `"Service Booking System" <${process.env.EMAIL_USER}>`,
      to: process.env.ADMIN_EMAIL,
      subject: 'New Service Booking',
      text: `
        New booking received:
        User: ${user.name}
        Email: ${user.email}
        Services booked: ${serviceDetails.map(s => s.name).join(', ')}
        Booking Date: ${new Date(bookingDate).toLocaleDateString()}
      `
    };

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log('Error sending email: ', error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });

    res.status(201).json({ message: 'Booking successful! An email has been sent to the admin.' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Route to update booking status
router.put('/:id', async (req, res) => {
  try {
    // Update booking status and return updated booking
    const booking = await Booking.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
    res.json(booking);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Route to send completion email
router.post('/:id/send-completion-email', async (req, res) => {
  try {
    // Fetch booking details
    const booking = await Booking.findById(req.params.id).populate('user').populate('services');
    
    // Set up email transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    // Configure email options
    const mailOptions = {
      from: `"Service Booking System" <${process.env.EMAIL_USER}>`,
      to: booking.user.email,
      subject: 'Your Service Booking is Completed',
      text: `
        Dear ${booking.user.name},

        Your service booking has been completed and ready for delivery. Here are the details:

        Services: ${booking.services.map(s => s.name).join(', ')}
        Booking Date: ${new Date(booking.bookingDate).toLocaleDateString()}

        Thank you for using our service!
      `
    };

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log('Error sending completion email: ', error);
        res.status(500).json({ message: 'Error sending completion email' });
      } else {
        console.log('Completion email sent: ' + info.response);
        res.json({ message: 'Completion email sent successfully' });
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route to get a specific booking
router.get('/:id', async (req, res) => {
  try {
    // Fetch specific booking and populate user and services data
    const booking = await Booking.findById(req.params.id).populate('user').populate('services');
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route to delete a booking
router.delete('/:id', async (req, res) => {
  try {
    // Find and delete the booking
    const booking = await Booking.findByIdAndDelete(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    res.json({ message: 'Booking deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route to get current bookings for a user
router.get('/user/:userId/current', async (req, res) => {
  try {
    // Fetch current bookings (pending or ready) for a specific user
    const bookings = await Booking.find({ 
      user: req.params.userId,
      status: { $in: ['pending', 'ready'] }
    }).populate('services');
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route to get all bookings for a user
router.get('/user/:userId', async (req, res) => {
  try {
    // Fetch all bookings for a specific user
    const bookings = await Booking.find({ user: req.params.userId }).populate('services');
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Export the router
module.exports = router; 

