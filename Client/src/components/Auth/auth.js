 import axios from "axios";

const API_URL = "http://localhost:8080/api";

const register = async (name, email, phone, picture, password) => {
    return axios.post(API_URL + "/signup", {
        name,
        email,
        phone,
        picture,
        password,
    })
    .then((response) => {
        if(response.data?.data?.token){
            localStorage.setItem("token", JSON.stringify(response.data.data.token));
            localStorage.setItem("user", JSON.stringify(response.data.data.user));
        }
        return response.data.data;
    });
}

const login = async (email,password)=>{
    return axios.post(API_URL + "/login", { // "abc"
        email,
        password
    }).then((response)=>{
        if(response.data?.data?.token){
            localStorage.setItem("token", JSON.stringify(response.data.data.token));
            localStorage.setItem("user", JSON.stringify(response.data.data.user));
        }
        return response.data.data;
    });
}

const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
};

const validateuser = () => {
    const token = JSON.parse(localStorage.getItem("token"));
    if(token){
    return  axios.get(API_URL + "/myprofile",{
            headers: {
                Authorization: `Bearer ${token}`,
            },
        
        }).then((response)=>{
            if(response.data){
                localStorage.setItem("user", JSON.stringify(response.data));
            }
            return response.data;
        }).catch((error)=>{
            localStorage.removeItem("user");
            localStorage.removeItem("token");
            window.location.href = "/login";
            return false;
        });
    }

}

const getCurrentUser = () => {
    const token = JSON.parse(localStorage.getItem("token"));
    const user = JSON.parse(localStorage.getItem("user"));
    if( token && user){
        return user;
    }
    return null;
};



const saveToken = (token) => {
    localStorage.setItem("token", JSON.stringify(token));
}


export {
    register,
    login,
    logout,
    getCurrentUser,
    saveToken,
    validateuser
};