import axios from "axios";
export const CreateChat =  (data) => {
    console.log(data);
    const token = JSON.parse(localStorage.getItem("token"));
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-type":"application/json"
        },}
  
            return axios.post( "/api/chat",data,config)
                .then((response) => {
                    return response.data.chat;
                });
}

export const getChats =  () => {
  const token = JSON.parse(localStorage.getItem("token"));
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

    return  axios.get("/api/chats", config).then((response) => {
      return response.data.chats;
    });
};
