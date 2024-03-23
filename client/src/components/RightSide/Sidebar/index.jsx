import React, { useEffect, useState } from 'react'
import Searchbar from './Searchbar'
import Chatlist from './Chatlist'
import logo from "../../../assets/logo.png"
import { getChats } from '../../api/GetChats';
import { Routes, Route } from 'react-router-dom';
import { useChat } from '../../../Context/chatProvider';

function Sidebar() {



  const {  filteredChats } = useChat();

 

  return (
    <div class="sidebar hidden lg:flex w-3/12 flex-2 flex-col mr-6 border-r-2 border-gray-800">
      <div class="header p-4 flex flex-row justify-between items-center flex-none">
        <div class="w-16 h-16 relative flex flex-shrink-0" style={{ "filter": "invert(100%)" }}>
          <img class="rounded-full w-full h-full object-cover" alt="ravisankarchinnam" src={logo} />
        </div>
        <p class="text-md font-bold hidden md:block group-hover:block">QuantumChat</p>
        <a href="#" class="block rounded-full hover:bg-gray-700 bg-gray-800 w-10 h-10 p-2 hidden md:block group-hover:block">
          <svg viewBox="0 0 24 24" class="w-full h-full fill-current">
            <path d="M6.3 12.3l10-10a1 1 0 0 1 1.4 0l4 4a1 1 0 0 1 0 1.4l-10 10a1 1 0 0 1-.7.3H7a1 1 0 0 1-1-1v-4a1 1 0 0 1 .3-.7zM8 16h2.59l9-9L17 4.41l-9 9V16zm10-2a1 1 0 0 1 2 0v6a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6c0-1.1.9-2 2-2h6a1 1 0 0 1 0 2H4v14h14v-6z"></path>
          </svg>
        </a>
      </div>
      {/* create a router for group vs normal chat */}
        <Searchbar />
        <Chatlist  />
       
    </div>
  )
}

export default Sidebar