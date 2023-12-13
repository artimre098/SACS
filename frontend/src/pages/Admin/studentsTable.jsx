import React, {useState} from 'react'
import { BsInfoCircle } from "react-icons/bs"
import StudentPayment from './StudentPayment';

const studentsTable = ({students, myId}) => {
    const [selectedStudent, setSelectedStudent] = useState(null);
    return (
        <table className='w-full border-separate border-spacing-2'>
            <thead>
                <tr>
                    <th className='border border-slate-600 rounded-mb '> Student_ID</th>
                    <th className='border border-slate-600 rounded-mb'> Fullname </th>
                    <th className='border border-slate-600 rounded-mb max-md:hidden'> Year Level </th>
                    <th className='border border-slate-600 rounded-mb max-md:hidden'> Gender </th>
                    <th className='border border-slate-600 rounded-mb'> Operations</th>
                </tr>
            </thead>
            <tbody>
                {students.map((student) => (
                    <tr key={student._id} className='h-8'>
                        <td className='border border-slate-700 rounded-mb text-center '>
                            {student.studentID}
                        </td>
                        <td className='border border-slate-700 rounded-mb text-center'>
                            {student.fullname}
                        </td>
                        <td className='border border-slate-700 rounded-mb text-center max-md:hidden'>
                            {student.yearLevel}
                        </td>
                        <td className='border border-slate-700 rounded-mb text-center max-md:hidden'>
                            {student.gender}
                        </td>
                        <td className='border border-slate-700 rounded-mb text-center'>
                            <div className='flex justify-center gap-x-4'>
                                <BsInfoCircle
                                    className="text-3xl text-blue-800 hover:text-black cursor-pointer"
                                    onClick={() => setSelectedStudent(student)}
                                />

                             </div>
                             {
                                selectedStudent && selectedStudent._id === student._id  && (
                                    <StudentPayment student={selectedStudent} myId={myId} onClose={()=>{
                                        setSelectedStudent(null)
                                    }} />
                                )
                             }
                        </td>
                    </tr>
                ))}
            </tbody>

        </table>

    )
}

export default studentsTable