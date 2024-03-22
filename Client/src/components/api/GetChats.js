import axios from "axios";

const API_URL = "/api/chats";

export const getChats = async (isGroupChat) => {
    const token = JSON.parse(localStorage.getItem("token"));
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    if (isGroupChat) {
        try {
            return await axios.get(API_URL + "/group", config)
                .then((response) => {
                    return response.data.chats;
                });
        } catch (error) {
            console.error(error);
        }
    }
    else {
        try {
            return await axios.get(API_URL + "/personal", config)
                .then((response) => {
                    return response.data.chats;
                });
        } catch (error) {
            console.error(error);
        }
    }
}