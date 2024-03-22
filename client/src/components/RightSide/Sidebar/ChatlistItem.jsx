import React from 'react'
import profile_photo from "../../../assets/profile.png"
import { useChat } from '../../../Context/chatProvider';
function ChatlistItem(props) {
    let data = props.data;

   

    let isopened_classes = ""
    if (data.isopened)
        isopened_classes = "border-l-4 border-blue-700 bg-[#2D3748]"

    let bg_color_class = "bg-gray-400";
    if (data.isonline == true)
        bg_color_class = "bg-green-400";

    let bold_class = "";
    if(data.unseen_msg_cnt > 0)
        bold_class = "font-bold"

    return (
        <div class={`entry cursor-pointer transform hover:scale-105 duration-100 transition-transform  mb-4 rounded p-4 flex hover:bg-[#2D3748] ${isopened_classes} ${bold_class}`}>
            <div class="flex-2">
                <div class="w-12 h-12 relative">
                    <img class="w-12 h-12 rounded-full mx-auto" src={data.profile_pic} alt="chat-user" />

                    <span className={`absolute w-4 h-4 ${bg_color_class} rounded-full right-0 bottom-0 border-2 border-white`}></span>
                </div>
            </div>
            <div class="flex-1 px-2">
                <div class="truncate w-32"><span class="">{data.name}</span></div>
                <div class="truncate w-32 text-gray-600"><small class={data.unseen_msg_cnt > 0 ? "text-gray-200" : "text-gray-600"}>{data.lastMessage}</small></div>
            </div>
            <div class="flex-2 text-right">
                <div><small class={data.unseen_msg_cnt > 0 ? "" : " text-gray-600"}>{data.last_msg_date}</small></div>
                
                {
                    data.unseen_msg_cnt > 0 ? (<div>
                        <small class="text-xs bg-red-500 text-white rounded-full h-6 w-6 leading-6 text-center inline-block">
                            {data.unseen_msg_cnt}
                        </small>
                    </div>): null
                }
                
            </div>
        </div>
    )
}

export default ChatlistItem