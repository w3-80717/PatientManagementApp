const express = require('express');
const Prasad = require('../models/Prasad');
const Patient = require('../models/Patient');
const router = express.Router();
const { authenticateToken, requireAdmin } = require('../middleware/authMiddleware'); // Import the middleware

// Route to add a new Prasad (Admin Only)
router.post('/add',authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { name, description } = req.body;
    const newPrasad = new Prasad({ name, description });
    await newPrasad.save();
    res.status(201).json({ message: 'Prasad added successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error adding Prasad' });
  }
});

// Route to get all Prasads
router.get('/',authenticateToken, async (req, res) => {
  try {
    const prasads = await Prasad.find();
    res.status(200).json(prasads);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching prasads' });
  }
});

// Route to update patient's prasad status
router.post('/updatePrasad/:patientId',authenticateToken, async (req, res) => {
  try {
    const { prasadId } = req.body;
    const patient = await Patient.findById(req.params.patientId);

    // Check if the patient already took this prasad
    if (patient.prasadsTaken.includes(prasadId)) {
      return res.status(400).json({ message: 'Prasad already taken by this patient' });
    }

    patient.prasadsTaken.push(prasadId);
    await patient.save();

    res.status(200).json({ message: 'Prasad status updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error updating prasad status' });
  }
});

module.exports = router;
