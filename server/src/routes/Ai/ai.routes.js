import express from 'express'
import { aiChatController } from '../../controllers/AiControllers/ai.controller.js';

const aiRouter = express.Router();

aiRouter.get("/:chat", aiChatController);

export default aiRouter;