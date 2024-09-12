// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Registration from './components/Registration';
import PatientInfo from './components/PatientInfo';
import Navbar from './components/Navbar';

const App = () => {
  return (
    <Router>
      {/* Optional: Navbar component */}
      <Navbar />
      <div className="container">
        {/* Routes for navigation */}
        <Routes>
          {/* Route for Registration Page */}
          <Route path="/" element={<Registration />} />

          {/* Route for Patient Info (Barcode Scanner) */}
          <Route path="/patient-info" element={<PatientInfo />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
