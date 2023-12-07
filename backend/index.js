import express from 'express';
import { PORT, mongoDBURL } from './config.js';
import mongoose from 'mongoose';
import { Students } from './models/StudentDetailModel.js';

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    console.log("Welcome to the Student")
});

app.post('/students', async (request, response) => {
    try {
        if(!request.body.studentID||
            !request.body.fullname ||
            !request.body.email ||
            !request.body.password ||
            !request.body.gender ||
            !request.body.yearLevel ||
            !request.body.userType 
        ){
            return response.status(400).send({message:'Send all required fields:'});
        }

        const newStudent = {
            studentID: request.body.studentID,
            fullname: request.body.fullname,
            email: request.body.email,
            password  : request.body.password,
            gender: request.body.gender,
            yearLevel: request.body.yearLevel,
            userType: request.body.userType,
        };

        const student = await Students.create(newStudent);

        return response.status(201).send(student);
    } catch (error) {
        console.log(error.message);
        
    }
});

app.get('/students', async (request, response) => {
    try {
        const students = await Students.find({});
        return response.status(200).json({
            count: students.length,
            data: students
        });
    } catch (error) {
        console.log(error.message);
    }
});

app.get('/students/:id', async (request, response) => {
    try {

        const { id } = request.params;

        const student = await Students.findById(id);
        return response.status(200).json(student);
    } catch (error) {
        console.log(error.message);
    }
});

mongoose
    .connect(mongoDBURL)
    .then(()=>{
        console.log('Connected to MongoDB');
        app.listen(PORT, ()=>{
            console.log(`Server running on port ${PORT}`);
        });
    }).catch((err)=>{
        console.log(err);
    });