import React from 'react'

function Searchbar() {
    return (
        <div class="relative pb-6 mx-2 mt-6">
            <label>
                <input class="rounded-full py-2 pr-6 pl-10 w-full border border-gray-800 focus:border-gray-700 bg-gray-800 focus:bg-gray-900 focus:outline-none text-gray-200 focus:shadow-md transition duration-300 ease-in" type="text" value="" placeholder="Search"/>
                    <span class="absolute top-0 left-0 mt-2 ml-3 inline-block">
                        <svg viewBox="0 0 24 24" class="w-6 h-6">
                            <path fill="#bbb" d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z"></path>
                        </svg>
                    </span>
            </label>
        </div>
    )
}

export default Searchbar