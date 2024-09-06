import db from "../models/index.js";
import { ObjectId } from "mongodb"; // Correct import for ObjectId

const { Transactions } = db;

export const getTotalRentByABook = async ({ bookId }) => {
    return await Transactions.aggregate([
        {
            $match: {
                bookId: new ObjectId(bookId.toString()) // Ensure bookId is a string before using ObjectId
            }
        },
        {
            $group: {
                _id: "$bookId",
                totalRent: {
                    $sum: "$rent"
                }
            }
        }
    ]);
};
