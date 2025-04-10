const mongoose = require('mongoose');

const SubjectSchema = new mongoose.Schema({
  subject_name: String,
  marks: Number,
  grade: String,
});

const StudentSchema = new mongoose.Schema({
  student_id: Number,
  name: String,
  dob: Date,
  class: String,
  email: String,
  subjects: [SubjectSchema]

});

module.exports = mongoose.model('Student', StudentSchema);
