import React, { useState, useEffect } from 'react'
import axios from 'axios';

const StudentPayment = ({ student, myId, onClose }) => {
    const [accountId, setAccountId] = useState('');
    const [accountName, setAccountName] = useState('');
    const [accountAmount, setAccountAmount] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            const dropdown = document.getElementById('dropdown');
            

            try {
                const response = await axios.get(`http://localhost:5555/accounts/student/${student._id}`);
                const accountData = response.data;

                dropdown.innerHTML = '';

                // Create and append options to the dropdown
                accountData.forEach(account => {
                    const option = document.createElement('option');
                    option.value = account._id; // Use a unique identifier for each option
                    option.text = account.accountName; // Replace with the property from your student data
                    dropdown.add(option);
                });
            } catch (error) {
                console.error('Error fetching student data:', error);
            }

        };

        fetchData();

    }, [student]);
    return (
        <div className="fixed  bg-black bg-opacity-20 top-0 left-0 right-0 bottom-0 z-50 flex justify-center items-center"
          onClick={onClose}
        >
          <div onClick={(event) => event.stopPropagation()}
            className="w-[600px] max-w-full h-[400px] bg-white rounded-xl p-4 flex flex-col relative"
          >
            <div className='my-1'>
              <label className='text-sm mr-4 text-gray-500'>Student: <span className="text-2xl font-bold text-green-800">{student.fullname}</span></label>
            </div>
            <div className='my-1'>
              <label className='text-sm mr-4 text-gray-500'>Account name: <span className="text-2xl font-bold text-blue-800">
<select id="dropdown"></select></span></label>

            </div>
            <div className='my-1'>
              <label className='text-sm mr-4 text-gray-500'>Amount: <span className="text-2xl font-bold text-green-800">₱{accountAmount}</span></label>
            </div>
            <div className='my-1'></div>
            {/* <div className='my-1'>
              <label className='text-sm mr-4 text-gray-500'>Amount: <span className="text-2xl font-bold text-green-800">₱{accountAmount}</span></label>
            </div>
            <div className='my-1'>
    
              <label className='text-sm ml-4 mr-2 text-gray-500'>Amount Paid: <span className="text-2xl font-bold text-blue-800">₱{amountPaid}</span></label>
    
            </div>
            <div className='my-1'>
              <label className='text-sm mr-4 text-gray-500'>Received by: <span className="text-2xl font-bold text-green-800">{receivedBy}</span></label>
            </div>
            <div className='my-1'>
    
              <label className='text-sm ml-4 mr-2 text-gray-500'>Payment date: <span className="text-2xl font-bold text-blue-800">{paymentDate}</span></label>
    
            </div> */}
    
    
    
          </div>
    
        </div>
    )
}

export default StudentPayment