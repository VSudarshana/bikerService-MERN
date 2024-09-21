  // Import necessary dependencies and components
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';
import UserProfile from '../components/UserProfile';
import CurrentBookings from '../components/CurrentBookings';
import BookServices from '../components/BookServices';
import BookingConfirmationModal from '../components/BookingConfirmationModal';
import UserHistory from '../components/UserHistory';

const ProfilePage = () => {
  // State variables
  const [user, setUser] = useState(null); // Stores user information
  const [services, setServices] = useState([]); // Stores available services
  const [showTooltip, setShowTooltip] = useState(true); // Controls visibility of login success tooltip
  const [currentBookings, setCurrentBookings] = useState([]); // Stores user's current bookings
  const [showBookingModal, setShowBookingModal] = useState(false); // Controls visibility of booking confirmation modal
  const [bookingConfirmation, setBookingConfirmation] = useState(''); // Stores booking confirmation message

  const navigate = useNavigate(); // Hook for programmatic navigation

  // Effect hook to fetch user profile, services, and current bookings
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // Retrieve user info from local storage
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        if (!userInfo) {
          navigate('/login');
          return;
        }

        // Fetch user profile
        const { data } = await axios.get('http://localhost:5000/api/auth/profile', {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        });
        setUser(data);

        // Fetch and filter active services
        const servicesResponse = await axios.get('http://localhost:5000/api/services');
        const activeServices = servicesResponse.data.filter(service => service.isActive);
        setServices(activeServices);

        // Fetch user's current bookings
        const bookingsResponse = await axios.get(`http://localhost:5000/api/bookings/user/${data._id}/current`, {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        });
        setCurrentBookings(bookingsResponse.data);

        // Hide tooltip after 3 seconds
        setTimeout(() => setShowTooltip(false), 3000);
      } catch (error) {
        console.error('Error fetching profile:', error);
        navigate('/login');
      }
    };

    fetchProfile();
  }, [navigate]);

  // Function to handle user logout
  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    navigate('/login');
  };

  // Function to handle booking submission
  const handleBooking = async (selectedServices, bookingDate) => {
    try {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      // Send booking request to the server
      const response = await axios.post('http://localhost:5000/api/bookings', {
        userId: user._id,
        services: selectedServices,
        bookingDate: bookingDate
      }, {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      });
      // Set confirmation message and show modal
      setBookingConfirmation(response.data.message);
      setShowBookingModal(true);

      // Refresh current bookings after successful booking
      const bookingsResponse = await axios.get(`http://localhost:5000/api/bookings/user/${user._id}/current`, {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      });
      setCurrentBookings(bookingsResponse.data);
    } catch (error) {
      console.error('Error booking services:', error);
      alert('Failed to book services. Please try again.');
    }
  };

  // Show loading state if user data is not yet loaded
  if (!user) {
    return <div>Loading...</div>;
  }

  // Render the profile page
  return (
    <div className="container mt-5">
      {/* Login success tooltip */}
      <OverlayTrigger
        placement="bottom"
        overlay={<Tooltip id="tooltip-success">Login Successful!</Tooltip>}
        show={showTooltip}
      >
        <div className="alert alert-success" role="alert">
          Welcome to your dashboard!
        </div>
      </OverlayTrigger>

      <h1 className="text-center mb-4">User Dashboard</h1>

      {/* User profile component */}
      <UserProfile user={user} onLogout={handleLogout} />

      {/* Current bookings component */}
      <CurrentBookings bookings={currentBookings} />

      {/* Book services component */}
      <BookServices 
        services={services} 
        onBooking={handleBooking}
      />

      {/* User booking history component */}
      <UserHistory userId={user._id} />

      {/* Booking confirmation modal */}
      <BookingConfirmationModal 
        show={showBookingModal}
        onHide={() => setShowBookingModal(false)}
        message={bookingConfirmation}
      />
    </div>
  );
};

export default ProfilePage;
