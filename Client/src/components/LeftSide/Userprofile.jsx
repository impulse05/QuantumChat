import React from 'react'
import profilephoto from "../../assets/profile.png"
function Userprofile() {
    return (
        <div class="user-profile text-center">
            <div class="w-10 h-10 rounded-full overflow-hidden m-auto mt-16 border-2 border-blue-700 bg-white shadow-lg">
                <img src={profilephoto} alt="user" class="block object-cover w-full h-full" />
            </div>
            <div class="text-gray-800 mt-8">
                <span class="inline-block align-text-bottom">
                    <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" class="w-4 h-4"><path d="M19 9l-7 7-7-7"></path></svg>
                </span>
            </div>
        </div>
    )
}

export default Userprofile