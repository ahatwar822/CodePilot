import express from 'express'
import { success } from '../../utils/response.utils.js';

const userRouter = express.Router();

userRouter.get('/', (req, res) => {
    return success(res, { message: 'User route is working!' });
})


export default userRouter;
