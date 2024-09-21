 // Import necessary dependencies from React and third-party libraries
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table } from 'react-bootstrap';

// It receives props: userId (string, the ID of the current user)
const UserHistory = ({ userId }) => {
  // State to store the user's booking history
  const [bookings, setBookings] = useState([]);

  // useEffect hook to fetch user's booking history when the component mounts or userId changes
  useEffect(() => {
    // Async function to fetch bookings
    const fetchBookings = async () => {
      try {
        // Retrieve user info from local storage
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        // Make API call to fetch user's bookings
        const response = await axios.get(`http://localhost:5000/api/bookings/user/${userId}`, {
          headers: { Authorization: `Bearer ${userInfo.token}` }, // Include auth token in request header
        });
        // Update bookings state with fetched data
        setBookings(response.data);
      } catch (error) {
        // Log any errors that occur during fetching
        console.error('Error fetching user bookings:', error);
      }
    };

    // Call the fetchBookings function
    fetchBookings();
  }, [userId]); // Dependency array - effect runs when userId changes

  // Render the component
  return (
    <div className='mt-5'>
      <h3>Booking History</h3>
      {/* Bootstrap Table to display booking history */}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Booking Date</th>
            <th>Services</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {/* Map through bookings and create a table row for each */}
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
  );
};

// Export the UserHistory component as the default export
export default UserHistory;
