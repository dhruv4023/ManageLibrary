import db from '../models/index.js';
import RESPONSE from '../helpers/response.helper.js';
import isValidData from '../helpers/validation/data_validator.js';
import { getRecursivePaginatedResponse, getPaginationMetadata } from '../helpers/pagination.helper.js';

import moment from 'moment';
import { getTotalRentByABook } from '../service/transaction.service.js';
const { Transactions, Books, Users } = db;

export const getBooksIssuedInRange = async (req, res) => {
    const { startDate, endDate, page = 1, limit = 10 } = req.query;

    try {
        const start = new Date(startDate);
        const end = new Date(endDate);

        if (isNaN(start.getTime()) || isNaN(end.getTime())) {
            return RESPONSE.error(res, 2004, 400);
        }

        // Get pagination metadata
        const { startIndex, endIndex } = getPaginationMetadata({ page, limit });

        // Fetching total count for pagination
        const totalCount = await Transactions.countDocuments({
            issuedAt: { $gte: start, $lte: end }
        });

        // Fetching the paginated data
        const transactions = await Transactions.find({
            issuedAt: { $gte: start, $lte: end }
        })
            .populate({
                path: "userId",
                select: ["firstName", "lastName"],
                model: Users,
            })
            .populate({
                path: "bookId",
                select: "bookName",
                model: Books,
            })
            .skip(startIndex)
            .limit(parseInt(limit))
            .exec();

        // Formatting the response using the utility function
        const booksIssued = transactions.map(txn => ({
            bookId: txn.bookId._id,
            bookName: txn.bookId.bookName,
            issuedAt: txn.issuedAt,
            returnedAt: txn.returnedAt,
            userId: txn.userId._id,
            fullName: txn.userId.firstName + " " + txn.userId.lastName,
        }));

        const paginatedResponse = getRecursivePaginatedResponse(booksIssued, page, limit, totalCount);

        // Sending the paginated response
        return RESPONSE.success(res, 2007, paginatedResponse);
    } catch (error) {
        console.error('Error fetching books issued in date range:', error);
        return RESPONSE.error(res, 9999, 500, error);
    }
};

export const issueBook = async (req, res) => {
    const { bookId, userId } = req.body;

    try {
        const book = await Books.findOne({ _id: bookId });
        const user = await Users.findOne({ _id: userId });

        if (!book) return RESPONSE.error(res, 3001, 400);
        if (!user) return RESPONSE.error(res, 1001, 400);

        const existingTransaction = await Transactions.findOne({
            bookId: book._id,
            returnedAt: null
        });

        if (existingTransaction) return RESPONSE.error(res, 2001, 400);

        const newTransaction = new Transactions({
            bookId: book._id,
            userId: user._id,
        });

        await newTransaction.save();

        return RESPONSE.success(res, 1001, { transaction: newTransaction });
    } catch (error) {
        console.error('Error issuing book:', error);
        return RESPONSE.error(res, 9999, 500, error);
    }
};

// Helper function to calculate rent
const calculateRent = (issuedAt, returnedAt, rentPerDay) => {
    const issueDate = moment(issuedAt);
    const returnDate = returnedAt ? moment(returnedAt) : moment();
    const daysIssued = returnDate.diff(issueDate, 'days');
    return daysIssued * rentPerDay;
};


// Return book function
export const returnBook = async (req, res) => {
    const { bookId, userId } = req.body;

    try {
        const [book, user] = await Promise.all([
            Books.findById(bookId),
            Users.findById(userId),
        ]);

        if (!book) return RESPONSE.error(res, 3001, 400);
        if (!user) return RESPONSE.error(res, 1001, 400);

        const transaction = await Transactions.findOne({ bookId, userId, returnedAt: null });

        if (!transaction) return RESPONSE.error(res, 2003, 400);

        const rent = calculateRent(transaction.issuedAt, transaction.returnedAt, book.rentPerDay);

        transaction.returnedAt = new Date();
        transaction.rent = rent;

        await transaction.save();

        return RESPONSE.success(res, 2005, { transaction });
    } catch (error) {
        console.error('Error returning book:', error);
        return RESPONSE.error(res, 9999, 500, error);
    }
};

