import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
    isGroupChat : {
        type: Boolean,
        default : false
    },
    chatName : {
        type: String
    },
    chatPicture : {
        type : String,
        default : 'https://icon-library.com/images/group-icon-png/group-icon-png-23.jpg'
    },
    users : {
        type : [{
            type: mongoose.Schema.Types.ObjectId,
            ref : 'User'
        }]
    },
    admins:{
        type : [{
            type: mongoose.Schema.Types.ObjectId,
            ref : 'User'
        }]
    },
    lastMessage : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Message'
    },
    isPublic : {
        type: Boolean,
        default : false
    }
}, {timestamps: true});

const Chat = mongoose.model("Chat", chatSchema);

export default Chat;