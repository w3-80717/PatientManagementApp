// routes/patientRoutes.js
const express = require('express');
const Patient = require('../models/Patient');

const router = express.Router();

// Route to register a new patient
router.post('/register', async (req, res) => {
  try {
    const { name, age, mobile, address, city, state, barcode, photo } = req.body;
  console.log("Give data")
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
router.get('/:barcode', async (req, res) => {
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

// Route to manage prasad distribution
router.post('/:barcode/prasad', async (req, res) => {
  try {
    const patient = await Patient.findOne({ barcode: req.params.barcode });

    if (!patient) {
      return res.status(404).json({ error: 'Patient not found' });
    }

    if (patient.prasadReceived) {
      return res.status(400).json({ message: 'Prasad has already been distributed to this patient' });
    }

    patient.prasadReceived = true;
    await patient.save();

    res.status(200).json({ message: 'Prasad distributed successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while distributing prasad' });
  }
});

module.exports = router;
