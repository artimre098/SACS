import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { toast } from 'react-hot-toast'

const StudentPayment = ({ student, myId, onClose }) => {
    const [accountId, setAccountId] = useState('');
    const [accountName, setAccountName] = useState('');
    const [accountAmount, setAccountAmount] = useState('');
    const [selectedId,setSelectedId] = useState('');
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [proceeded, setProceeded] = useState(false);

    const handlePayClick = () => {
        if (selectedId !== '') {
            setShowConfirmation(true);
          } else {
           toast.error("Please select an account before proceeding with the payment.");
           
          }
    };
    const handleCancel = () => {

        setShowConfirmation(false);
    };

    const handlePayAccount = async () => {

        const data = {
            accountAmount,
            myId,

        };

        console.log(data)
        axios
            .post(`http://localhost:5555/accounts/pay/${accountId}`, data)
            .then(() => {


                toast.success("Payment Successful");



            })
            .catch((error) => {
                console.log(error)
                toast.error("Payment Unsuccessful");

            });

    };

    useEffect(() => {
        const fetchData = async () => {
            const dropdown = document.getElementById('dropdown');
            const amountDisplay = document.getElementById('amountDisplay');


            try {
                const response = await axios.get(`http://localhost:5555/accounts/student/${student._id}`);
                const accountData = response.data;

                dropdown.innerHTML = '';
                const filteredAccounts = accountData.filter(account => account.accountAmount !== 0);
                const emptyOption = document.createElement('option');
    emptyOption.value = ''; // Use an empty string as the value
    emptyOption.text = 'Select an account'; // Replace with your desired text
    dropdown.add(emptyOption);
                // Create and append options to the dropdown
                filteredAccounts.forEach(account => {
                    const option = document.createElement('option');
                    option.value = account._id; // Use a unique identifier for each option
                    option.text = account.accountName; // Replace with the property from your student data
                    dropdown.add(option);
                });

                dropdown.addEventListener('change', (event) => {
                    const selectedAccountId = event.target.value;
                    const selectedAccount = accountData.find(account => account._id === selectedAccountId);
                    setSelectedId(selectedAccountId)
                    // Update the amount display based on the selected student
                    amountDisplay.textContent = `₱${selectedAccount.accountAmount}`;
                    setAccountId(selectedAccount._id)
                    setAccountAmount(selectedAccount.accountAmount)
                });
            } catch (error) {
                console.error('Error fetching student data:', error);
            }

        };

        fetchData();

    }, [student]);
    const handleProceed = () => {
        setProceeded(true);
        handlePayAccount();
        //window.location.reload();
    };
    const confirmationModal = (
        <div className="fixed bg-black bg-opacity-60 top-0 left-0 right-0 bottom-0 z-50 flex justify-center items-center">
            <div className="bg-white p-4 rounded-md">
                <p className="text-gray-800">Are you sure you want to proceed?</p>
                <div className="flex center mt-4 mx-7">
                    <button
                        onClick={handleProceed}
                        className="bg-green-500 text-white px-4 py-2 mr-2 rounded"
                    >
                        Proceed
                    </button>
                    <button
                        onClick={handleCancel}
                        className="bg-red-500 text-white px-4 py-2 rounded"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
    const thankYouMessage = (
        <div className="fixed bg-black bg-opacity-60 top-0 left-0 right-0 bottom-0 z-50 flex justify-center items-center">
            <div className=" bg-white p-4 rounded-md items-center ">
                <p className="text-gray-800">Thank you for your payment!</p>
                <button
                    onClick={() => {
                        setShowConfirmation(false);
                        setProceeded(false);
                        onClose();
                        window.location.reload();
                    }}
                    className="bg-green-500 text-white px-4 py-2 mt-4 rounded"
                >
                    Close
                </button>
            </div>
        </div>
    );


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
                    <label className='text-sm mr-4 text-gray-500'>Amount: <span className="text-2xl font-bold text-green-800" id="amountDisplay"></span></label>
                </div>
                <div className='my-1'></div>
                <button className='p-2 bg-sky-300 my-5' onClick={handlePayClick}>
                    Pay
                </button>
                {showConfirmation && !proceeded && confirmationModal}
                {proceeded && thankYouMessage}
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