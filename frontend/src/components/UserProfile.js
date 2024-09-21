 // Import necessary dependencies from React and React-Bootstrap
 import React from 'react';
 import { Card, Button } from 'react-bootstrap';
 
 // Define the UserProfile component
 // It receives props: user (object containing user details) and onLogout (function to handle logout)
 const UserProfile = ({ user, onLogout }) => (
   <div className="row justify-content-center mb-4">
     <div className="col-md-6">
       <Card>
         <Card.Body>
           <h2 className="text-center mb-4">Welcome, {user.name}!</h2>
           <div className="mb-3"><strong>Name:</strong> {user.name}</div>
           {/* Username */}
           <div className="mb-3"><strong>Username:</strong> {user.username}</div>
           {/* Email */}
           <div className="mb-3"><strong>Email:</strong> {user.email}</div>
           {/* Phone Number */}
           <div className="mb-3"><strong>Phone Number:</strong> {user.phoneNumber}</div>
           
           {/* Logout button */}
           {/* onClick event is set to the onLogout function passed as a prop */}
           <Button variant="danger" className="w-100" onClick={onLogout}>Logout</Button>
         </Card.Body>
       </Card>
     </div>
   </div>
 );
 
 // Export the UserProfile component as the default export
 export default UserProfile;
 