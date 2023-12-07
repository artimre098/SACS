import express from 'express';
import { PORT, mongoDBURL } from './config.js';
import mongoose from 'mongoose';
import studentsRoute from './routes/studentsRoute.js'

const app = express();

app.use(express.json());

app.get('/', (request, response) => {
    console.log("Welcome to the Student")
});

app.use('/students',studentsRoute);

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