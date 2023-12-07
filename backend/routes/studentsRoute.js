import  express  from "express";
import  { Students }  from '../models/StudentDetailModel.js';

const router = express.Router();

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
        const generatedPassword = await bcrypt.hash(request.body.studentID, 10);

        const newStudent = {
            studentID: request.body.studentID,
            fullname: request.body.fullname,
            email: request.body.email,
            password  : request.body.generatedPassword,
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

export default router;