import axios from "axios";
export const CreateChat = async (data) => {
    console.log(data);
    const token = JSON.parse(localStorage.getItem("token"));
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-type":"application/json"
        },}
  
        try {
            return await axios.post( "/api/chat",data,config)
                .then((response) => {
                    return response.data.chat;
                });
        } catch (error) {
            console.error(error);
        }

}
