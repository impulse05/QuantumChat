// add message routes
// Path: routes/messageRoutes.js
import express from 'express';
import { createMessage, deleteMessage, getMessages } from '../controllers/messageController.js';
import { verifyUser } from '../middlewares/passport.js';

const router = express.Router();

router.post('/message/:chatId', verifyUser, createMessage);
router.get('/message/:chatId', verifyUser, getMessages);
router.delete('/message/:messageId', verifyUser, deleteMessage);

export default router;


