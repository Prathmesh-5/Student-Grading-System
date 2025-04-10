import React from 'react';
import './App.css';
import StudentForm from './StudentForm'; // Import the StudentForm component
import StudentList from './StudentList';

function App() {
  return (
    <div className="App">
      <StudentForm /> {/* Use the StudentForm component */}
      <StudentList/>
    </div>
  );
}

export default App;
