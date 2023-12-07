import mongoose from "mongoose";

const  studentDetailsSchema = new mongoose.Schema({
    studentID: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    fullname: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 5,
    },
    gender: {
        type: String,
        enum: ['male', 'female'],
        default:'male',
    },
    yearLevel: {
        type: String,
        enum: ['1st', '2nd', '3rd', '4th'],
        default: '1st',
    },
    userType: {
      type: String,
      enum: ['admin', 'user' , 'manager'], 
      default: 'user',
    },
  },{
      timestamps: true,
  });

  export const Students =  mongoose.model('studentDetails', studentDetailsSchema);