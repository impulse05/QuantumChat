// create chat controllers
import mongoose from 'mongoose';
import Chat from '../models/chatModel.js';
import Message from '../models/messageModel.js';

export const createChat = async (req, res) => {
    try {
            // #swagger.tags = ['chat']
            
           
              /* #swagger.security = [{
                 "apiKeyAuth": []
            },
            {
                "cookieAuth": []
            }
        ] */

        const { isGroupChat, chatName, chatPicture, users } = req.body;
        const { _id } = req.user;
        // check if current user is not in the users array
        if(users.filter(user => user === _id.toString()).length == 0) { 
            users.push(_id);
        }
        if((isGroupChat && users.length < 2) || users.length<2) {
            throw new Error("Group chat must have at least 2 users");
        }


        const chat = new Chat({
            isGroupChat,
            chatName,
            chatPicture,
            users,
            admins : [ _id ]
        });

        await chat.save();

        res.status(200).json({
            chat
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            message: error.message
        });
    }
}


export const getChat = async (req, res) => {
    try {

             // #swagger.tags = ['chat']

         
            /* #swagger.security = [{
                 "apiKeyAuth": []
            }] */
        const { chatId } = req.params;

        const chat = await Chat.findById(chatId).populate('users');

        if(!chat) {
            throw new Error("No chat found");
        }

        const messages = await Message.find({ chat: chatId }).populate('sender', "name picture");

        res.status(200).json({
            chat,
            messages
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            message: error.message
        });
    }
}


// get all group chats
export const getGroupChats = async (req, res) => {
    try {
                // #swagger.tags = ['chat']
            /* #swagger.security = [{
                    "apiKeyAuth": []
            }] */
        const { _id } = req.user;
            // fetch group chats and populate lastMessage and sender in lastMessage
        const chats = await Chat.find({ users:_id, isGroupChat: true }).populate({
            path: 'lastMessage',
            select: 'content sender', // simlar esa kuch imse bhi kar lena // space seperated jo jo select krna h
            populate: {
                path: 'sender',
                select: 'name picture email'//ese karke specifi hi select karna faltu data mat lana
            }
        })
        .populate({
            path: 'users',
            select: 'name picture email phone'
        });
        
        res.status(200).json({
            chats
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            message: error.message
        });
    }
}

// get all personal chats

export const getPersonalChats = async (req, res) => {
    try {
                // #swagger.tags = ['chat']
            /* #swagger.security = [{
                    "apiKeyAuth": []
            }] */
        const { _id } = req.user;
        const chats = await Chat.find({ users:_id}).populate({
            path: 'lastMessage',
            select: 'content sender', // simlar esa kuch imse bhi kar lena // space seperated jo jo select krna h
            populate: {
                path: 'sender',
                select: 'name picture email'
            }
        })
        .populate({
            path: 'users',
            select: 'name picture email phone'
        });

        res.status(200).json({
            chats
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            message: error.message
        });
    }
}

// join a  chat with id from params
export const joinChat = async (req, res) => {
    try {

              // #swagger.tags = ['chat']

         
            /* #swagger.security = [{
                 "apiKeyAuth": []
            }] */
        const { chatId } = req.params;
        const { _id } = req.user;
       

        const chat = await Chat.findById(chatId);

        if (!chat) {
            throw new Error("No chat found");
        }
         // check if not a group chat
        if (!chat.isGroupChat || !chat.isPublic) {
            throw new Error("Not a group or public chat");
        }


        // chat users is an array of object ids check if the user is already in the chat
        const isUserInChat = chat.users.includes(new mongoose.Types.ObjectId(_id));        

        if (isUserInChat) {
            throw new Error("User already in chat");
        }

        chat.users.push(_id);

        await chat.save();

        res.status(200).json({
            chat
        });
    } catch (error) {
        console.log(error);
        console.log(error.message);
        res.status(500).json({
            message: error.message
        });
    }
}

// leave a chat
export const leaveChat = async (req, res) => {
    try {
           // #swagger.tags = ['chat']

         
            /* #swagger.security = [{
                 "apiKeyAuth": []
            }] */
        const { chatId } = req.params;
        const { _id } = req.user;

        const chat = await Chat.findById(chatId);

        if (!chat) {
            throw new Error("No chat found");
        }
         // check if not a group chat
        if (!chat.isGroupChat) {
            throw new Error("Not a group chat");
        }

        // chat users is an array of object ids check if the user is already in the chat
        const isUserInChat = chat.users.includes(new mongoose.Types.ObjectId(_id));        

        if (!isUserInChat) {
            throw new Error("User not in chat");
        }

        chat.users.pull(_id);

        await chat.save();

        res.status(200).json({
            chat
        });
    } catch (error) {
        console.log(error);
        console.log(error.message);
        res.status(500).json({
            message: error.message
        });
    }
}

// add users to chat using chat id from params

export const addUsersToChat = async (req, res) => {
    try {
        const { chatId } = req.params;
        const { users } = req.body;
           // #swagger.tags = ['chat']

         
            /* #swagger.security = [{
                 "apiKeyAuth": []
            }] */

        const chat = await Chat.findById(chatId);

        if (!chat) {
            throw new Error("No chat found");
        }
         // check if not a group chat
        if (!chat.isGroupChat) {
            throw new Error("Not a group chat");
        } 

        // check if you are the admin of the chat

        const isAdmin = chat.admins.includes(new mongoose.Types.ObjectId(req.user._id));

        if (!isAdmin) {
            throw new Error("You are not the admin of the chat");
        }

        //add only non-existing users to the chat
        const newUsers = users.filter(user => !chat.users.includes(new mongoose.Types.ObjectId(user)));

        chat.users = [...chat.users, ...newUsers];

        await chat.save();

        res.status(200).json({
            chat
        });
    } catch (error) {
        console.log(error);
        console.log(error.message);
        res.status(500).json({
            message: error.message
        });
    }
}
// remove users from chat

export const removeUsersFromChat = async (req, res) => {
    try {

                // #swagger.tags = ['chat']
         
        
        const { chatId, userId } = req.params;
         
           

          
        const chat = await Chat.findById(chatId);

        if (!chat) {
            throw new Error("No chat found");
        }
         // check if not a group chat
        if (!chat.isGroupChat) {
            throw new Error("Not a group chat");
        } 

        // remove user from chat
        chat.users.pull(new mongoose.Types.ObjectId(userId));

        await chat.save();

        res.status(200).json({
            chat
        });
    } catch (error) {
        console.log(error);
        console.log(error.message);
        res.status(500).json({
            message: error.message
        });
    }
}




// TODO:
// leave a chat

// add users to chat
