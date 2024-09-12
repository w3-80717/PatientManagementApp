// components/PatientInfo.js
import React, { useState } from 'react';
import BarcodeScanner from './BarcodeScanner'; // Assume you have a barcode scanner component

const PatientInfo = () => {
  const [barcode, setBarcode] = useState('');
  const [patient, setPatient] = useState(null);

  const handleDetected = (code) => {
    setBarcode(code);
    fetchPatientInfo(code);
  };

  const fetchPatientInfo = async (barcode) => {
    try {
      const response = await fetch(`http://localhost:5000/api/patients/${barcode}`);
      const data = await response.json();
      setPatient(data);
    } catch (error) {
      console.error('Error fetching patient info:', error);
    }
  };

  return (
    <div>
      <h1>Scan Patient Barcode</h1>
      <BarcodeScanner onDetected={handleDetected} />

      {barcode && <p>Scanned Barcode: {barcode}</p>}

      {patient && (
        <div>
          <img src={patient.photo} alt="Patient" />
          <h2>{patient.name}</h2>
          <p>Age: {patient.age}</p>
          <p>Mobile: {patient.mobile}</p>
          <p>Address: {patient.address}</p>
          <p>City: {patient.city}</p>
          <p>State: {patient.state}</p>
        </div>
      )}
    </div>
  );
};

export default PatientInfo;
