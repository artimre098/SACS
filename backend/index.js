import express from 'express';
import { PORT, mongoDBURL } from './config.js';
import mongoose from 'mongoose';
import studentsRoute from './routes/studentsRoute.js'
import accountsRoute from './routes/accountsRoute.js'
import cors from 'cors'

const app = express();

app.use(express.json());

//middleware to handle cors policy
app.use(cors());

app.get('/', (request, response) => {
    console.log("Welcome to the Student")
});

app.use('/students',studentsRoute);
app.use('/accounts',accountsRoute);

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