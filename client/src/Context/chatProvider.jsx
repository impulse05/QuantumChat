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
    const [chats, setChats] = useState([]);
    const [filter, setFilter] = useState("");
    const [filterdChats, setFilterdChats] = useState([])

  
  
    useEffect(() => {
   
      getChats().then((data) => {
        console.log(data);
        setChats(data);
        setFilterdChats(data);
      });
      
  
    }, [refresh]);

    useEffect(() => {
      if(!filter || !filter.length)
      setFilterdChats(chats);

      else {
        // filter based on string
        const filterd = chats.filter(chat => 
          chat.users.some(user => user.name.toLowerCase().includes(filter.toLowerCase()))
      );
      
        setFilterdChats(filterd);
      }
      
    }, [filter,refresh])
    console.log(filterdChats);
    

 

    return (
        <ChatContext.Provider value={{ user, selectedChat, setSelectedChat,refresh, setRefresh ,filter,setFilter,filterdChats}}>
            {children}
        </ChatContext.Provider>
    )
}


export const useChat = () => {
  return useContext(ChatContext);
}


export default ChatProvider;