// Calculate rent by transaction ID function
export const calculateRentByTransactionId = async (req, res) => {
    const { txnId } = req.params;

    try {
        const transaction = await Transactions.findById(txnId).populate('bookId');

        if (!transaction) return RESPONSE.error(res, 2000, 400);

        const rent = calculateRent(transaction.issuedAt, transaction.returnedAt, transaction.bookId.rentPerDay);

        return RESPONSE.success(res, 2006, { rent });
    } catch (error) {
        console.error('Error calculating rent:', error);
        return RESPONSE.error(res, 9999, 500, error);
    }
};



export const getBookIssuers = async (req, res) => {
    const { bookId } = req.params;

    try {
        const book = await Books.findOne({ _id: bookId });
        if (!book) return RESPONSE.error(res, 3001, 400);

        const transactions = await Transactions.find({ bookId: book._id }).populate({
            path: "userId",
            select: ["firstName", "lastName"],
            model: Users,
        }).populate({
            path: "bookId",
            select: "bookName",
            model: Books,
        })
            .exec();


        const issuers = transactions.filter(f => f.returnedAt != null).map(txn => ({
            userId: txn.userId._id,
            fullName: txn.userId.firstName + " " + txn.userId.lastName,
            issuedAt: txn.issuedAt,
            returnedAt: txn.returnedAt,
        }));
        const tmp = transactions.find(txn => !txn.returnedAt)?.userId;
        const currentHolder = tmp ? {
            userId: tmp._id,
            fullName: tmp.firstName + " " + tmp.lastName
        } : false;

        const totalRent = await getTotalRentByABook({ bookId })

        return RESPONSE.success(res, 2002, { issuers, currentHolder, totalRent: totalRent[0]?.totalRent });
    } catch (error) {
        console.error('Error fetching book issuers:', error);
        return RESPONSE.error(res, 9999, 500, error);
    }
};

export const getTotalRentByBook = async (req, res) => {
    const { bookId } = req.params;

    try {
        const book = await Books.findOne({ _id: bookId });
        if (!book) return RESPONSE.error(res, 3001, 400);
        const totalRent = await getTotalRentByABook({ bookId })
        return RESPONSE.success(res, 1001, { totalRent });
    } catch (error) {
        console.error('Error calculating total rent:', error);
        return RESPONSE.error(res, 9999, 500, error);
    }
};

export const getBooksIssuedByUser = async (req, res) => {
    const { userId } = req.params;
    const { page = 1, limit = 10 } = req.query; // Default to page 1, 10 results per page

    try {
        const user = await Users.findById(userId);
        if (!user) return RESPONSE.error(res, 1001, 400);

        const totalTransactions = await Transactions.countDocuments({ userId: user._id });

        const transactions = await Transactions.find({ userId: user._id })
            .populate({
                path: "bookId",
                select: ["bookName", "rentPerDay"],
                model: Books,
            })
            .skip((page - 1) * limit)
            .limit(parseInt(limit))
            .exec();

        const booksIssued = transactions.map((txn) => ({
            bookId: txn.bookId._id,
            bookName: txn.bookId.bookName,
            issuedAt: txn.issuedAt,
            returnedAt: txn.returnedAt,
            rent: calculateRent(txn.issuedAt, txn.returnedAt, txn.bookId.rentPerDay)
        }));

        return RESPONSE.success(res, 1001, {
            booksIssued,
            totalPages: Math.ceil(totalTransactions / limit),
            currentPage: parseInt(page),
        });
    } catch (error) {
        console.error("Error fetching books issued by user:", error);
        return RESPONSE.error(res, 9999, 500, error);
    }
};
