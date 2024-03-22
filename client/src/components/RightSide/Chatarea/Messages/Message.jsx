import React from 'react'

function Message({ data, isme = false }) {

    const { attachment, content, createdAt, sender } = data;


    return (
        <>
            <div class={`flex flex-row ${isme ? 'justify-end' : 'justify-start'}`}>
                {
                    !isme && <>
                        <div class="w-8 h-8 relative flex flex-shrink-0 mr-3 ml-4 mt-6">
                            <img class="shadow-md rounded-full w-full h-full object-cover" src={sender.picture || ''} alt="" />
                        </div>
                        <div class="messages text-sm text-gray-700 grid grid-flow-row gap-3">
                            <div class="flex items-center group">
                                <p class="px-6 py-3 rounded-t-full rounded-r-full bg-gray-800 max-w-xs lg:max-w-md text-gray-200">{content}</p>

                            </div>
                        </div>
                    </>
                }

                {isme && <>
                    <div class="messages text-sm text-white grid grid-flow-row gap-3">
                        <div class="flex items-center flex-row-reverse group">
                            <p class="px-6 py-3 rounded-t-full rounded-l-full bg-blue-700 max-w-xs lg:max-w-md">{content}</p>

                        </div>
                    </div>
                    <div class="w-8 h-8 relative flex flex-shrink-0 mr-4 ml-3 mt-6">
                        <img class="shadow-md rounded-full w-full h-full object-cover" src={sender.picture || ''} alt="" />
                    </div>
                </>}


            </div>

        </>

    )
}

export default Message