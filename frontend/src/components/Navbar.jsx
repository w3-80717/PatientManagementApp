// components/Navbar.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ isLoggedIn, setIsLoggedIn, isAdmin }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsLoggedIn(false);
    navigate('/');  // Redirect to login page
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src="/logo.png" alt="Logo" />
      </div>
      <button className="mobile-menu-button" onClick={() => setMenuOpen(!menuOpen)}>
        ☰
      </button>
      <ul onClick={() => setMenuOpen(false)}className={`navbar-links ${menuOpen ? 'active' : ''}`}>
        <li><Link to="/registration">Patient Registration</Link></li>
        <li><Link to="/patient-info">Patient Information</Link></li>
        {isAdmin && <li><Link to="/admin">Add User</Link></li>}
        {isAdmin && <li><Link to="/add-prasad">Add Prasad</Link></li>}
        <li><Link to="/patientlist">Patient List</Link></li>
        <li><Link to="/analytics">Data Analytics</Link></li>
        {!isLoggedIn ? (
          <li><Link to="/login">User Login</Link></li>
        ) : (
          <li><button className="logout-button" onClick={handleLogout}>Logout</button></li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
