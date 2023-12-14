import React, { useState, useEffect } from 'react'
import BarChart from './Components/BarChart'

import axios from 'axios';
import PieChart from './Components/PieChart';

const CollectionReport = () => {
    const [accountData, setAccountData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get('http://localhost:5555/accounts');
            setAccountData(response.data);
            
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
        fetchData();
        
    }, []);
  return (
    <div className='flex'>
        <div className="flex-1 p-4"> <BarChart accountData={accountData}  /> </div>
        <div className="flex-1 p-4"> <PieChart accountData={accountData}  /> </div>
    </div>
    
  )
}

export default CollectionReport