// Import necessary dependencies from React and React-Bootstrap
import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

// Define the BookServices component
// It receives props: services (array of available services) and onBooking (function to handle booking submission)
const BookServices = ({ services, onBooking }) => {
  // State for selected services (array of service IDs)
  const [selectedServices, setSelectedServices] = useState([]);
  // State for booking date
  const [bookingDate, setBookingDate] = useState('');

  // Function to handle service selection/deselection
  const handleServiceSelection = (serviceId) => {
    setSelectedServices(prevSelected => 
      prevSelected.includes(serviceId)
        ? prevSelected.filter(id => id !== serviceId) // Remove if already selected
        : [...prevSelected, serviceId] // Add if not selected
    );
  };

  // Function to handle form submission
  const handleSubmit = () => {
    onBooking(selectedServices, bookingDate); // Call the onBooking function passed as prop
    setSelectedServices([]); // Reset selected services
    setBookingDate(''); // Reset booking date
  };

  return (
    <div className="row mt-5">
      <div className="col-md-12">
        <h3>Book Services</h3>
        <Form>
          {/* Map through services and create a checkbox for each */}
          {services.map((service) => (
            <Form.Check 
              type="checkbox"
              id={service._id}
              label={service.name}
              key={service._id}
              onChange={() => handleServiceSelection(service._id)}
              checked={selectedServices.includes(service._id)}
            />
          ))}
          {/* Date picker for booking date */}
          <Form.Group className="mt-3">
            <Form.Label>Select Date for Booking</Form.Label>
            <Form.Control 
              type="date" 
              value={bookingDate} 
              onChange={(e) => setBookingDate(e.target.value)}
            />
          </Form.Group>
        </Form>
        {/* Submit button */}
        <Button 
          className="mt-3" 
          variant="primary" 
          onClick={handleSubmit}
          // Disable button if no services selected or no date chosen
          disabled={selectedServices.length === 0 || !bookingDate}
        >
          Book Selected Services
        </Button>
      </div>
    </div>
  );
};

// Export the BookServices component as the default export
export default BookServices;
