// components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Registration</Link>
        </li>
        <li>
          <Link to="/patient-info">Patient Info</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
