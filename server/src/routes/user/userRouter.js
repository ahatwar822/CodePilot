import express from 'express'
import { success } from '../../utils/response.utils.js';
import isAuthenticated from '../../middlewares/isAuthenticated.js';
import { getAuthenticatedUser } from '../../controllers/userControllers/user.controller.js';

const userRouter = express.Router();

userRouter.get('/me', isAuthenticated, getAuthenticatedUser )


export default userRouter;
