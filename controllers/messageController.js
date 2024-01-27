// create the mesage contorllers

// Path: Controllers/messageController.js


import Chat from '../models/chatModel.js';
import User from '../models/userModel.js';
import Message from '../models/messageModel.js';

export const createMessage = async (req, res) => {

    try {
           // #swagger.tags = ['message']

         
            /* #swagger.security = [{
                 "apiKeyAuth": []
            }] */
        const { content, attatchment } = req.body;
        const { chatId } = req.params;
        const { _id } = req.user;

        // add validation

        if (!_id || !content || !chatId) {
            throw new Error("Enter valid credentials");
        }


        const message = new Message({
            sender: _id,
            content,
            chat: chatId,
            attatchment
        });

        await message.save();

        const chatToUpdate = await Chat.findByIdAndUpdate(chatId, {
            lastMessage: message._id
        });

        res.status(200).json({
            message
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            message: error.message
        });
    }
}


export const getMessages = async (req, res) => {
    try {
         // #swagger.tags = ['message']

         
            /* #swagger.security = [{
                 "apiKeyAuth": []
            }] */
        const { chatId } = req.params;

        const messages = await Message.find({ chat: chatId }).populate('sender', "name picture");

        res.status(200).json({
            messages
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            message: error.message
        });
    }
}

// delete only if it is sent by the user within 5 minutes

export const deleteMessage = async (req, res) => {
    try {
         // #swagger.tags = ['message']

         
            /* #swagger.security = [{
                 "apiKeyAuth": []
            }] */
        const { messageId } = req.params;
        const { _id } = req.user;

        const message = await Message.findById(messageId);

        if (!message) {
            throw new Error("No message found");
        }

        if (message.sender.toString() !== _id.toString()) {
            throw new Error("You are not authorized to delete this message");
        }

        const date = new Date();

        const diff = (date.getTime() - message.createdAt.getTime()) / 1000;

        if (diff > 300) {
            throw new Error("You can not delete this message");
        }

        await message.remove();

        res.status(200).json({
            message: "Message deleted successfully"
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            message: error.message
        });
    }
}
