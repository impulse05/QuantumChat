import axios from "axios";

const API_URL = "http://localhost:8080/api/message";

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
                return response.data.messages;
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
        return await axios.post(API_URL + "/" + chat_id, message, config)
            .then((response) => {
                return response.data;
            });
    }
    catch (error)
    {
        console.error(error);
    }
}

