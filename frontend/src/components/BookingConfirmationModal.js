// Import necessary dependencies from React and React-Bootstrap
import React from 'react';
import { Modal, Button } from 'react-bootstrap';

// Define the BookingConfirmationModal component
// It receives props: show (boolean), onHide (function), and message (string)
const BookingConfirmationModal = ({ show, onHide, message }) => (
  // Render a Bootstrap Modal component
  <Modal show={show} onHide={onHide}>
    {/* Modal Header */}
    <Modal.Header closeButton>
      {/* Modal Title */}
      <Modal.Title>Booking Confirmation</Modal.Title>
    </Modal.Header>

    {/* Modal Body - Display the confirmation message */}
    <Modal.Body>{message}</Modal.Body>

    {/* Modal Footer */}
    <Modal.Footer>
      {/* Close button - triggers the onHide function when clicked */}
      <Button variant="secondary" onClick={onHide}>
        Close
      </Button>
    </Modal.Footer>
  </Modal>
);

// Export the BookingConfirmationModal component as the default export
export default BookingConfirmationModal;


