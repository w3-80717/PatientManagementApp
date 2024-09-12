// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Registration from './components/Registration';
import PatientInfo from './components/PatientInfo';
import Admin from './components/Admin';
import Login from './components/Login';
import Dashboard from './components/Dashboard';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  return (
    <Router>
      {isLoggedIn && <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} isAdmin={isAdmin} />}
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Login setIsLoggedIn={setIsLoggedIn} setIsAdmin={setIsAdmin} />} />
        
        {/* Private Routes - visible after login */}
        {isLoggedIn && (
          <>
            <Route path="/registration" element={<Registration />} />
            <Route path="/patient-info" element={<PatientInfo />} />
            {isAdmin && <Route path="/admin" element={<Admin />} />}
            <Route path="/dashboard" element={<Dashboard />} />
          </>
        )}
      </Routes>
    </Router>
  );
}

export default App;
