const express = require('express');
const router = express.Router();
const Service = require('../models/serviceModel');

// Get all services
router.get('/', async (req, res) => {
  try {
    const services = await Service.find();
    res.json(services);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new service
router.post('/', async (req, res) => {
  const service = new Service({
    name: req.body.name,
    isActive: true,
    isDefault: false
  });

  try {
    const newService = await service.save();
    res.status(201).json(newService);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update a service
router.put('/:id', async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }

    service.name = req.body.name || service.name;
    service.isActive = req.body.isActive !== undefined ? req.body.isActive : service.isActive;

    const updatedService = await service.save();
    res.json(updatedService);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a service
router.delete('/:id', async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }

    await Service.findByIdAndDelete(req.params.id);
    res.json({ message: 'Service deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Initialize default services
router.post('/init-defaults', async (req, res) => {
  try {
    const defaultServices = [
      { name: 'General service check-up', isActive: true, isDefault: true },
      { name: 'Oil change', isActive: true, isDefault: true },
      { name: 'Water wash', isActive: true, isDefault: true },
    ];

    for (const service of defaultServices) {
      await Service.findOneAndUpdate(
        { name: service.name },
        service,
        { upsert: true, new: true }
      );
    }

    res.json({ message: 'Default services initialized' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;