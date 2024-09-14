// routes/patientRoutes.js
const express = require('express');
const Patient = require('../models/Patient');
const jwt = require('jsonwebtoken');
const { authenticateToken, requireAdmin } = require('../middleware/authMiddleware'); // Import the middleware

const router = express.Router();

// Route to register a new patient
router.post('/register',authenticateToken, async (req, res) => {
  try {
    const { name, age, mobile, address, city, state, barcode, photo } = req.body;
    // Create a new patient document
    const newPatient = new Patient({ name, age, mobile, address, city, state, barcode, photo });
    await newPatient.save();

    res.status(201).json({ message: 'Patient registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while registering the patient' });
  }
});

// Route to fetch patient details by barcode
router.get('/:barcode',authenticateToken, async (req, res) => {
  try {
    const patient = await Patient.findOne({ barcode: req.params.barcode });

    if (!patient) {
      return res.status(404).json({ error: 'Patient not found' });
    }

    res.status(200).json(patient);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching patient details' });
  }
});

// Add a new route to update prasad taken status
router.post('/:barcode/prasad',authenticateToken, async (req, res) => {
  try {
    const { prasadId } = req.body; // The prasad to mark as taken

    const patient = await Patient.findOne({ barcode: req.params.barcode });

    if (!patient) {
      return res.status(404).json({ error: 'Patient not found' });
    }

    // Check if prasad was already taken
    if (patient.prasadsTaken.includes(prasadId)) {
      return res.status(400).json({ message: 'This prasad has already been taken' });
    }

    // Mark prasad as taken
    patient.prasadsTaken.push(prasadId);
    await patient.save();

    res.status(200).json({ message: 'Prasad marked as taken successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while updating prasad status' });
  }
});
// Route to fetch all patients
router.get('/',authenticateToken, async (req, res) => {
  try {
    const patients = await Patient.find();
    res.status(200).json(patients);
  } catch (error) {
    console.error('Error fetching patients:', error);
    res.status(500).json({ error: 'An error occurred while fetching patients' });
  }
});

router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const patientId = req.params.id;
    
    // Find and delete patient by _id or barcode
    const patient = await Patient.findByIdAndDelete(patientId);

    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    res.status(200).json({ message: 'Patient deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete patient' });
  }
});

module.exports = router;
