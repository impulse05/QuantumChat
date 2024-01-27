import React, { useEffect, useState } from 'react'
import ChatlistItem from './ChatlistItem'
import { Link } from 'react-router-dom'

function Chatlist({ chats, groupChat }) {
    let data = {
        profile_pic: "",
        isonline: true,
        name: "Lucky Kushwaha",
        lastMessage: "Yeah, Sure!",
        unseen_msg_cnt: 0,
        last_msg_date: "06/01/2024",
        isopened: true
    }
    // console.log(chats)

    return (

        <div class="flex-1 max-h-[75vh] overflow-auto px-2">


            {chats?.map((chat) => {
                 data.lastMessage = chat?.lastMessage?.content;
                 data.last_msg_date = new Date(chat.lastMessage.updatedAt).toLocaleDateString({
                     day: '2-digit',
                     month: '2-digit',
                     year: 'numeric',
                 }).toString();

                if (groupChat == true) {
                    data.name = chat.chatName;
                    data.profile_pic = chat.chatPicture;
                    return (
                        <Link to={`/group/${chat._id}`}>
                            <ChatlistItem data={data} />
                        </Link>
                    )
                }
                else {

                    let other_user = chat.users.filter((user) => {
                        return user._id.toString() != localStorage.getItem("userid");
                    })[0];

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