import React from 'react'
import { useChat } from '../../Context/chatProvider'

function Friendinfo({ isFriendinfo }) {
    let visible_class = "hidden"
    if (isFriendinfo)
        visible_class = ""

    const { user, selectedChat } = useChat();
    const otherUser = selectedChat.users?.find((u) => u._id != user._id);
    console.log(selectedChat);



    return (
        <div class={`${visible_class} w-1/5 mt-10`}>

            <div class="photo-wrapper p-2">
                <img class="w-32 h-32 rounded-full mx-auto" src={selectedChat.profile_pic} alt="John Doe" />
            </div>
            <div class="p-2">
                <h3 class="text-center text-xl text-gray-200 font-medium leading-8">{selectedChat.name}</h3>
                <div class="text-center text-gray-400 text-xs font-semibold">
                    <p>{selectedChat.isGroupChat ? "Group" : "Friend"}</p>
                </div>
            <table class="text-xs my-3 mx-auto">
                <tbody>
            {selectedChat.isGroupChat &&
                <>
                    Group members:
                    { selectedChat.users.map(user=>{
                
                    return( 
                        <tr>
                            <td class="px-2 py-2 text-gray-500 font-semibold">{user.name}<br/>{user.email}</td>
                        
                        </tr>
                        )       
                    })
                }
                </>
            }
            {selectedChat.isGroupChat==false && (
                <>
                <tr>
                            <td class="px-2 py-2 text-gray-500 font-semibold">{otherUser.name}<br/>{otherUser.email}</td>
                        
                </tr>
                </>
            )}
            </tbody>
        
            </table>

            </div>
        </div>
    )
}

export default Friendinfo