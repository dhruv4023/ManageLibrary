import express from "express";
import {
    calculateRentByTransactionId,
    getBookIssuers,
    getBooksIssuedByUser,
    getTotalRentByBook,
    issueBook,getBooksIssuedInRange,
    returnBook,
} from "../../controllers/transaction.controller.js";

const routes = express.Router();

routes.post("/issue", issueBook);

routes.get("/calculate-rent/:txnId", calculateRentByTransactionId);

routes.post("/return", returnBook);

routes.get("/book-issuers/:bookId", getBookIssuers);

routes.get("/total-rent/:bookId", getTotalRentByBook);

routes.get("/books-issued/user/:userId", getBooksIssuedByUser);

routes.get("/books-issued-range", getBooksIssuedInRange);

export default routes;
