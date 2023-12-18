import React from 'react'
import BulkAddStudents from './BulkAddStudents'
import { toast } from 'react-hot-toast'
import axios from 'axios'

const AddStudents = () => {

 
  const handleImportCSV = async (importedData) => {
    try {
      
      // Map the imported data to the format expected by your API
      const formattedData = await Promise.all(
        importedData.map(async (student) => ({
          studentID: student.studentID,
          fullname: student.fullname,
          email: student.email,
          gender: student.gender,
          yearLevel: student.yearLevel,
          userType: student.userType,
        }))
      );
      
      const existingStudentsResponse = await axios.get('http://localhost:5555/students');
      
      const existingStudents = existingStudentsResponse.data.data;

      
      // Filter out existing books from the imported data
      const newStudents = formattedData.filter((student) => {
        return !existingStudents.some((existingStudent) => {
          return (
            existingStudent.studentID === student.studentID &&
            existingStudent.fullname === student.fullname
          );
        });
      });
      
      if (newStudents.length === 0) {
        toast.error('No new student to insert.');
        return;
      }
      
      // Send a POST request to your API endpoint
      await axios.post('http://localhost:5555/students/bulk-insert', newStudents)
      .then(() => {


        toast.success("Students Data Successfully Added");


      })

    } catch (error) {
      console.error('Error importing students:', error);
      toast.error('Error importing students');
    } 
  };

  return (
    <div>AddStudents
      <BulkAddStudents onImport={handleImportCSV} />
    </div>
  )
}

export default AddStudents