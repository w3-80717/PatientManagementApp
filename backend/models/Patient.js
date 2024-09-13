const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  mobile: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  barcode: { type: String, required: true, unique: true },
  photo: { type: String, required: true },
  prasadsTaken: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Prasad' }],  // New field to store taken prasads
});

const Patient = mongoose.model('Patient', patientSchema);

module.exports = Patient;
