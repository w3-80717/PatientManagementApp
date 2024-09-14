import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './PatientInfo.css';
import BarcodeScanner from './BarcodeScanner';

const PatientInfo = ({ isAdmin }) => {
  const [barcode, setBarcode] = useState('');
  const [patient, setPatient] = useState(null);
  const [prasads, setPrasads] = useState([]);
  const [isScanning, setIsScanning] = useState(false); // Manages scanning state
  const [scanCompleted, setScanCompleted] = useState(false);

  useEffect(() => {
    // Fetch all prasads
    const fetchPrasads = async () => {
      const token = localStorage.getItem("token"); // Get the token from localStorage

      const response = await axios.get('/api/prasads', {  headers: {
              Authorization: `Bearer ${token}`, // Include the token in the request
            }});
      setPrasads(response.data);
    };
    fetchPrasads();
  }, []);

  const handleDetected = (code) => {
    if (!scanCompleted) {
    setBarcode(code);
    fetchPatientInfo(code);
    setScanCompleted(true); // Mark scan as completed to prevent further scans
    setIsScanning(false); 
    } 
  };

  const fetchPatientInfo = async (barcode) => {
    try {
      const token = localStorage.getItem("token"); // Get the token from localStorage
      const response = await axios.get(`/api/patients/${barcode}`, {  headers: {
              Authorization: `Bearer ${token}`, // Include the token in the request
            }});
      setPatient(response.data);
    } catch (error) {
      console.error('Error fetching patient info:', error);
    }
  };

  const handlePrasadUpdate = async (prasadId) => {
    try {
      await axios.post(`/api/prasads/updatePrasad/${patient._id}`, { prasadId });
      alert('Prasad status updated');
      fetchPatientInfo(barcode); // Refresh patient info
    } catch (error) {
      console.error('Error updating prasad status:', error);
    }
  };

  // Start scanning process
  const startScanning = () => {
    setIsScanning(true);      // Enable the scanner
    setScanCompleted(false);  // Reset scan completed state
  };
  return (
    <div>
      <h1>Scan Patient Barcode</h1>

      <button 
  onClick={() => setScanCompleted(false)} 
  style={{ marginTop: '10px', padding: '10px 20px', backgroundColor: 'blue', color: 'white' }}>
  Reset Scanner
</button>

     {/* Button to start barcode scanning */}
     <button 
        onClick={startScanning} 
        disabled={isScanning || scanCompleted} // Disable button if already scanning or scan is done
        style={{ marginBottom: '20px', padding: '10px 20px', backgroundColor: isScanning ? 'gray' : 'green', color: 'white' }}>
        {isScanning ? 'Scanning...' : 'Start Scanning'}
      </button>

      {/* Barcode scanner component that only activates if scanning is true */}
      {isScanning && <BarcodeScanner onDetected={handleDetected} />}

      {barcode && <p>Scanned Barcode: {barcode}</p>}
      {patient && (
        <div>
          <p>Name: {patient.name}</p>
          <p>Age: {patient.age}</p>
          <p>Mobile: {patient.mobile}</p>
          <p>Address: {patient.address}</p>
          <p>City: {patient.city}</p>
          <p>State: {patient.state}</p>

          <h3>Prasads Taken:</h3>
          <ul>
            {prasads.map(prasad => (
              <li key={prasad._id}>
                <span>
                  {prasad.name} -{' '}
                  {patient.prasadsTaken.includes(prasad._id) ? 'Taken' : 'Not Taken'}
                </span>
                {/* Show button only if prasad is not already taken and user is admin */}
                {!patient.prasadsTaken.includes(prasad._id) && (
                  <button
                    style={{
                      backgroundColor: 'green',
                      color: 'white',
                      padding: '5px 10px',
                      border: 'none',
                      borderRadius: '5px',
                      cursor: 'pointer',
                      marginLeft: '10px'
                    }}
                    onClick={() => handlePrasadUpdate(prasad._id)}
                  >
                    Mark as Taken
                  </button>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default PatientInfo;
