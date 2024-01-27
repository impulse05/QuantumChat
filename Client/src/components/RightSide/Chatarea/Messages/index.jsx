import React, { useEffect, useRef, useState } from 'react'
import Message from './Message'
import { getMessages } from '../../../api/GetMessages';
import { useParams } from 'react-router-dom';

function Messages({ messages }) {
    // Empty dependency array ensures this effect runs only once when the component mounts

    // scroll to last message
    const messagesEndRef = useRef(null)

    const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }
  
    useEffect(() => {
      scrollToBottom()
    }, [messages]);



    let my_user_id = JSON.parse(localStorage.getItem("user"))?._id;

    return (
        <div class="messages flex-1 overflow-auto max-h-[75vh]">

            {
                messages?.map((message, index) => {
                    // add the ref  to the last message
                
                    return <Message data={message} isme={message.sender._id.toString() === my_user_id} />

                }
                
                )
            }
            <div ref={messagesEndRef} />


            {/* <Message data={sample_data_1} />
            <Message data={sample_data_2} /> */}

        </div>
    )
}

export default Messages