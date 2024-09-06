import express from 'express';
const router = express.Router();

// importing base routes
import transactionRoutes from './transaction.routes.js';

router.use('/transaction', transactionRoutes);

// exporting router
export default router;
  