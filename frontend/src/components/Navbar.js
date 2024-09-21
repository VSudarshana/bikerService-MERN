// Import necessary dependencies from React and react-router-dom
import React from "react";
import { Link } from "react-router-dom";

// Define the Navbar component
const Navbar = () => {
  // Inline styles for various elements
  const styles = {
    navLink: {
      transition: "color 0.3s ease", // Smooth transition for color change
    },
    brandText: {
      fontFamily: "'Russo One', sans-serif", // Unique font for brand text
      fontSize: "1.5rem",
    },
    firstLetter: {
      fontSize: "2rem",
      color: "#ff6b6b", // Unique color for the first letter
      textShadow: "2px 2px 4px rgba(0,0,0,0.1)", // Subtle text shadow
    },
  };

  return (
    // Main navbar container with Bootstrap classes for light theme and responsiveness
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        {/* Brand logo/name with link to home page and unique styling */}
        <Link className="navbar-brand" to="/" style={styles.brandText}>
          <span style={styles.firstLetter}>B</span>ike Services
        </Link>

        {/* Hamburger button for collapsed menu on smaller screens */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Collapsible navbar content */}
        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarNav"
        >
          {/* Navigation links aligned to the right */}
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link
                className="nav-link"
                to="/"
                style={styles.navLink}
                onMouseEnter={(e) => (e.target.style.color = "#ff6b6b")}
                onMouseLeave={(e) => (e.target.style.color = "")}
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                to="/admin"
                style={styles.navLink}
                onMouseEnter={(e) => (e.target.style.color = "#ff6b6b")}
                onMouseLeave={(e) => (e.target.style.color = "")}
              >
                Admin
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                to="/login"
                style={styles.navLink}
                onMouseEnter={(e) => (e.target.style.color = "#ff6b6b")}
                onMouseLeave={(e) => (e.target.style.color = "")}
              >
                Login
              </Link>
            </li>
            <li>
              <Link
                className="nav-link"
                to="/profile"
                style={styles.navLink}
                onMouseEnter={(e) => (e.target.style.color = "#ff6b6b")}
                onMouseLeave={(e) => (e.target.style.color = "")}
              >
                User Profile
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

// Export the Navbar component as the default export
export default Navbar;
