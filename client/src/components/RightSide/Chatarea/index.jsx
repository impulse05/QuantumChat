import React, { useEffect, useState } from 'react'
import Chatbar from './Chatbar'
import Messages from './Messages'
import Messagebar from './Messagebar'
import { useLocation, useParams } from 'react-router-dom'
import { getMessages, sendMessage } from '../../api/messages'
import {io} from 'socket.io-client'
import { getCurrentUser } from '../../api/auth'
import { useChat } from '../../../Context/chatProvider'
import EmojiPicker from 'emoji-picker-react';
const backend = "/"

function Chatarea({ togglePanel }) {
  const { id } = useParams();
  const [messages, setMessages] = useState([]);

  const [socketConnected, setSocketConnected] = useState(false)
  const [showPicker, setShowPicker] = useState(false)
  const [socket, setSocket] = useState(null);
  const user = getCurrentUser();
  const {selectedChat, setSelectedChat,refresh, setRefresh} = useChat();
  const [message, setMessage] = useState('');

  useEffect(() => {
    const newSocket = io(backend);
    newSocket.on('connect', () => {
      newSocket.emit('setup', user);
    });
    newSocket.on('connected', () => {
      console.log('connected')
      setSocketConnected(true);
    });
    newSocket.emit('join', id);
    newSocket.on('message received', (newMessage) => {
      if(newMessage.chat.toString()!=id.toString()) {
        // refresh the chat list
        console.log("sending to differetn channel")
        // setRefresh(prev => !prev);
      }
  
      else{
        console.log('new message', newMessage);
        setMessages(prevMessages => [...prevMessages, newMessage]);
      }
    });

    setSocket(newSocket);
  }, []);

  const fetchMessages = () => {
    if(!selectedChat._id) return;
    getMessages(id).then((res) => {
      setMessages(res.messages);
      const chat = res.chat;
      if (chat.isGroupChat == true) {
        chat.name = chat.chatName;
        chat.profile_pic = chat.chatPicture;
      } else {
        const other_user = chat.users?.find((u) => u._id != user._id);
        chat.name = other_user?.name;
        chat.profile_pic = other_user?.picture;
      }

      setSelectedChat(res.chat);
    });
  }

  useEffect(() => {
    fetchMessages();
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // send message to the server
    sendMessage(id, {
      content: message,
      // attachment: null
    }).then((res) => {
      // console.log(res);
      // console.log(messages);
   
      setMessages(prevMessages => [...prevMessages, res.message]);
      socket.emit('newMessage', res.message);
    });

    console.log(message);
    setMessage('');
  }

  return (
    <div class=" chat-area flex-1 flex flex-col mt-4 pr-5 border-r-2 border-gray-800">
      <Chatbar data={selectedChat} togglePanel={togglePanel} />
      <Messages messages={messages} />
      <EmojiPicker open={showPicker} onEmojiClick={(a) => setMessage(prev => prev + a.emoji)} />
      
      <Messagebar message={message} setMessage={setMessage} handleSubmit={handleSubmit}  setShowPicker={setShowPicker}/>
    </div>
  )
}

export default Chatarea