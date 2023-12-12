import React,{useState} from 'react'
import axios from 'axios'
import {toast} from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

function userLogin() {
    const navigate = useNavigate()
    const [data,setData] = useState({
        studentID: '',
        password: '',
        
    })
    const loginUser = async (e) =>{
        e.preventDefault();
        
        const {studentID,password} = data;

        try {
            const {data: responseData} = await axios.post('http://localhost:5555/students/login',{
              studentID,
              password,
            })
            if(responseData.error){
                toast.error(responseData.error)
            }else{
               setData({})
               toast.success('Login Successful. Welcome!')
               const userId = responseData.userId;
               const userType = responseData.userType;
              
               if (userId) {
                if (userType === "user") {
                  // Navigate to the home page with the user's ID as a parameter
                  navigate(`/accounts/student/${userId}`);
                } else if (userType === "admin") {
                  console.log("ADMIN KA GAW");
                } else {
                  console.error('Invalid userType:', userType);
                }
              } else {
                console.error('User ID not found in the server response.');
              }
            }
          } catch (error) {
            
          }
          
        
    }

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-gray-100 rounded-md">
      <h2 className="text-2xl font-semibold mb-4">User Login</h2>
      <form onSubmit={loginUser}>
        <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600">
          ID number:
          <input type="text" placeholder="enter student ID..." value={data.studentID} onChange={(e) => setData({...data,studentID: e.target.value})} 
          className="w-full border p-2 rounded-md"
          />
        </label>
        </div>
        <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600">
          Password:
          <input type="password" placeholder="enter password..." value={data.password} onChange={(e) => setData({...data,password: e.target.value})} 
          className="w-full border p-2 rounded-md"
          />
        </label>
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-700 w-full">
          Login
        </button>
      </form>
    </div>
  )
}

export default userLogin
