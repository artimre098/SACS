import express from "express";
import mongoose from "mongoose";
import  {Accounts}  from "../models/AccountModel.js"; 
import  {Students} from "../models/StudentDetailModel.js";

const router = express.Router();

// Route to get all accounts
router.get('/', async (request, response) => {
    try {
        const allAccounts = await Accounts.find();
        return response.status(200).send(allAccounts);
    } catch (error) {
        console.log(error.message);
        return response.status(500).send({ message: 'Internal Server Error' });
    }
});
// Route to get accounts by student ID
router.get('/student/:studentId', async (request, response) => {
    try {
        const { studentId } = request.params;
       // console.log(studentId)
        // Validate if studentId is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(studentId)) {
            return response.status(400).send({ message: 'Invalid studentId' });
        }

        const accountsForStudent = await Accounts.find({ studentId });
    //    console.log(accountsForStudent)
        return response.status(200).send(accountsForStudent);
    } catch (error) {
        console.log(error.message);
        return response.status(500).send({ message: 'Internal Server Error' });
    }
});

// Route to get accounts by account name
router.get('/:accountName', async (request, response) => {
    try {
        const { accountName } = request.params;

        const accountsWithSameName = await Accounts.find({ accountName });
        return response.status(200).send(accountsWithSameName);
    } catch (error) {
        console.log(error.message);
        return response.status(500).send({ message: 'Internal Server Error' });
    }
});



router.post('/', async (request, response) => {
    try {
        
        const { accountName, accountAmount } = request.body;

        const allStudents = await Students.find();

        
        const createdAccounts = await Promise.all(
            
            allStudents.map(async (student) => {
                const newAccount = await Accounts.create({ 
                    accountName,
                    accountAmount,
                    studentId: student._id });
                return newAccount;
            })
        );

        return response.status(201).send(createdAccounts);
    } catch (error) {
        console.log(error.message);
        return response.status(500).send({ message: 'Internal Server Error' });
    }
});

router.post('/pay/:accountId', async (request, response) => {
    try {
        
        const { accountAmount , myId} = request.body;
        const { accountId } = request.params;
        
        const amountPaid = accountAmount
        
        
        
        // Validate if amountPaid is a positive number
        if (typeof amountPaid !== 'number' || amountPaid <= 0) {
            return response.status(400).send({ message: 'Invalid amountPaid value' });
        }

        // Find the account by ID
        const account = await Accounts.findById(accountId);
        
        const studentId = myId;
        if (!account) {
           
            return response.status(404).send({ message: 'Account not found' });
        }

        account.accountAmount -= amountPaid;

        // Update the account with the payment
        account.paymentHistory.push({
            amountPaid,
            studentId,
            paymentDate: new Date(),
        });


        await account.save();

        return response.status(200).send({ message: 'Payment successful', updatedAccount: account });
    } catch (error) {
        console.log(error.message);
        return response.status(500).send({ message: 'Internal Server Error' });
    }
});




export default router;