  // Import necessary dependencies from React and React-Bootstrap
import React from 'react';
import { Table } from 'react-bootstrap';

// Define the CurrentBookings component
// It receives props: bookings (array of current booking objects)
const CurrentBookings = ({ bookings }) => (
  <div className="row mt-5">
    <div className="col-md-12">
      <h3>Current Bookings</h3>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Booking Date</th>
            <th>Services</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {/* Map through bookings array and create a table row for each booking */}
          {bookings.map((booking) => (
            <tr key={booking._id}>
              {/* Display booking date in local date string format */}
              <td>{new Date(booking.bookingDate).toLocaleDateString()}</td>
              {/* Display services as a comma-separated list of service names */}
              <td>{booking.services.map(s => s.name).join(', ')}</td>
              {/* Display booking status */}
              <td>{booking.status}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  </div>
);

// Export the CurrentBookings component as the default export
export default CurrentBookings;
