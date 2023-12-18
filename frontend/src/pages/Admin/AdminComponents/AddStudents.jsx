import React, { useState } from 'react'
import BulkAddStudents from './BulkAddStudents'
import { toast } from 'react-hot-toast'
import axios from 'axios'

const AddStudents = () => {
  const [data, setData] = useState({
    studentID: '',
    fullname: '',
    email: '',
    gender: '',
    yearLevel: '',
    userType: '',

  })

  const handleSaveStudent = async () => {
    const { studentID, fullname } = data;
    const existingStudent = await axios.get('http://localhost:5555/students', {
      params: {
        studentID,
        fullname,
      },
    });


    if (existingStudent.data.counts > 0) {
      toast.error('Student already exists!');
      return;
    }


    axios
      .post('http://localhost:5555/students', data)
      .then(() => {
        toast.success('Student data successfully added!');
      })
      .catch((error) => {
        toast.error('Student creation Error!');

      });
  };

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

    <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
      <div className='my-1'>
        <label className='text-sm mr-4 text-gray-500'>Student ID</label>
        <input
          type='text'
          value={data.studentID}
          onChange={(e) => setData({ ...data, studentID: e.target.value })}
          placeholder='Enter School Student ID'
          className='border-2 border-gray-500 px-4 py-2 w-full'
        />
      </div>
      <div className='my-1'>
        <label className='text-sm mr-4 text-gray-500'>Student name</label>
        <input
          type='text'
          value={data.fullname}
          onChange={(e) => setData({ ...data, fullname: e.target.value })}
          placeholder='Enter Student Fullname'
          className='border-2 border-gray-500 px-4 py-2 w-full'
        />
      </div>
      <div className='my-1'>
        <label className='text-sm mr-4 text-gray-500'>Email</label>
        <input
          type='text'
          value={data.email}
          onChange={(e) => setData({ ...data, email: e.target.value })}
          placeholder='Enter your Email'
          className='border-2 border-gray-500 px-4 py-2 w-full'
        />
      </div>
      <div className='my-1'>
        <label className='text-sm mr-4 text-gray-500'>Gender</label>
        <select
          value={data.gender}
          onChange={(e) => setData({ ...data, gender: e.target.value })}
          className='border-2 border-gray-500 px-4 py-2 w-full'
        >
          <option value='' disabled>Select Gender</option>
          <option value='male'>Male</option>
          <option value='female'>Female</option>
        </select>
      </div>
      <div className='my-1'>
        <label className='text-sm mr-4 text-gray-500'>Year Level</label>
        <select
          value={data.yearLevel}
          onChange={(e) => setData({ ...data, yearLevel: e.target.value })}
          className='border-2 border-gray-500 px-4 py-2 w-full'
        >
          <option value='' disabled>Select Year Level</option>
          <option value='1st'>First Year</option>
          <option value='2nd'>Second Year</option>
          <option value='3rd'>Third Year</option>
          <option value='4th'>Fourth Year</option>
        </select>
      </div>
      <div className='my-1'>
        <label className='text-sm mr-4 text-gray-500'>UserType</label>
        <select
          value={data.userType}
          onChange={(e) => setData({ ...data, userType: e.target.value })}
          className='border-2 border-gray-500 px-4 py-2 w-full'
        >
          <option value='' disabled>Select Year Level</option>
          <option value='user'>User</option>
          <option value='admin'>Admin</option>
        </select>
        
      </div>
      <button className='p-2 bg-sky-300 m-1' onClick={handleSaveStudent}>
        Save
      </button>
      <p className='text-center'> or..</p>
      <BulkAddStudents onImport={handleImportCSV} />
    </div>

  )
}

export default AddStudents