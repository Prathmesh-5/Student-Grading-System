import React, { useState } from "react";
import axios from "axios";

function StudentForm() {
    const [student, setStudent] = useState({
        name: '',
        student_id: '',
        subjects: [{ subject_name: '', marks: '', grade: '' }]
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
        setStudent({
            ...student,
            subjects: [...student.subjects, { subject_name: '', marks: '', grade: '' }]
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          await axios.post("http://localhost:5000/api/students", student);
          alert("Student added successfully!");
          setStudent({
            name: "",
            rollNumber: "",
            subjects: [{ subject_name: "", marks: "", grade: "" }]
          });
        } catch (error) {
          console.error("Error adding student:", error);
          alert("Failed to add student");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Add Student</h2>

            <input
                type="text"
                name="name"
                placeholder="Name"
                value={student.name}
                onChange={handleChange}
                required
            />

            <input
                type="text"
                name="student_id"
                placeholder="Roll Number"
                value={student.student_id}
                onChange={handleChange}
                required
            />

            <h3>Subjects</h3>
            {student.subjects.map((subj, index) => (
                <div key={index} style={{ marginBottom: '10px' }}>
                    <input
                        name="subject_name"
                        placeholder="Subject"
                        value={subj.subject_name}
                        onChange={(e) => handleChange(e, index)}
                    />
                    <input
                        name="marks"
                        placeholder="Marks"
                        type="number"
                        value={subj.marks}
                        onChange={(e) => handleChange(e, index)}
                    />
                    <input
                        name="grade"
                        placeholder="Grade"
                        value={subj.grade}
                        onChange={(e) => handleChange(e, index)}
                    />
                </div>
            ))}

            <button type="button" onClick={addSubject}>
                ➕ Add Subject
            </button>

            <br /><br />
            <button type="submit">✅ Submit</button>
        </form>
    );
}

export default StudentForm;
