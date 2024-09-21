  // Import necessary dependencies from React
import React from 'react';
// Import the hero image
import HeroImage from '../assets/hero-image.png';

// Define the Home component
const Home = () => {
  // Inline styles for custom fonts and other styling
  const styles = {
    header: {
      fontFamily: "'Montserrat', sans-serif",
      fontWeight: 700,
    },
    subheader: {
      fontFamily: "'Roboto', sans-serif",
      fontWeight: 400,
    },
    bodyText: {
      fontFamily: "'Open Sans', sans-serif",
    },
    featureIcon: {
      color: '#4a90e2', // Custom color for icons
    }
  };

  return (
    <div className="container mt-5">
      {/* Header Section */}
      <div className="jumbotron text-center bg-primary text-white py-5 rounded">
        <h1 className="display-4" style={styles.header}>Bike Service Application</h1>
        <p className="lead" style={styles.subheader}>A modern solution for bike service stations to manage and offer services to customers seamlessly.</p>
        <hr className="my-4" />
        <p style={styles.bodyText}>Owners can list all the services, and customers can book their preferred services in just a few clicks!</p>
      </div>

      {/* Overview Section */}
      <div className="row mt-5">
        <div className="col-lg-6 col-md-12">
          {/* Hero image */}
          <img
            src={HeroImage}
            className="img-fluid rounded"
            alt="Bike service overview"
          />
        </div>
        <div className="col-lg-6 col-md-12 d-flex flex-column justify-content-center">
          <h2 className="mb-4 text-primary" style={styles.header}>Overview</h2>
          <p className="text-justify" style={styles.bodyText}>
            This application is designed specifically for owners of bike service stations. It helps owners manage their services efficiently by allowing them to list all the services they provide. On the customer side, users can browse through various service offerings and book one or more services that meet their needs.
          </p>
          <p className="text-justify" style={styles.bodyText}>
            Whether it's a regular maintenance check, bike wash, or specific repair services, the application makes the booking process quick and hassle-free. The owners can track bookings and update services in real time.
          </p>
        </div>
      </div>

      {/* Features Section */}
      <div className="row text-center mt-5">
        <h2 className="text-primary mb-4" style={styles.header}>Key Features</h2>
        {/* Service Listings Feature */}
        <div className="col-lg-4 col-md-6 mb-4">
          <div className="card h-100 shadow">
            <div className="card-body">
              <i className="fas fa-tools fa-3x mb-3" style={styles.featureIcon}></i>
              <h5 className="card-title" style={styles.subheader}>Service Listings</h5>
              <p className="card-text" style={styles.bodyText}>Owners can easily list all the bike services they offer with detailed descriptions.</p>
            </div>
          </div>
        </div>
        {/* Easy Booking Feature */}
        <div className="col-lg-4 col-md-6 mb-4">
          <div className="card h-100 shadow">
            <div className="card-body">
              <i className="fas fa-calendar-check fa-3x mb-3" style={styles.featureIcon}></i>
              <h5 className="card-title" style={styles.subheader}>Easy Booking</h5>
              <p className="card-text" style={styles.bodyText}>Customers can book their preferred services directly through the application.</p>
            </div>
          </div>
        </div>
        {/* Seamless Management Feature */}
        <div className="col-lg-4 col-md-6 mb-4">
          <div className="card h-100 shadow">
            <div className="card-body">
              <i className="fas fa-biking fa-3x mb-3" style={styles.featureIcon}></i>
              <h5 className="card-title" style={styles.subheader}>Seamless Management</h5>
              <p className="card-text" style={styles.bodyText}>Owners can manage bookings and services in real-time from a single platform.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Export the Home component as the default export
export default Home;