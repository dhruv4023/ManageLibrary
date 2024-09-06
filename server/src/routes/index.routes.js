import express from 'express';
import userApi from "./user/index.js"
import bookApi from "./book/index.js"
import transactionApi from "./transaction/index.js"

const router = express.Router();

router.use("", userApi)
router.use("", bookApi)
router.use("", transactionApi)

export default router;
