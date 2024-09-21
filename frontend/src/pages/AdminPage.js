  // Import necessary dependencies from React and third-party libraries
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Button, Form, ListGroup, Badge, Modal, Tabs, Tab } from 'react-bootstrap';
import UserBookings from '../components/UserBookings';

function AdminPage() {
  // State variables
  const [services, setServices] = useState([]); // Stores all services
  const [newService, setNewService] = useState(''); // Stores new service name
  const [editingService, setEditingService] = useState(null); // Stores service being edited
  const [showEditModal, setShowEditModal] = useState(false); // Controls visibility of edit modal

  // Effect hook to initialize default services and fetch all services on component mount
  useEffect(() => {
    initializeDefaultServices();
    fetchServices();
  }, []);

  // Function to initialize default services
  const initializeDefaultServices = async () => {
    try {
      await axios.post('http://localhost:5000/api/services/init-defaults');
    } catch (error) {
      console.error('Error initializing default services:', error);
    }
  };

  // Function to fetch all services from the API
  const fetchServices = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/services');
      setServices(response.data);
    } catch (error) {
      console.error('Error fetching services:', error);
    }
  };

  // Function to add a new service
  const addService = async () => {
    try {
      await axios.post('http://localhost:5000/api/services', { 
        name: newService,
        isActive: true 
      });
      setNewService('');
      fetchServices();
    } catch (error) {
      console.error('Error adding service:', error);
    }
  };

  // Function to toggle service active status
  const toggleService = async (id, isActive) => {
    try {
      await axios.put(`http://localhost:5000/api/services/${id}`, { isActive: !isActive });
      fetchServices();
    } catch (error) {
      console.error('Error toggling service:', error);
    }
  };

  // Function to delete a service
  const deleteService = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/services/${id}`);
      fetchServices();
    } catch (error) {
      console.error('Error deleting service:', error);
    }
  };

  // Function to open edit modal
  const openEditModal = (service) => {
    setEditingService(service);
    setShowEditModal(true);
  };

  // Function to close edit modal
  const closeEditModal = () => {
    setEditingService(null);
    setShowEditModal(false);
  };

  // Function to update a service
  const updateService = async () => {
    try {
      await axios.put(`http://localhost:5000/api/services/${editingService._id}`, editingService);
      closeEditModal();
      fetchServices();
    } catch (error) {
      console.error('Error updating service:', error);
    }
  };

  return (
    <div className="container mt-5">
      {/* Header Card */}
      <Card className="mb-4">
        <Card.Body>
          <Card.Title as="h1">Service Station Admin Dashboard</Card.Title>
          <Card.Text>
            Manage your service station's offerings and view user bookings here.
          </Card.Text>
        </Card.Body>
      </Card>

      {/* Tabs for Services and Bookings */}
      <Tabs defaultActiveKey="services" id="admin-tabs" className="mb-3">
        {/* Services Tab */}
        <Tab eventKey="services" title="Manage Services">
          {/* Add New Service Card */}
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Add New Service</Card.Title>
              <Form onSubmit={(e) => { e.preventDefault(); addService(); }}>
                <Form.Group className="mb-3">
                  <Form.Control
                    type="text"
                    placeholder="Service name"
                    value={newService}
                    onChange={(e) => setNewService(e.target.value)}
                  />
                </Form.Group>
                <Button variant="primary" type="submit">Add Service</Button>
              </Form>
            </Card.Body>
          </Card>

          {/* Manage Services Card */}
          <Card>
            <Card.Body>
              <Card.Title>Manage Services</Card.Title>
              <ListGroup>
                {services.map((service) => (
                  <ListGroup.Item 
                    key={service._id}
                    className="d-flex justify-content-between align-items-center"
                  >
                    <div>
                      <h5>{service.name}</h5>
                      <Badge bg={service.isActive ? 'success' : 'secondary'}>
                        {service.isActive ? 'Active' : 'Inactive'}
                      </Badge>
                    </div>
                    <div>
                      {/* Edit Button */}
                      <Button
                        variant="outline-primary"
                        size="sm"
                        className="me-2"
                        onClick={() => openEditModal(service)}
                      >
                        Edit
                      </Button>
                      {/* Toggle Active Status Button */}
                      <Button
                        variant={service.isActive ? 'outline-secondary' : 'outline-success'}
                        size="sm"
                        className="me-2"
                        onClick={() => toggleService(service._id, service.isActive)}
                      >
                        {service.isActive ? 'Deactivate' : 'Activate'}
                      </Button>
                      {/* Delete Button */}
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => deleteService(service._id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card.Body>
          </Card>
        </Tab>
        {/* Bookings Tab */}
        <Tab eventKey="bookings" title="User Bookings">
          <UserBookings />
        </Tab>
      </Tabs>

      {/* Edit Service Modal */}
      <Modal show={showEditModal} onHide={closeEditModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Service</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Service Name</Form.Label>
              <Form.Control
                type="text"
                value={editingService?.name || ''}
                onChange={(e) => setEditingService({...editingService, name: e.target.value})}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeEditModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={updateService}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default AdminPage;