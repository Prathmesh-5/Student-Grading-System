const express = require('express');
const router = express.Router();
const Student = require('../models/Student');

// Create student
router.post('/', async (req, res) => {
  try {
    const student = new Student(req.body);
    await student.save();
    res.status(201).send(student);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Get all students
router.get('/', async (req, res) => {
  const students = await Student.find();
  res.send(students);
});

// Get single student by ID
router.get('/:id', async (req, res) => {
  const student = await Student.findById(req.params.id);
  res.send(student);
});

// ✅ DELETE student by ID
router.delete('/:id', async (req, res) => {
  try {
    const result = await Student.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).json({ error: 'Student not found' });
    }
    res.json({ message: 'Student deleted successfully!' });
  } catch (error) {
    console.error('Error deleting student:', error);
    res.status(500).json({ error: 'Failed to delete student' });
  }
});

module.exports = router;
