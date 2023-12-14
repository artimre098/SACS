import React, { useState, useEffect } from 'react'
import BarChart from './Components/BarChart'

import axios from 'axios';

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
    <div>
        <div> <BarChart accountData={accountData}  /> </div>
    </div>
    
  )
}

export default CollectionReport