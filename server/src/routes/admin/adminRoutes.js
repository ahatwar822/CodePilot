import express from 'express'
import { success } from '../../utils/response.utils.js';

const adminRouter = express.Router();

adminRouter.get('/', (req, res) => {
    return success(res, { message: 'Admin route is working!' });
})


export default adminRouter;