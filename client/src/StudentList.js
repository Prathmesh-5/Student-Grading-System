// client/src/StudentList.js

import React, { useEffect, useState } from "react";
import axios from "axios";

function StudentList() {
  const [students, setStudents] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({ name: "", subjects: [] });

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/students");
      setStudents(res.data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/students/${id}`);
      setStudents(students.filter((student) => student._id !== id));
    } catch (error) {
      console.error("Error deleting student:", error);
      alert("Failed to delete student");
    }
  };

  const handleEditClick = (student) => {
    setEditId(student._id);
    setEditData({ name: student.name, subjects: [...student.subjects] });
  };

  const handleEditChange = (field, value, index = null) => {
    if (field === "name") {
      setEditData({ ...editData, name: value });
    } else {
      const updatedSubjects = [...editData.subjects];
      updatedSubjects[index][field] = value;
      setEditData({ ...editData, subjects: updatedSubjects });
    }
  };

  const handleEditSubmit = async () => {
    try {
      await axios.put(`http://localhost:5000/api/students/${editId}`, editData);
      setEditId(null);
      fetchStudents();
    } catch (error) {
      console.error("Error updating student:", error);
    }
  };

  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(searchName.toLowerCase())
  );

  return (
    <div>
      <h2>Student List</h2>

      <input
        type="text"
        placeholder="🔍 Search by name"
        value={searchName}
        onChange={(e) => setSearchName(e.target.value)}
        style={{ marginBottom: "20px", padding: "5px", width: "200px" }}
      />

      {filteredStudents.length === 0 ? (
        <p>No students found.</p>
      ) : (
        filteredStudents.map((student) => (
          <div key={student._id} style={{ marginBottom: "20px" }}>
            {editId === student._id ? (
              <div>
                <input
                  type="text"
                  value={editData.name}
                  onChange={(e) => handleEditChange("name", e.target.value)}
                  placeholder="Name"
                  style={{ marginBottom: "5px" }}
                />
                {editData.subjects.map((subject, index) => (
                  <div key={index} style={{ marginLeft: "20px" }}>
                    <input
                      type="text"
                      value={subject.subject_name}
                      onChange={(e) => handleEditChange("subject_name", e.target.value, index)}
                      placeholder="Subject"
                    />
                    <input
                      type="number"
                      value={subject.marks}
                      onChange={(e) => handleEditChange("marks", e.target.value, index)}
                      placeholder="Marks"
                    />
                    <input
                      type="text"
                      value={subject.grade}
                      onChange={(e) => handleEditChange("grade", e.target.value, index)}
                      placeholder="Grade"
                    />
                  </div>
                ))}
                <button onClick={handleEditSubmit}>💾 Save</button>
              </div>
            ) : (
              <>
                <strong>👤 {student.name}</strong>
                <button
                  onClick={() => handleDelete(student._id)}
                  style={{
                    marginLeft: "10px",
                    background: "red",
                    color: "white",
                    border: "none",
                    padding: "2px 8px",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                >
                  🗑️ Delete
                </button>
                <button
                  onClick={() => handleEditClick(student)}
                  style={{
                    marginLeft: "10px",
                    background: "orange",
                    color: "white",
                    border: "none",
                    padding: "2px 8px",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                >
                  ✏️ Edit
                </button>
                {student.subjects &&
                  student.subjects.map((subject, subIndex) => (
                    <div key={subIndex} style={{ marginLeft: "20px" }}>
                      📘 {subject.subject_name} - {subject.marks} Marks -{" "}
                      {subject.grade && `Grade: ${subject.grade}`}
                    </div>
                  ))}
              </>
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default StudentList;
