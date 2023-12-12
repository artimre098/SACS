import React from 'react'

const accountsTable = ({accounts}) => {
    console.log(accounts)
  return (
    <table className='w-full border-separate border-spacing-2'>
              <thead>
                  <tr>
                      <th className='border border-slate-600 rounded-mb max-md:hidden'> No</th>
                      <th className='border border-slate-600 rounded-mb'> Fees </th>
                      <th className='border border-slate-600 rounded-mb '> Amount</th>
                      <th className='border border-slate-600 rounded-mb max-md:hidden'> Payment </th>
                      <th className='border border-slate-600 rounded-mb'> Operations</th>
                  </tr>
              </thead>
              <tbody>
                {accounts.map((account,index) => (
                    <tr key={account._id} className='h-8'> 
                      <td className='border border-slate-700 rounded-mb text-center max-md:hidden'>
                          {index+1}
                      </td>
                      <td className='border border-slate-700 rounded-mb text-center'>
                          {account.accountName}
                      </td>
                      <td className='border border-slate-700 rounded-mb text-center '>
                          {account.accountAmount}
                      </td>
                      <td className='border border-slate-700 rounded-mb text-center max-md:hidden'>
                          {/* {account.paymentHistory[0].amountPaid} */}
                          {account.paymentHistory.length > 0 ? account.paymentHistory[0].amountPaid : 0}
                      </td>
                      <td className='border border-slate-700 rounded-mb text-center'>
                          <div className='flex justify-center gap-x-4'>
                              {/* <Link to={`books/details/${book._id}`}>
                                    <BsInfoCircle className='text-2xl text-green-800' /> 
                              </Link>
                              <Link to={`books/edit/${book._id}`}>
                                    <AiOutlineEdit className='text-2xl text-yellow-600' /> 
                              </Link>
                              <Link to={`books/delete/${book._id}`}>
                                    <MdOutlineDelete className='text-2xl text-red-600' /> 
                              </Link> */}
                          </div>
                      </td>
                    </tr>
                ))}
              </tbody>
          </table>
  )
}

export default accountsTable