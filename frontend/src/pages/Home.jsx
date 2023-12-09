import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link , useParams} from 'react-router-dom'
import AccountsTable from './Home/accountsTable'

function Home() {
  
  
  const [accounts, setAccounts] = useState([]);
  const [balance,setBalance] = useState(0);
  const { studentId } = useParams();
  //console.log('userId:', id);
 
  
  
  const fetchData = async () => {
   
        try {
          
          const response = await axios.get(`http://localhost:5555/accounts/student/${studentId}`)
          console.log(response.data)
          setAccounts(response.data);
          calculateTotalBalance(response.data)
          
      } catch (error) {
          console.log(error);
      }
};

const calculateTotalBalance = (account) => {
  let total = 0;
  account.forEach((accounts) => {
    total += accounts.accountAmount;
  });
  const formattedTotalSales = new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: 'PHP',
  }).format(total);
  setBalance(formattedTotalSales);
}

useEffect(() => {
    fetchData();
    console.log({accounts})
}, []);

  return (
    <div className='p-4'>
     Home
     <h1 className='text-2xl my-4 text-center '> Total Balance: <span className='font-bold'>{balance}</span></h1>
     <AccountsTable accounts={accounts}/>
    
    </div>
  )
}

export default Home