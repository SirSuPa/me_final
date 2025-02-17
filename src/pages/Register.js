import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");  // State for error message

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      // Attempt to register
      await axios.post("http://localhost:5000/api/register", { fullName, email, password });
      alert("Registration successful!");
      navigate("/login");
    } catch (err) {
      // Set error message if registration fails
      setError("Error registering. Please try again.");
    }
  };

  return (
    <div 
      className="d-flex justify-content-center align-items-center vh-100" 
      style={{ position: "absolute", top: "0", left: "0", width: "100%" }}
    >
      <div className="card p-5 shadow-lg" style={{ width: '500px' }}>
        <h2 className="text-center mb-4">Register</h2>

        {/* Display error message if there's an error */}
        {error && <p className="text-danger text-center">{error}</p>}

        <form onSubmit={handleRegister}>
          <div className="mb-3">
            <label htmlFor="fullName" className="form-label">Full Name</label>
            <input 
              type="text" 
              className="form-control" 
              id="fullName" 
              placeholder="Enter your full name" 
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required 
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input 
              type="email" 
              className="form-control" 
              id="email" 
              placeholder="Enter your email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input 
              type="password" 
              className="form-control" 
              id="password" 
              placeholder="Enter your password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">Register</button>
        </form>
        <p className="mt-3 text-center">
          Already have an account? <a href="/login" className="text-primary">Login</a>
        </p>
      </div>
    </div>
  );
}

export default Register;
