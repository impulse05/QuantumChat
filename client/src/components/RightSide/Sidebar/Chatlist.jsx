import React, { useEffect, useState } from 'react'
import ChatlistItem from './ChatlistItem'
import { Link } from 'react-router-dom'
import { useChat } from '../../../Context/chatProvider'

function Chatlist() {
    const {user, setSelectedChat,filterdChats }= useChat();
   
    // console.log(chats)
    console.log(filterdChats);

    return (

        <div class="flex-1 max-h-[75vh] overflow-auto px-2">

            {filterdChats?.map((chat) => {
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