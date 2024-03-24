 import axios from "axios";
 import { ToastContainer, toast } from 'react-toastify';

const API_URL = "/api";

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
    }).catch((error)=>{
        toast(error?.response?.data?.error || "Something went wrong")
    })
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
        
        window.location.reload();
        return response.data.data;
    })
    .catch((error)=>{
        toast(error?.response?.data?.error || "Something went wrong")
    })
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
        toast(error?.response?.data?.error || "Something went wrong")

            localStorage.removeItem("user");
            localStorage.removeItem("token");
            
            return false;
        });
    } else{
        console.log("No token found");
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

const sendEmailforPasswordReset = (email) => {
    return axios.post( "/api/forgotpassword", {
        email
    }).then((response)=>{
        return response.data;
    }).catch((error)=>{
        toast(error?.response?.data?.error || "Something went wrong")
    })
}

const resetPassword = (password, token) => {
    console.log(password, token)
    return axios.post( "/api/resetpassword", {
        password,token
    }).then((response)=>{
        return response.data;
    }
    ).catch((error)=>{
        toast(error?.response?.data?.error || "Something went wrong")
    })
}

export {
    register,
    login,
    logout,
    getCurrentUser,
    saveToken,
    validateuser,
    sendEmailforPasswordReset,
    resetPassword
};