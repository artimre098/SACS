import  express  from "express";
import  { Students }  from '../models/StudentDetailModel.js';
import  {Accounts}  from "../models/AccountModel.js"; 
import bcrypt from 'bcrypt'
import pLimit from 'p-limit'

const router = express.Router();

const hashPassword = (password) =>{
    return new Promise((resolve , reject) =>{
        bcrypt.genSalt(12,(err, salt) => {
            if(err){
                reject(err)
            }
            bcrypt.hash(password, salt, (err,hash) =>{
                if(err){
                    reject(err)
                }
                resolve(hash)
            })
        })
    })
}

const comparePasswords = (password, hashed) =>{
    return bcrypt.compare(password,hashed)
}

router.post('/', async (request, response) => {
    try {
        if(!request.body.studentID||
            !request.body.fullname ||
            !request.body.email ||
            !request.body.gender ||
            !request.body.yearLevel ||
            !request.body.userType 
        ){
            return response.status(400).send({message:'Send all required fields:'});
        }
        //const generatedPassword = await bcrypt.hash(request.body.studentID, 10);
        const hashedPassword = await hashPassword(request.body.studentID)
        const newStudent = {
            studentID: request.body.studentID,
            fullname: request.body.fullname,
            email: request.body.email,
            password  : hashedPassword,
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

router.post('/login', async (request, response) => {
    try {
        
        const {studentID, password} = request.body;

        const student = await Students.findOne({studentID});
        
        if(!student){
            return response.json({
                error : "No user Found"
            })
        }
        const match = await comparePasswords(password,student.password)
        
        if(match){
            
            return response.json(
                {
                    message: 'Welcome User',
                   userId: student._id, 
                   userType: student.userType,
                  }
                  
            )
            
           
        }

        if(!match){
            return response.json({
                error : "Password do not match"
            })    
        }

    } catch (error) {
        console.log(error)
    }
});

router.get('/', async (request, response) => {
    
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

router.get('/:id', async (request, response) => {
    try {

        const { id } = request.params;
        const student = await Students.findById(id);
        return response.status(200).json(student);
    } catch (error) {
        console.log(error.message);
    }
});

router.post('/bulk-insert', async (req, res) => {
    try {
        const studentsToInsert = req.body;
        

        if (!Array.isArray(studentsToInsert)) {
          return res.status(400).json({ success: false, message: 'Invalid data format. Expected an array.' });
        }

        const hashedStudents = await Promise.all(
            studentsToInsert.map(async (student) => {
              const hashedPassword = await hashPassword(student.studentID); // Assuming studentID is used for hashing
              return {
                studentID: student.studentID,
                fullname: student.fullname,
                password: hashedPassword,
                email: student.email,
                gender: student.gender,
                yearLevel: student.yearLevel,
                userType: student.userType,
              };
            })
          );

        const result = await Students.insertMany(hashedStudents);
    
        res.status(201).json({ success: true, message: 'Students inserted successfully', result });
      } catch (error) {
        console.error('Error inserting books:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error', error: error.message });
      }
  });


export default router;