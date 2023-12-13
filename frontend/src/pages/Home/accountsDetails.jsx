import React, { useState, useEffect } from 'react'
import axios from 'axios';
const accountsDetails = ({ account, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [accountId, setAccountId] = useState('');
  const [accountName, setAccountName] = useState('');
  const [accountAmount, setAccountAmount] = useState('');
  const [amountPaid, setAmountPaid] = useState('');
  const [receivedBy, setReceivedBy] = useState('');
  const [paymentDate, setPaymentDate] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      console.log(account._id)
      setAccountId(account._id);
      setAccountName(account.accountName);
      setAccountAmount(account.accountAmount);

      if (account.paymentHistory.length > 0) {
        setAmountPaid(account.paymentHistory[0].amountPaid);
        // setPaymentDate(account.paymentHistory[0].paymentDate);
        const paymentDateObject = new Date(account.paymentHistory[0].paymentDate);
        setPaymentDate(paymentDateObject.toLocaleDateString());

        try {
          const response = await axios.get(`http://localhost:5555/students/${account.paymentHistory[0].studentId}`);
          setReceivedBy(response.data.fullname);
        } catch (error) {
          console.error('Error fetching student data:', error);
        }
      } else {
        setAmountPaid(0);
        setPaymentDate('None');
        setReceivedBy('None');
      }
    };

    fetchData();

  }, [account]);

  return (
    <div className="fixed  bg-black bg-opacity-20 top-0 left-0 right-0 bottom-0 z-50 flex justify-center items-center"
      onClick={onClose}
    >
      <div onClick={(event) => event.stopPropagation()}
        className="w-[600px] max-w-full h-[400px] bg-white rounded-xl p-4 flex flex-col relative"
      >
        <div className='my-1'>
          <label className='text-sm mr-4 text-gray-500'>Account name: <span className="text-2xl font-bold text-blue-800">{accountName}</span></label>

        </div>
        <div className='my-1'>
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

        </div>



      </div>

    </div>

  )
}

export default accountsDetails