import express from 'express'
import { loginController, logoutController, refreshTokenController, registerController } from '../../controllers/authControllers/auth.controller.js';
import isAuthenticated from '../../middlewares/isAuthenticated.js';

const authRouter = express.Router();

authRouter.post('/register', registerController);
authRouter.post('/login', loginController);
authRouter.post('/refresh-token', refreshTokenController);
authRouter.post('/logout',isAuthenticated, logoutController);

export default authRouter;