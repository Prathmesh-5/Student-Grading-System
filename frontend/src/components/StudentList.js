import React, { useEffect, useState } from 'react';
import axios from 'axios';

function StudentList() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/students').then(res => {
      setStudents(res.data);
    });
  }, []);

  return (
    <div>
      <h2>Student List</h2>
      {students.map(s => (
        <div key={s._id}>
          <p><strong>{s.name}</strong> - {s.class}</p>
          {s.subjects.map((sub, idx) => (
            <p key={idx}>{sub.subject_name}: {sub.marks}</p>
          ))}
        </div>
      ))}
    </div>
  );
}

export default StudentList;
 
