import React, { useEffect, useState } from 'react'
import Chatbar from './Chatbar'
import Messages from './Messages'
import Messagebar from './Messagebar'
import { useLocation, useParams } from 'react-router-dom'
import { getMessages, sendMessage } from '../../api/GetMessages'
import {io} from 'socket.io-client'
import { getCurrentUser } from '../../Auth/auth'
import { useChat } from '../../../Context/chatProvider'

const backend = "/"


function Chatarea({ togglePanel }) {

  const { id } = useParams();
  const [messages, setMessages] = useState([]);

  const [socketConnected, setSocketConnected] = useState(false)
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
      // setSelectedChat(res.chat);
      
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
      <Messagebar message={message} setMessage={setMessage} handleSubmit={handleSubmit} />
    </div>
  )
}

export default Chatarea