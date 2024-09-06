import db from '../models/index.js';
import RESPONSE from '../helpers/response.helper.js';
import { getPaginationMetadata, getRecursivePaginatedResponse } from '../helpers/pagination.helper.js';

const { Books, Transactions } = db;

export const searchBooks = async (req, res) => {
    const { name, Category, minRent, maxRent, page = 1, limit = 10 } = req.query;

    try {
        const query = {};

        if (name) {
            query.bookName = { $regex: name, $options: 'i' };
        }

        if (Category) {
            query.category = Category;
        }

        if (minRent || maxRent) {
            query.rentPerDay = {};
            if (minRent) query.rentPerDay.$gte = Number(minRent);
            if (maxRent) query.rentPerDay.$lte = Number(maxRent);
        }

        const { startIndex } = getPaginationMetadata({ page, limit });

        const totalBooks = await Books.countDocuments(query);

        const books = await Books.find(query).limit(limit).skip(startIndex)

        const paginatedResponse = getRecursivePaginatedResponse(books, page, limit, totalBooks);

        return RESPONSE.success(res, 3002, { ...paginatedResponse });
    } catch (error) {
        console.error('Error searching books:', error);
        return RESPONSE.error(res, 9999, 500, error);
    }
};

export const getDistinctCategories = async (req, res) => {
    try {
        const distinctCategories = await Books.distinct("category");
        return RESPONSE.success(res, 3003, { categories: distinctCategories });
    } catch (error) {
        console.error('Error fetching distinct categories:', error);
        return RESPONSE.error(res, 9999, 500, error);
    }
};