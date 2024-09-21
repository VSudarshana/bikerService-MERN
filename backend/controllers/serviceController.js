  // Import the Service model
const Service = require('../models/serviceModel');

// Controller to get all services
exports.getAllServices = async (req, res) => {
  try {
    // Fetch all services from the database
    const services = await Service.find();
    // Send the services as a JSON response
    res.json(services);
  } catch (error) {
    // If an error occurs, send a 500 status code with an error message
    res.status(500).json({ message: 'Error fetching services', error: error.message });
  }
};

// Controller to create a new service
exports.createService = async (req, res) => {
  try {
    // Extract service details from the request body
    const { name, description, isActive } = req.body;
    // Create a new Service instance
    const service = new Service({ name, description, isActive });
    // Save the new service to the database
    await service.save();
    // Send the created service as a JSON response with a 201 status code
    res.status(201).json(service);
  } catch (error) {
    // If an error occurs, send a 400 status code with an error message
    res.status(400).json({ message: 'Error creating service', error: error.message });
  }
};

// Controller to update an existing service
exports.updateService = async (req, res) => {
  try {
    // Extract the service ID from the request parameters
    const { id } = req.params;
    // Extract updated service details from the request body
    const { name, description, isActive } = req.body;
    // Find the service by ID and update it, returning the updated document
    const service = await Service.findByIdAndUpdate(
      id,
      { name, description, isActive },
      { new: true }
    );
    // If no service is found, send a 404 status code
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }
    // Send the updated service as a JSON response
    res.json(service);
  } catch (error) {
    // If an error occurs, send a 400 status code with an error message
    res.status(400).json({ message: 'Error updating service', error: error.message });
  }
};

// Controller to delete a service
exports.deleteService = async (req, res) => {
  try {
    // Extract the service ID from the request parameters
    const { id } = req.params;
    // Find the service by ID and delete it
    const service = await Service.findByIdAndDelete(id);
    // If no service is found, send a 404 status code
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }
    // Send a success message as a JSON response
    res.json({ message: 'Service deleted successfully' });
  } catch (error) {
    // If an error occurs, send a 400 status code with an error message
    res.status(400).json({ message: 'Error deleting service', error: error.message });
  }
};
