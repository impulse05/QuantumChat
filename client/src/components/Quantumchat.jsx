import React, { useState,useEffect } from 'react'
import { validateuser } from './api/auth';
import LeftSide from './LeftSide'
import RightSide from './RightSide'

function Quantumchat() {
  useEffect(() => {
    validateuser();
  }, [])

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