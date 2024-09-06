import express from 'express';
const router = express.Router();

// importing base routes
import bookRoutes from './book.routes.js';

router.use('/book', bookRoutes);

// exporting router
export default router;
  