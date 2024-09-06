import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
    {
        bookName: {
            type: String,
            required: true,
            minlength: 2,
            maxlength: 100,
            trim: true,
        },
        category: {
            type: String,
            required: true,
            minlength: 3,
            maxlength: 50,
            trim: true,
        },
        rentPerDay: {
            type: Number,
            required: true,
            min: 0,
        },
    },
    { timestamps: true }
);

export default bookSchema;
