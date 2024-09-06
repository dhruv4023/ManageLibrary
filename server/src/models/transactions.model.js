import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
    {
        bookId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Books",
            required: true,
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Users",
            required: true,
        },
        issuedAt: {
            type: Date,
            required: true,
            default: Date.now,
        },
        returnedAt: {
            type: Date,
            default:null
        },
        rent: {
            type: Number,
        },
    },
    { timestamps: true }
);

export default transactionSchema;
