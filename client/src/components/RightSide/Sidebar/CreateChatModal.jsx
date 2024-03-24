import React, { useEffect, useState } from 'react';
import { getUsers } from '../../api/users';

import { useNavigate } from 'react-router-dom';
import { useChat } from '../../../Context/chatProvider';
import { CreateChat } from '../../api/chats';

export default function CreateChatModal({ isOpen, onClose }) {
    const [checkedUsers, setCheckedUsers] = useState([]);
    const [allUsers, setAllUsers] = useState([]);
    const [groupName, setGroupName] = useState("");
    const navigate = useNavigate();
    console.log("rerender");
    useEffect(() => {
        getUsers().then(data => {
            console.log(data);
            setAllUsers(data);
        })
    }, []);
    const {setRefresh,setSelectedChat,user} = useChat();
    // Function to handle toggling the checkbox state
    const toggleCheckbox = (userId) => {
        console.log(userId);
        if (checkedUsers.includes(userId)) {
            setCheckedUsers(checkedUsers.filter(id => id !== userId));
        } else {
            setCheckedUsers([...checkedUsers, userId]);
        }
    };

    const handleCreateChat = () => {
        if(checkedUsers.length>1 && !groupName) {
            return alert("Enter the group name");
        }

        CreateChat({isGroupChat:checkedUsers.length>1, users: checkedUsers, chatName: groupName})
        .then(data => {
            setRefresh(prev => !prev);
            setCheckedUsers([]);
            setGroupName("");
            setSelectedChat(data);
            navigate(`/chats/${data._id}`);
            onClose();
        }) 
    };

    return (
        <div className={`fixed inset-0 flex items-center justify-center z-50 ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
            <div className="fixed inset-0 bg-black opacity-50"></div>
            <div className="bg-[#1A202C] w-50 overflow-hidden shadow-xl transform transition-all max-w-3xl mx-auto">
                <div className="p-6">
                    
                    {checkedUsers.length > 1 && 
                    
                    <>
                    <h2 className="text-lg font-semibold mb-4">Enter Group name:</h2>
                        <input onChange={(e) => { setGroupName(e.target.value) }} type="text" className=" transform hover:scale-105 duration-100 transition-transform  mb-4 rounded p-4 flex text-black" placeholder="Enter Group Name" />
                    </>
                    }

                    <h2 className="text-lg font-semibold mb-4">Select Users</h2>
                    <div>
                        {allUsers?.map(user => (
                            <div key={user._id} onClick={() => toggleCheckbox(user._id)} className={`entry cursor-pointer transform hover:scale-105 duration-100 transition-transform  mb-4 rounded p-4 flex hover:bg-[#2D3748]`}>
                                <div className="flex-2">
                                    <div className="w-12 h-12 relative">
                                        <img className="w-12 h-12 rounded-full mx-auto" src={user.picture} alt="chat-user" />
                                    </div>
                                </div>
                                <div className="flex-1 px-2">
                                    <div className="truncate w-32"><span className="">{user.name}</span></div>
                                </div>
                                <input type="checkbox" className="mr-2" checked={checkedUsers.includes(user._id)} readOnly />
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-end mt-6">
                      
                        <button onClick={()=>{
                            onClose();
                            setCheckedUsers([]);
                            setGroupName("");
                        }} className="bg-gray-500 hover:bg-gray-600 text-dark font-semibold px-4 py-2 mr-4 rounded">Close</button>
                        <button onClick={handleCreateChat} className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded">Create Chat</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
