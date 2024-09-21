  // Import necessary dependencies
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Define the LoginPage component
const LoginPage = () => {
  // State variables for form inputs and error handling
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  
  // Hook for programmatic navigation
  const navigate = useNavigate();

  // Function to handle form submission
  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    setError(""); // Clear any existing errors
    try {
      // Send POST request to login endpoint
      const { data } = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          username,
          password,
        }
      );
      // Store user info in local storage upon successful login
      localStorage.setItem("userInfo", JSON.stringify(data));
      // Navigate to profile page
      navigate("/profile");
    } catch (error) {
      // Set error message if login fails
      setError(error.response.data.message || "An error occurred");
    }
  };

  // Render the login form
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="text-center mb-4">Login</h2>
              {/* Display error message if there's an error */}
              {error && <div className="alert alert-danger">{error}</div>}
              <form onSubmit={handleLogin}>
                {/* Username input field */}
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">
                    Username
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
                {/* Password input field */}
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                {/* Submit button */}
                <button type="submit" className="btn btn-primary w-100">
                  Login
                </button>
              </form>
              {/* Link to signup page */}
              <p className="mt-3 text-center">
                Don't have an account?
                <span
                  className="text-primary"
                  style={{ cursor: "pointer" }}
                  onClick={() => navigate("/signup")}
                >
                  {" "}
                  Sign Up
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Export the LoginPage component
export default LoginPage;
