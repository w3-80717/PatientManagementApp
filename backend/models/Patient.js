// models/Patient.js
const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  mobile: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  barcode: { type: String, required: true, unique: true },
  photo: { type: String, required: true }, // Photo as base64 string
  prasadReceived: { type: Boolean, default: false }, // To track if prasad is received
});

const Patient = mongoose.model('Patient', patientSchema);

module.exports = Patient;
