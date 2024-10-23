// server.js
const express = require('express');
const mongoose = require('mongoose');
const resumeRoutes = require('./routes/resumeRoutes');
require('dotenv').config();

const app = express();
app.use(express.json()); // Middleware to parse JSON request body

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Use the resume routes
app.use('/api', resumeRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
