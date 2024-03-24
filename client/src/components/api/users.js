import axios from "axios";

export const getUsers =  () => {
        const token = JSON.parse(localStorage.getItem("token"));
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        return  axios.get("/api/users" , config)
            .then((response) => {
                return response.data.users;
            });
}