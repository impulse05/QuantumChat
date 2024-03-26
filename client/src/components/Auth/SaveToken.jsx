import React from 'react'
import { useEffect ,useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { useChat } from '../../Context/chatProvider';
import { getCurrentUser, validateuser } from '../api/auth';

export default function SaveToken() {
    // save token from query to localstorage and redirect
    const {setRefresh} = useChat();
    const navigate = useNavigate();
    const handleSaveToken = async ()=>{
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('JWT');
        console.log(token);
        localStorage.setItem('token', JSON.stringify(token));
       
        await validateuser();
        await getCurrentUser();
        setRefresh((prev)=>!prev);
        setTimeout(() => {
            setRefresh((prev)=>!prev);
            // navigate('/');
            window.location = "/";
            setRefresh((prev)=>!prev);
        }, 1000);
    }

    useEffect(() => {
        handleSaveToken();
    }, [])

    return (
        <div>
            <h1>Logging in ...</h1>
            {/* add loader */}

        </div>
    )
}
