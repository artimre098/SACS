import mongoose from "mongoose";

const accountSchema = mongoose.Schema({
    accountName: {
        type: String,
        required: true,
    },
    accountAmount: {
        type: Number,
        required: true,
    },
    studentId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'studentDetails', 
    },
    paymentHistory: [
        {
            amountPaid: {
                type: Number,
                required: true,
            },
            paymentDate: {
                type: Date,
                default: Date.now,
            },
        },
    ],
}, {
    timestamps: true,
});

export const Accounts = mongoose.model('studentAccounts', accountSchema);
