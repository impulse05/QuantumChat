import axios from "axios";

const API_URL = "/api/chat";

export const getMessages = (chat_id) => {
        const token = JSON.parse(localStorage.getItem("token"));
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        return axios.get(API_URL + "/" + chat_id, config)
            .then((response) => {
                return response.data;
            });
}

export const sendMessage =  (chat_id, message) => {
        const token = JSON.parse(localStorage.getItem("token"));
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        return axios.post("/api/message/" + chat_id, message, config)
            .then((response) => {
                return response.data;
            });
}
