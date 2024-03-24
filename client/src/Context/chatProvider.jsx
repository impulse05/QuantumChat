// create a context for chat

import React, { createContext, useContext, useEffect, useState } from 'react';
import { getCurrentUser } from '../components/api/auth';
import { getChats } from '../components/api/chats';

const ChatContext = createContext();

const ChatProvider = ({ children }) => {
    const [selectedChat, setSelectedChat] = useState({
      profile_pic: "https://icon-library.com/images/users-icon-png/users-icon-png-16.jpg",
      name: "John Doe",
      active_time: "active 1h ago",
      _id:"dummy"
    });

    const [refresh, setRefresh] = useState(false);
    const [user, setUser] = useState(getCurrentUser());
    const [chats, setChats] = useState([]);
    const [filter, setFilter] = useState("");
    const [filterdChats, setFilterdChats] = useState([])

    useEffect(() => {
      setUser(getCurrentUser());
      getChats().then((data) => {
        const updated = data.map(chat=>{
          if (chat.isGroupChat == true) {
            chat.name = chat.chatName;
            chat.profile_pic = chat.chatPicture;
          } else {
            const other_user = chat.users?.find((u) => u._id != user._id);
            chat.name = other_user?.name;
            chat.profile_pic = other_user?.picture;
          }

          return chat;
        }
        )
        setChats(updated);
        setFilterdChats(updated);
      });
    }, [refresh]);

    useEffect(() => {
      if(!filter || !filter.length)
      setFilterdChats(chats);

      else {
        // filter based on string
        const filterd = chats.filter(chat => chat.name.toLowerCase().includes(filter.toLowerCase()));
      
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