import {Server} from 'socket.io';
import Chat from './models/chatModel.js';
const socketInit = (server)   => {
  
    const io = new Server(server, {
        cors: {
        origin: "http://localhost:5173"
        }
    });

    // on connections
    io.on('connection', (socket) => {
        console.log('a user connected');

        // setup the chat
        socket.on('setup', (userData) => {
            console.log('setup', userData._id);
            socket.join(userData._id);
            socket.emit('connected');
        });

        // join a chat
        socket.on('join', (room) => {
            console.log('join room', room);
            socket.join(room);
        });

        // new message

        socket.on('newMessage', async (message) => {
            // console.log('new message', message);
            const { chat, sender } = message;

            // get the user of the chat
            const chatUser = await Chat.findById(chat).populate('users');
            // console.log('chat user', chatUser);
            // check if the user is in the chat

            if (chatUser) {
                // send the message to the chat
                chatUser.users.forEach(user => {
                    // console.log('user', user);
                    if (user._id.toString() !== sender._id.toString()) {
                        console.log('emit to', user._id);
                        socket.in(user._id.toString()).emit('message received', message);
                    }
                });
            }

        });


        // connectiopn end
        socket.off('setup', () => {
            console.log('user disconnected');
            socket.leave(userData._id);
        });


    });
   
}

export default socketInit;