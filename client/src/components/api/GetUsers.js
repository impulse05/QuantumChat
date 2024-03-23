import axios from "axios";

export const getUsers = async () => {
    try
    {
        const token = JSON.parse(localStorage.getItem("token"));
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        return await axios.get("/api/users" , config)
            .then((response) => {
                return response.data.users;
            });
    }
    catch (error)
    {
        console.error(error);
    }
}