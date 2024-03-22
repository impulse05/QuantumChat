import React, { useState } from 'react'
import LeftSide from './LeftSide'
import RightSide from './RightSide'

function Quantumchat() {

  return (
    <div class="w-full h-screen antialiased text-gray-200 bg-[#1A202C] overflow-hidden">
      <div class="flex h-full">
        <LeftSide />
        <RightSide/>
      </div>
    </div>
  )
}

export default Quantumchat