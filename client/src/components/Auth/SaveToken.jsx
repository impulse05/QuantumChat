import React from 'react'
import { useEffect ,useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { getCurrentUser } from './auth';

export default function SaveToken() {
    // save token from query to localstorage and redirect
    const navigate = useNavigate();
    const handleSaveToken = async ()=>{
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('JWT');
        console.log(token);
        localStorage.setItem('token', JSON.stringify(token));
        await getCurrentUser();
        window.location.href = '/';
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
