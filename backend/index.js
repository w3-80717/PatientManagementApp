// index.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const patientRoutes = require('./routes/patientRoutes');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json({ limit: '50mb' })); // To handle large base64 photo data
app.use(cors()); // Enable CORS for all origins

// Connect to MongoDB
//  
mongoose.connect(process.env.MONGO_URI, {
  user: process.env.MONGO_USER,
    pass: process.env.MONGO_PASS,
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Failed to connect to MongoDB', err));

// API routes
app.use('/api/patients', patientRoutes);

// Root route
app.get('/', (req, res) => {
  res.send('Patient management API is running');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
