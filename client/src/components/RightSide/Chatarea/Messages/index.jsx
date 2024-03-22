import React, { useEffect, useRef, useState } from 'react'
import Message from './Message'
import { useParams } from 'react-router-dom';
import { getChats } from '../../../api/GetChats';
import { useChat } from '../../../../Context/chatProvider';

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



    const { user } = useChat();

    return (
        <div class="messages flex-1 overflow-auto max-h-[75vh]">

            {
                messages?.map((message, index) => {
                    // add the ref  to the last message
                
                    return <Message data={message} isme={message.sender._id.toString() === user._id} />

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