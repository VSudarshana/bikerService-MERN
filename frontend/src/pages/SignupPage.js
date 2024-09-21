  // Import necessary dependencies
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// Define the SignupPage component
const SignupPage = () => {
  // State variables for form inputs and error handling
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  // Hook for programmatic navigation
  const navigate = useNavigate();

  // Function to check password strength
  const checkPasswordStrength = (password) => {
    // Define regex patterns for different criteria
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    
    // Check if password meets all criteria
    if (password.length >= 8 && hasUpperCase && hasLowerCase && hasNumbers && hasSpecialChar) {
      return true; // Strong password
    }
    return false; // Weak password
  };

  // Function to handle form submission
  const handleSignup = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    setError(''); // Clear any existing errors

    // Check password strength
    if (!checkPasswordStrength(password)) {
      setError('Password is weak. It should be at least 8 characters long and include uppercase, lowercase, numbers, and special characters.');
      return;
    }

    try {
      // Send POST request to signup endpoint
      const { data } = await axios.post('http://localhost:5000/api/auth/signup', {
        name,
        username,
        email,
        phoneNumber,
        password,
      });
      // Store user info in local storage upon successful signup
      localStorage.setItem('userInfo', JSON.stringify(data));
      // Navigate to login page
      navigate('/login');
    } catch (error) {
      // Set error message if signup fails
      setError(error.response.data.message || 'An error occurred');
    }
  };

  // Render the signup form
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="text-center mb-4">Sign Up</h2>
              {/* Display error message if there's an error */}
              {error && <div className="alert alert-danger">{error}</div>}
              <form onSubmit={handleSignup}>
                {/* Name input field */}
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                {/* Username input field */}
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">Username</label>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
                {/* Email input field */}
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                {/* Phone number input field */}
                <div className="mb-3">
                  <label htmlFor="phoneNumber" className="form-label">Phone Number</label>
                  <input
                    type="tel"
                    className="form-control"
                    id="phoneNumber"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    required
                  />
                </div>
                {/* Password input field */}
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <small className="form-text text-muted">
                    Password must be at least 8 characters long and include uppercase, lowercase, numbers, and special characters.
                  </small>
                </div>
                {/* Submit button */}
                <button type="submit" className="btn btn-primary w-100">Sign Up</button>
              </form>
              {/* Link to login page */}
              <p className="mt-3 text-center">
                Already have an account? 
                <span
                  className="text-primary"
                  style={{ cursor: 'pointer' }}
                  onClick={() => navigate('/login')}
                >
                  {" "} Login
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Export the SignupPage component
export default SignupPage;
