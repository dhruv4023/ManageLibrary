import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
            minlength: 2,
            maxlength: 20,
            trim: true
        },
        lastName: {
            type: String,
            required: true,
            minlength: 2,
            maxlength: 20,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/,
            trim: true
        },
    },
    { timestamps: true }
);

export default userSchema;