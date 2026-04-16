import express from 'express'
import { aiChatController } from '../../controllers/AiControllers/ai.controller.js';

const aiRouter = express.Router();

aiRouter.post("/chat", aiChatController);

export default aiRouter;