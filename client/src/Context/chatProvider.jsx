// create a context for chat

import React, { createContext, useContext, useEffect, useState } from 'react';
import { getCurrentUser } from '../components/Auth/auth';
import { getChats } from '../components/api/GetChats';


const ChatContext = createContext();



const ChatProvider = ({ children }) => {
    const user =getCurrentUser();
    const [selectedChat, setSelectedChat] = useState({
      profile_pic: "https://icon-library.com/images/users-icon-png/users-icon-png-16.jpg",
      name: "John Doe",
      active_time: "active 1h ago",
      _id:"dummy"
    });

    const [refresh, setRefresh] = useState(false);
    const [groupChat, setGroupChat] = useState(false);
    const [groupChats, setGroupChats] = useState([]);

    const [personalChats, setPersonalChats] = useState([]);
  
  
    useEffect(() => {
   
      getChats(true).then((data) => {
        console.log(data);
        setGroupChats(data);
      });
      getChats(false).then((data) => {
        console.log(data);
        setPersonalChats(data);
      });
  
    }, [refresh]);

 

    return (
        <ChatContext.Provider value={{ user, selectedChat, setSelectedChat, groupChat, setGroupChat, groupChats, setGroupChats, personalChats, setPersonalChats,refresh, setRefresh }}>
            {children}
        </ChatContext.Provider>
    )
}


export const useChat = () => {
  return useContext(ChatContext);
}


export default ChatProvider;