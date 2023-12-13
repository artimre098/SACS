import React ,{useEffect,useState} from 'react'
import axios from 'axios'
import { Link , useParams} from 'react-router-dom'
import StudentsTable from './studentsTable'
const AdminHome = () => {
    const [students, setStudents] = useState([])
    const [fetchedStudent, setFetchedStudent] = useState(null);
    const { studentId } = useParams();
    const fetchStudentData = async () => {
        try {
            const response = await axios.get(`http://localhost:5555/students`)

            setStudents(response.data.data);
        } catch (error) {
            console.log(error);
        }
    }
    const fetchStudentById = async (studentId) => {
        try {
          const response = await axios.get(`http://localhost:5555/students/${studentId}`);
          return response.data;
        } catch (error) {
          console.error('Error fetching student data:', error);
          return null;
        }
      };
    useEffect(() => {
        fetchStudentData();
    }, []);

    useEffect(() => {
        fetchStudentById(studentId).then((student) => {
          setFetchedStudent(student);
        });
      }, [studentId]);

    return (
        <div className='p-4'>
            <h1 className='text-3xl my-4 text-center font-bold text-blue-800'>Welcome  {fetchedStudent ? fetchedStudent.fullname : "No one"}
        </h1>

            <StudentsTable students={students}/>

        </div>
    )
}

export default AdminHome