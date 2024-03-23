import React,  { useState } from 'react'
import Topbar from './Topbar'
import Chatarea from './Chatarea'
import Sidebar from './Sidebar'
import Friendinfo from './Friendinfo'
import { Route, Routes } from 'react-router-dom'


function RightSide() {
  const [isFriendinfo, setFriendinfo] = useState(false);
  

  const togglePanel = () => {
    setFriendinfo(!isFriendinfo);
  };

  return (
    <div class="flex-1 w-full h-full">
      <div class="main-body  h-full flex flex-col">
        {/* <Topbar /> */}
        {/* bottom */}
        <div class="main flex-1 flex flex-col">
          {/* <div class="hidden lg:block heading flex-2">
            <h1 class="text-3xl text-gray-700 mb-4">Chat</h1>
          </div> */}
          <div class="flex-1 flex h-full">
            <Sidebar/>
            <Routes>
              <Route path="/chats/:id" element={<Chatarea togglePanel={togglePanel}/>} />
            </Routes>


            <Friendinfo isFriendinfo={isFriendinfo}/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RightSide