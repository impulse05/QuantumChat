import React, { useState } from 'react'
import { sendMessage } from '../../api/messages';
import { useParams } from 'react-router-dom';
import EmojiPicker from 'emoji-picker-react';

function Messagebar({message,setMessage,handleSubmit,setShowPicker,showPicker}) {
  return (
    <form onSubmit={handleSubmit} class="flex flex-row items-center p-4">
      <div class="relative flex-grow">
       
          <input  onChange={(e)=>{setMessage(e.target.value)}} value={message} class="rounded-full py-2 pl-3 pr-10 w-full border border-gray-800 focus:border-gray-700 bg-gray-800 focus:bg-gray-900 focus:outline-none text-gray-200 focus:shadow-md transition duration-300 ease-in" type="text"  placeholder="Aa"/>
       
            <button type="button" onClick={()=>setShowPicker(pre=>!pre)} class="absolute top-0 right-0 mt-2 mr-3 flex flex-shrink-0 focus:outline-none block text-blue-600 hover:text-blue-700 w-6 h-6">
              <svg viewBox="0 0 20 20" class="w-full h-full fill-current">
                <path d="M10 20a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM6.5 9a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm7 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm2.16 3a6 6 0 0 1-11.32 0h11.32z"></path>
              </svg>
        
            </button>
       
      </div>
      <button  type="button" class="flex flex-shrink-0 focus:outline-none mx-2 block text-blue-600 hover:text-blue-700 w-6 h-6">
        <svg viewBox="0 0 20 20" class="w-full h-full fill-current">

          <path d="M10 0a10 10 0 0 1 7.07 2.93A10 10 0 0 1 20 10a10 10 0 0 1-2.93 7.07A10 10 0 0 1 10 20a10 10 0 0 1-7.07-2.93A10 10 0 0 1 0 10a10 10 0 0 1 2.93-7.07A10 10 0 0 1 10 0zm0 2a8 8 0 0 0-5.66 2.34A8 8 0 0 0 2 10a8 8 0 0 0 2.34 5.66A8 8 0 0 0 10 18a8 8 0 0 0 5.66-2.34A8 8 0 0 0 18 10a8 8 0 0 0-2.34-5.66A8 8 0 0 0 10 2zm1 4v4h4v2h-4v4h-2v-4H5v-2h4V6h2z">

          </path>
        </svg>

      </button>
    </form>
  )
}

export default Messagebar