import React, { useEffect, useState } from 'react'
import ChatlistItem from './ChatlistItem'
import { Link } from 'react-router-dom'
import { useChat } from '../../../Context/chatProvider'

function Chatlist() {

    const {user, setSelectedChat,filterdChats }= useChat();
   
    // console.log(chats)

    return (

        <div class="flex-1 max-h-[75vh] overflow-auto px-2">


            {filterdChats?.map((chat) => {
               
                 chat.lastMessage = chat?.lastMessage?.content;
                 chat.last_msg_date = new Date(chat?.lastMessage?.updatedAt).toLocaleDateString();

               
                return (
                    <Link to={`/chats/${chat._id}`} onClick={()=>setSelectedChat(chat)}>
                        <ChatlistItem data={chat} />
                    </Link>
                )
               
            })}










        </div>
    )
}

export default Chatlist