const mongoose = require('mongoose');

const prasadSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
});

const Prasad = mongoose.model('Prasad', prasadSchema);

module.exports = Prasad;
