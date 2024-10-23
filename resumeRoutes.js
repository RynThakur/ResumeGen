// routes/resumeRoutes.js
const express = require('express');
const Resume = require('../models/Resume');
const router = express.Router();

// Create a new resume
router.post('/resumes', async (req, res) => {
  try {
    const newResume = new Resume(req.body.data); // Ensure the correct structure
    const savedResume = await newResume.save();
    res.status(201).json({ data: savedResume });
  } catch (error) {
    console.error('Error creating resume:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Get a resume by ID
router.get('/resumes/:id', async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id);
    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }
    res.status(200).json({ data: resume });
  } catch (error) {
    console.error('Error fetching resume:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Update a resume by ID
router.put('/resumes/:id', async (req, res) => {
  try {
    const updatedResume = await Resume.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedResume) {
      return res.status(404).json({ message: 'Resume not found' });
    }
    res.status(200).json({ data: updatedResume });
  } catch (error) {
    console.error('Error updating resume:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
