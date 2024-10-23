const mongoose = require('mongoose');

const resumeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  userEmail: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  resumeId: {
    type: String,
    required: true,
  },
  // Add other fields here
});

const Resume = mongoose.model('Resume', resumeSchema);

module.exports = Resume;
