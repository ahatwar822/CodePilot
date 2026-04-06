import express from 'express'
import userRouter from './user/userRouter.js';
import adminRouter from './admin/adminRoutes.js';

const router = express.Router();

router.use('/user',userRouter);
router.use('/admin', adminRouter);

export default router;