import express from "express";
import {
    getDistinctCategories,
    searchBooks
} from "../../controllers/book.controller.js";

const routes = express.Router();

routes.get("/search", searchBooks);
routes.get("/categories", getDistinctCategories);

export default routes;
