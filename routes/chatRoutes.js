// create the routes for the chat app
import express from 'express';
import { addUsersToChat, createChat, getChat, getGroupChats, getPersonalChats, joinChat, leaveChat, removeUsersFromChat } from '../controllers/chatControllers.js';
import { verifyUser } from '../middlewares/passport.js';


const router = express.Router();

router.post('/chat', verifyUser, createChat);
// get group chats
router.get('/chats/personal', verifyUser, getPersonalChats);
// get personal chats
router.get('/chats/group', verifyUser, getGroupChats);
router.get('/chat/:chatId', verifyUser, getChat);
// join chat
router.put('/chat/:chatId', verifyUser, joinChat);
// leave chat
router.delete('/chat/:chatId', verifyUser, leaveChat);
// add user to a group chat
router.put('/chat/:chatId/users', verifyUser, addUsersToChat);
// remove user from a group chat
router.delete('/chat/:chatId/users/:userId', verifyUser, removeUsersFromChat);





export default router;
