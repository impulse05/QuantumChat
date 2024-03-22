import axios from "axios";

const API_URL = "/api/chat";

export const getMessages = async (chat_id) => {
    try
    {
        const token = JSON.parse(localStorage.getItem("token"));
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        return await axios.get(API_URL + "/" + chat_id, config)
            .then((response) => {
                return response.data;
            });
    }
    catch (error)
    {
        console.error(error);
    }
}

export const sendMessage = async (chat_id, message) => {
    try
    {
        const token = JSON.parse(localStorage.getItem("token"));
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        return await axios.post("/api/message/" + chat_id, message, config)
            .then((response) => {
                return response.data;
            });
    }
    catch (error)
    {
        console.error(error);
    }
}

