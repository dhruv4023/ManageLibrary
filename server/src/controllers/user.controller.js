import mongoose from 'mongoose';
import db from '../models/index.js';
import RESPONSE from '../helpers/response.helper.js';
import isValidData from '../helpers/validation/data_validator.js';

const { Users } = db;

// Get a user by ID or email
export const getUsersByNameReg = async (req, res) => {
    try {
        const { params: { name } } = req;

        const users = await Users.aggregate([
            {
                $addFields: {
                    fullName: {
                        $concat: ["$firstName", " ", "$lastName"]
                    }
                }
            },
            {
                $match: {
                    fullName: {
                        $regex: name,
                        $options: "i"
                    }
                }
            },
            {
                $project: {
                    _id: 1,
                    fullName: 1
                }
            },
            {
                $limit: 5
            }
        ])

        RESPONSE.success(res, 1006, { users });
    } catch (error) {
        RESPONSE.error(res, 9999, 500, error);
    }
};

// Create a new user
export const createUser = async (req, res) => {
    const validationErr = await isValidData(req.body, {
        firstName: 'required|string|min:2|max:20|nameWithoutNumbers',
        lastName: 'required|string|min:2|max:20|nameWithoutNumbers',
        email: 'required|email',
    });

    if (validationErr) return RESPONSE.error(res, validationErr);

    try {
        const { firstName, lastName, email } = req.body;

        // Check if the email is already taken
        const existingUser = await Users.findOne({ email });
        if (existingUser) {
            return RESPONSE.error(res, 1004);
        }

        const newUser = new Users({ firstName, lastName, email });
        await newUser.save();

        return RESPONSE.success(res, 1001, { user: newUser });
    } catch (error) {
        console.error('Error creating user:', error);
        RESPONSE.error(res, 9999, 500, error);
    }
};

// Update user data
export const updateUserData = async (req, res) => {
    const validationErr = await isValidData(req.body, {
        firstName: 'required|string|min:2|max:20|nameWithoutNumbers',
        lastName: 'required|string|min:2|max:20|nameWithoutNumbers',
        email: 'required|email',
    });

    if (validationErr) return RESPONSE.error(res, validationErr);

    try {
        const _file = req.file;
        const {
            tokenData: { userId: _id, username },
            body: { firstName, lastName, about, email },
        } = req;

        const location = {
            state: req.body["location.state"],
            city: req.body["location.city"],
            pincode: req.body["location.pincode"],
        };

        const user = await Users.findOne({ username, _id });
        if (!user) return RESPONSE.error(res, 1027, 400);

        if (user.email !== email && await Users.findOne({ email })) {
            return RESPONSE.error(res, 1004);
        }

        let filePath = user?.picPath;
        if (_file) {
            const fileData = await uploadFile({
                file: _file,
                newImgFileName: "profileImg",
                dirAddress: "Users/" + user.username,
            });
            filePath = fileData.public_id;
        }

        await Users.findOneAndUpdate(
            { _id },
            {
                $set: {
                    firstName,
                    lastName,
                    about,
                    location,
                    picPath: filePath,
                },
            }
        );

        const updatedUser = await Users.findOne({ _id });
        RESPONSE.success(res, 1007, { user: updatedUser });
    } catch (error) {
        console.error('Error updating user:', error);
        RESPONSE.error(res, 9999, 500, error);
    }
};

// Delete a user by ID
export const deleteUser = async (req, res) => {
    try {
        const { params: { uid } } = req;

        const user = await Users.findOneAndDelete(mongoose.isValidObjectId(uid)
            ? { _id: uid } : { email: uid }
        );

        if (!user) {
            return RESPONSE.error(res, 1027, 400);
        }

        return RESPONSE.success(res, 1008, { user });
    } catch (error) {
        console.error('Error deleting user:', error);
        RESPONSE.error(res, 9999, 500, error);
    }
};
