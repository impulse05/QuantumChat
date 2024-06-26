import React from 'react'
import { useChat } from '../../../Context/chatProvider';

function Chatbar({data, togglePanel}) {
    const {user} = useChat();

    return (
        <div class="chat-header px-6 py-4 flex flex-row flex-none justify-between items-center shadow">
            <div class="flex">
                <div class="w-12 h-12 mr-4 relative flex flex-shrink-0">
                    <img class="shadow-md rounded-full w-full h-full object-cover" src={data.profile_pic} alt=""/>
                </div>
                <div class="text-sm">
                    <p class="font-bold">{data.name}</p>
                    <p>{data.active_time}</p>
                </div>
            </div>

            <div class="flex">
                
                <a onClick={togglePanel} class="block rounded-full hover:bg-gray-700 bg-gray-800 w-10 h-10 p-2 ml-4">
                    <svg viewBox="0 0 20 20" class="w-full h-full fill-current text-blue-500">
                        <path d="M2.92893219,17.0710678 C6.83417511,20.9763107 13.1658249,20.9763107 17.0710678,17.0710678 C20.9763107,13.1658249 20.9763107,6.83417511 17.0710678,2.92893219 C13.1658249,-0.976310729 6.83417511,-0.976310729 2.92893219,2.92893219 C-0.976310729,6.83417511 -0.976310729,13.1658249 2.92893219,17.0710678 Z M9,11 L9,10.5 L9,9 L11,9 L11,15 L9,15 L9,11 Z M9,5 L11,5 L11,7 L9,7 L9,5 Z"></path>
                    </svg>

                </a>
            </div>
        </div>
    )
}

export default Chatbar