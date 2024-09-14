import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Registration from './components/Registration';
import PatientInfo from './components/PatientInfo';
import Admin from './components/Admin';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import AddPrasad from './components/AddPrasad';
import DataAnalytics from './components/DataAnalytics';
import PatientList from './components/PatientList';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true');
  const [isAdmin, setIsAdmin] = useState(localStorage.getItem('isAdmin') === 'true');

  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const adminStatus = localStorage.getItem('isAdmin') === 'true';
    setIsLoggedIn(loggedIn);
    setIsAdmin(adminStatus);
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('isAdmin');
    setIsLoggedIn(false);
    setIsAdmin(false);
  };

  return (
    <Router>
      {isLoggedIn && <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={handleLogout} isAdmin={isAdmin} />}
      <Routes>
        <Route
          path="/"
          element={isLoggedIn ? <Navigate to="/dashboard" /> : <Login setIsLoggedIn={handleLogin} setIsAdmin={setIsAdmin} />}
        />
        {isLoggedIn && (
          <>
            <Route path="/registration" element={<Registration />} />
            <Route path="/patient-info" element={<PatientInfo />} />
            {isAdmin && <Route path="/admin" element={<Admin />} />}
            <Route path="/dashboard" element={<Dashboard />} />
            {isAdmin && <Route path="/add-prasad" element={<AddPrasad />} />}
            <Route path="/analytics" element={<DataAnalytics />} />
            <Route path="/patientlist" element={<PatientList/>} />
            
          </>
        )}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
