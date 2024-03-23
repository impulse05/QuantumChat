import React, { useEffect, useState } from 'react'
import Searchbar from './Searchbar'
import Chatlist from './Chatlist'
import logo from "../../../assets/logo.png"
import { getChats } from '../../api/GetChats';
import { Routes, Route } from 'react-router-dom';
import { useChat } from '../../../Context/chatProvider';
import CreateChatModal from './CreateChatModal';

function Sidebar() {



  const { filteredChats } = useChat();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const users = [
    { id: 1, name: 'User 1' },
    { id: 2, name: 'User 2' },
    { id: 3, name: 'User 3' },
    // Add more users as needed
  ];

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const createChat = (selectedUsers) => {
    // Logic to create a new chat with selected users
  };


  return (
    <div class="sidebar hidden lg:flex w-3/12 flex-2 flex-col mr-6 border-r-2 border-gray-800">
      <div class="header p-4 flex flex-row justify-between items-center flex-none">
        <div class="w-16 h-16 relative flex flex-shrink-0" style={{ "filter": "invert(100%)" }}>
          <img class="rounded-full w-full h-full object-cover" alt="logo" src={logo} />
        </div>
        <p class="text-md font-bold hidden md:block group-hover:block">QuantumChat</p>

        <div>
          <a href="#" className="block rounded-full hover:bg-gray-700 bg-gray-800 w-10 h-10 p-2 hidden md:block group-hover:block" onClick={openModal}>
            <svg viewBox="0 0 24 24" className="w-full h-full fill-current">
              <path d="M12 4a1 1 0 0 1 1 1v6h6a1 1 0 0 1 0 2h-6v6a1 1 0 0 1-2 0v-6H5a1 1 0 0 1 0-2h6V5a1 1 0 0 1 1-1z"></path>
            </svg>
          </a>
          
          <CreateChatModal isOpen={isModalOpen} onClose={closeModal} users={users} />
        </div>

      </div>
      {/* create a router for group vs normal chat */}
      <Searchbar />
      <Chatlist />

    </div>
  )
}

export default Sidebar