import React,{useEffect, useState} from 'react'
import {Bar} from 'react-chartjs-2'
import { Chart as ChartJS} from 'chart.js/auto'

const BarChart = ({accountData}) => {
     
    const [chartData, setChartData] = useState(null);

    useEffect(() => {
        
        const fetchData = async () => {
          try {
            

            const processedData = {};

            accountData.forEach((account) => {
              const { accountName, accountAmount, paymentHistory } = account;
            
              if (!processedData[accountName]) {
                processedData[accountName] = {
                  accountAmount: accountAmount,
                  totalPayments: paymentHistory.reduce((totalPayment, payment) => totalPayment + payment.amountPaid, 0),
                };
              } else {
                processedData[accountName].accountAmount += accountAmount;
                processedData[accountName].totalPayments += paymentHistory.reduce(
                  (totalPayment, payment) => totalPayment + payment.amountPaid,
                  0
                );
              }
            });
            
            const labels = Object.keys(processedData);
            const paymentData = labels.map((accountName) => processedData[accountName].totalPayments);
            const accountAmountData = labels.map((accountName) => processedData[accountName].accountAmount);
            
            const chartData = {
              labels: labels,
              datasets: [
                {
                  label: 'Payments Made',
                  data: paymentData,
                  backgroundColor: 'rgba(75, 192, 192, 0.2)', // Adjust the color as needed
                  borderColor: 'rgba(75, 192, 192, 1)', // Adjust the color as needed
                  borderWidth: 1,
                },
                // {
                //   label: 'Expected Collection',
                //   data: accountAmountData,
                //   backgroundColor: 'rgba(255, 99, 132, 0.2)', // Adjust the color as needed
                //   borderColor: 'rgba(255, 99, 132, 1)', // Adjust the color as needed
                //   borderWidth: 1,
                // },
              ],
            };

            setChartData(chartData)

          } catch (error) {
           
          }
        };

        fetchData();
        
    }, [accountData]);

    const options = {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      };
    
      if (!chartData) {
        return <div>Loading...</div>; // Display a loading indicator while data is being fetched
      }
  return (
  <div>
    <Bar data={chartData} options={options}/>
    </div>
  )
}

export default BarChart