// create a context for chat

import React, { createContext, useContext, useEffect, useState } from 'react';
import { getCurrentUser } from '../components/Auth/auth';
import { getChats } from '../components/api/GetChats';


const ChatContext = createContext();

export const useChat = () => {
    return useContext(ChatContext);
}



const ChatProvider = ({ children }) => {
    const [user, setUser] = useState()
    const [selectedChat, setSelectedChat] = useState(null);
    const [messages, setMessages] = useState([]);
    const [groupChat, setGroupChat] = useState(false);
    const [groupChats, setGroupChats] = useState([]);

    const [personalChats, setPersonalChats] = useState([]);
  
  
    useEffect(() => {
    const user = getCurrentUser();
    setUser(user);
      getChats(true).then((data) => {
        setGroupChats(data);
      });
      getChats(false).then((data) => {
        setPersonalChats(data);
      });
  
    }, []);

 

    return (
        <ChatContext.Provider value={{ user, selectedChat, setSelectedChat, messages, setMessages, groupChat, setGroupChat, groupChats, setGroupChats, personalChats, setPersonalChats }}>
            {children}
        </ChatContext.Provider>
    )
}