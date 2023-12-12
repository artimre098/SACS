import React, {useState} from 'react'
import { BsInfoCircle } from "react-icons/bs"

const accountsTable = ({ accounts }) => {
    const [selectedAccount, setSelectedAccount] = useState(null);
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
                {accounts.map((account, index) => (
                    <tr key={account._id} className='h-8'>
                        <td className='border border-slate-700 rounded-mb text-center max-md:hidden'>
                            {index + 1}
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
                                <BsInfoCircle
                                    className="text-3xl text-blue-800 hover:text-black cursor-pointer"
                                    onClick={() => setSelectedAccount(account)}
                                />

                             </div>
                             
                        </td>
                    </tr>
                ))}
            </tbody>

        </table>

    )
}

export default accountsTable