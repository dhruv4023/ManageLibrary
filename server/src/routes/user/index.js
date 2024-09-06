import express from 'express';
const router = express.Router();

// importing base routes
import userRoutes from './user.routes.js';

router.use('/user', userRoutes);

// exporting router
export default router;
  