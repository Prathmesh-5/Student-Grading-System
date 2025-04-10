import React, { useState } from 'react';
import axios from 'axios';

function StudentForm() {
  const [student, setStudent] = useState({
    student_id: '',
    name: '',
    dob: '',
    class: '',
    email: '',
    subjects: [{ subject_name: '', marks: '',grade: '' }]
  });

  const handleChange = (e, index = null) => {
    if (index !== null) {
      const updatedSubjects = [...student.subjects];
      updatedSubjects[index][e.target.name] = e.target.value;
      setStudent({ ...student, subjects: updatedSubjects });
    } else {
      setStudent({ ...student, [e.target.name]: e.target.value });
    }
  };

  const addSubject = () => {
    setStudent({ ...student, subjects: [...student.subjects, { subject_name: '', marks: '', grade: ''}] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:5000/api/students', student);
    alert('Student Added!');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="student_id" placeholder="ID" onChange={handleChange} /><br />
      <input name="name" placeholder="Name" onChange={handleChange} /><br />
      <input name="dob" type="date" onChange={handleChange} /><br />
      <input name="class" placeholder="Class" onChange={handleChange} /><br />
      <input name="email" placeholder="Email" onChange={handleChange} /><br />

      <h4>Subjects</h4>
      {student.subjects.map((subj, index) => (
        <div key={index}>
          <input name="subject_name" placeholder="Subject" onChange={(e) => handleChange(e, index)} />
          <input name="marks" placeholder="Marks" onChange={(e) => handleChange(e, index)} />
          <input name="grade" placeholder="Grade" onChange={(e) => handleChange(e, index)} />
        </div>
      ))}
      <button type="button" onClick={addSubject}>Add Subject</button><br />
      <button type="submit">Submit</button>
    </form>
  );
}

export default StudentForm;

