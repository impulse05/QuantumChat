import axios from "axios";



export const getChats = async () => {
    const token = JSON.parse(localStorage.getItem("token"));
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },}
  
        try {
            return await axios.get( "/api/chats", config)
                .then((response) => {
                    return response.data.chats;
                });
        } catch (error) {
            console.error(error);
        }

}
