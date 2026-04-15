import express from 'express'
import userRouter from './user/userRouter.js';
import adminRouter from './admin/adminRoutes.js';
import fileRouter from './files/fileRoutes.js';
import folderRouter from './folders/folderRoutes.js';
import aiRouter from './Ai/ai.routes.js';
import authRouter from './Auth/auth.routes.js';

const router = express.Router();

router.use('/user',userRouter);
router.use('/admin', adminRouter);
router.use('/file', fileRouter)
router.use('/folder', folderRouter);
router.use('/ai', aiRouter);
router.use('/auth', authRouter)


export default router;