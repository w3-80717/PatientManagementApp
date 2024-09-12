import React, { useState } from 'react';
import Webcam from 'react-webcam';
import axios from 'axios';

const Registration = () => {
  const [patient, setPatient] = useState({
    name: '',
    age: '',
    mobile: '',
    address: '',
    city: '',
    state: '',
    barcode: ''
  });
  const [photo, setPhoto] = useState(null);
  const webcamRef = React.useRef(null);

  const capturePhoto = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setPhoto(imageSrc);
  };

  const handleChange = (e) => {
    setPatient({ ...patient, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      ...patient,
      photo,
    };
    await axios.post('http://localhost:5000/api/patients/register', formData);
    alert('Patient Registered Successfully');
  };

  return (
    <div className="registration-container">

      <h1>Patient Registration</h1>
      <form onSubmit={handleSubmit} className="registration-form">
        <input type="text" name="name" placeholder="Patient Name" onChange={handleChange} required />
        <input type="number" name="age" placeholder="Age" onChange={handleChange} required />
        <input type="text" name="mobile" placeholder="Mobile No" onChange={handleChange} required />
        <textarea name="address" placeholder="Address" onChange={handleChange} required />
        <input type="text" name="city" placeholder="City" onChange={handleChange} required />
        <input type="text" name="state" placeholder="State" onChange={handleChange} required />
        <input type="text" name="barcode" placeholder="Barcode Number" onChange={handleChange} required />
        
        {/* Capture Patient Photo */}
        <Webcam ref={webcamRef} screenshotFormat="image/jpeg" />
        <button type="button" onClick={capturePhoto}>Capture Photo</button>

        {/* Submit form */}
        <button type="submit">Register</button>
      </form>

      {photo && <img src={photo} alt="Captured" />}
    </div>
  );
};

export default Registration;
