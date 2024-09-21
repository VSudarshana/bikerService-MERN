  // Import necessary dependencies from React and third-party libraries
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Modal, Form } from 'react-bootstrap';

// Define the UserBookings component
function UserBookings() {
  // State to store all bookings
  const [bookings, setBookings] = useState([]);
  // State to control the visibility of the details modal
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  // State to store the currently selected booking for viewing details
  const [selectedBooking, setSelectedBooking] = useState(null);

  // Effect hook to fetch bookings when component mounts
  useEffect(() => {
    fetchBookings();
  }, []);

  // Function to fetch all bookings from the API
  const fetchBookings = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/bookings');
      setBookings(response.data);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    }
  };

  // Function to handle booking status changes
  const handleStatusChange = async (bookingId, newStatus) => {
    try {
      // Update booking status in the backend
      await axios.put(`http://localhost:5000/api/bookings/${bookingId}`, { status: newStatus });
      // Refresh bookings list
      fetchBookings();
      // If status is changed to 'completed', send completion email
      if (newStatus === 'completed') {
        await sendCompletionEmail(bookingId);
      }
    } catch (error) {
      console.error('Error updating booking status:', error);
    }
  };

  // Function to send completion email
  const sendCompletionEmail = async (bookingId) => {
    try {
      await axios.post(`http://localhost:5000/api/bookings/${bookingId}/send-completion-email`);
    } catch (error) {
      console.error('Error sending completion email:', error);
    }
  };

  // Function to open the details modal
  const openDetailsModal = (booking) => {
    setSelectedBooking(booking);
    setShowDetailsModal(true);
  };

  // Function to close the details modal
  const closeDetailsModal = () => {
    setSelectedBooking(null);
    setShowDetailsModal(false);
  };

  // Render the component
  return (
    <div>
      <h2>User Bookings</h2>
      {/* Table to display all bookings */}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>User</th>
            <th>Services</th>
            <th>Booking Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {/* Map through bookings and create a table row for each */}
          {bookings.map((booking) => (
            <tr key={booking._id}>
              <td>{booking.user.name}</td>
              <td>{booking.services.map(s => s.name).join(', ')}</td>
              <td>{new Date(booking.bookingDate).toLocaleDateString()}</td>
              <td>{booking.status}</td>
              <td>
                {/* Button to view booking details */}
                <Button variant="info" size="sm" onClick={() => openDetailsModal(booking)}>
                  View Details
                </Button>
                {/* Conditional rendering of status change buttons */}
                {booking.status === 'pending' && (
                  <Button variant="warning" size="sm" className="ms-2" onClick={() => handleStatusChange(booking._id, 'ready')}>
                    Mark Ready
                  </Button>
                )}
                {booking.status === 'ready' && (
                  <Button variant="success" size="sm" className="ms-2" onClick={() => handleStatusChange(booking._id, 'completed')}>
                    Mark Completed
                  </Button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal for displaying booking details */}
      <Modal show={showDetailsModal} onHide={closeDetailsModal}>
        <Modal.Header closeButton>
          <Modal.Title>Booking Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedBooking && (
            <Form>
              {/* Display user name */}
              <Form.Group className="mb-3">
                <Form.Label>User</Form.Label>
                <Form.Control type="text" value={selectedBooking.user.name} readOnly />
              </Form.Group>
              {/* Display user email */}
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" value={selectedBooking.user.email} readOnly />
              </Form.Group>
              {/* Display booked services */}
              <Form.Group className="mb-3">
                <Form.Label>Services</Form.Label>
                <Form.Control type="text" value={selectedBooking.services.map(s => s.name).join(', ')} readOnly />
              </Form.Group>
              {/* Display booking date */}
              <Form.Group className="mb-3">
                <Form.Label>Booking Date</Form.Label>
                <Form.Control type="text" value={new Date(selectedBooking.bookingDate).toLocaleDateString()} readOnly />
              </Form.Group>
              {/* Display booking status */}
              <Form.Group className="mb-3">
                <Form.Label>Status</Form.Label>
                <Form.Control type="text" value={selectedBooking.status} readOnly />
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeDetailsModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

// Export the UserBookings component as the default export
export default UserBookings;
