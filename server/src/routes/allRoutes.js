import express from 'express'
import userRouter from './user/userRouter.js';
import adminRouter from './admin/adminRoutes.js';
import fileRouter from './files/fileRoutes.js';
import folderRouter from './folders/folderRoutes.js';

const router = express.Router();

router.use('/user',userRouter);
router.use('/admin', adminRouter);
router.use('/file', fileRouter)
router.use('/folder', folderRouter);

export default router;