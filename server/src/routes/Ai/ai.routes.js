import express from 'express'
import { aiChatController, streamSuggestionController, suggestCodeController } from '../../controllers/AiControllers/ai.controller.js';

const aiRouter = express.Router();

aiRouter.post("/chat", aiChatController);
aiRouter.post("/suggest", suggestCodeController);
aiRouter.post("/stream", streamSuggestionController);

export default aiRouter;