import React, { useEffect, useState } from 'react'
import ChatlistItem from './ChatlistItem'
import { Link } from 'react-router-dom'
import { useChat } from '../../../Context/chatProvider'

function Chatlist({ chats, groupChat }) {

    const {user, setSelectedChat }= useChat();
   
    // console.log(chats)

    return (

        <div class="flex-1 max-h-[75vh] overflow-auto px-2">


            {chats?.map((chat) => {
                 const data = {
                    ...chat,
                    profile_pic: "",
                    isonline: true,
                    name: "Lucky Kushwaha",
                    lastMessage: "Yeah, Sure!",
                    unseen_msg_cnt: 0,
                    last_msg_date: "06/01/2024",
                    isopened: false
                }
                 data.lastMessage = chat?.lastMessage?.content;
                 data.last_msg_date = new Date(chat?.lastMessage?.updatedAt).toLocaleDateString();

                if (groupChat == true) {
                    data.name = chat.chatName;
                    data.profile_pic = chat.chatPicture;
                    setSelectedChat(data);
                    return (
                        <Link to={`/group/${chat._id}`}>
                            <ChatlistItem data={data} />
                        </Link>
                    )
                }
                else {

                    let other_user = chat.users.find((u) => u._id != user._id);
                    setSelectedChat(data);
                    data.name = other_user.name;
                    data.profile_pic = other_user.picture;
                    return (
                        <Link to={`/personal/${chat._id}`}>
                            <ChatlistItem data={data} />
                        </Link>
                    )
                }
            })}










        </div>
    )
}

export default Chatlist