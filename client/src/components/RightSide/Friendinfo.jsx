import React from 'react'

function Friendinfo({ isFriendinfo }) {
    let visible_class = "hidden"
    if (isFriendinfo)
        visible_class = ""
    return (
        <div class={`${visible_class} w-1/5 mt-10`}>

            <div class="photo-wrapper p-2">
                <img class="w-32 h-32 rounded-full mx-auto" src="https://www.gravatar.com/avatar/2acfb745ecf9d4dccb3364752d17f65f?s=260&d=mp" alt="John Doe" />
            </div>
            <div class="p-2">
                <h3 class="text-center text-xl text-gray-200 font-medium leading-8">Lucky Kushwaha</h3>
                <div class="text-center text-gray-400 text-xs font-semibold">
                    <p>Web Developer</p>
                </div>
                <table class="text-xs my-3 mx-auto">
                    <tbody>
                        <tr>
                            <td class="px-2 py-2 text-gray-500 font-semibold">Phone</td>
                            <td class="px-2 py-2">+91 8319717645</td>
                        </tr>
                        <tr>
                            <td class="px-2 py-2 text-gray-500 font-semibold">Email</td>
                            <td class="px-2 py-2">Lucky@gmail.com</td>
                        </tr>
                    </tbody></table>

            </div>
        </div>
    )
}

export default Friendinfo