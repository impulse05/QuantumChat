import React from 'react'
import { useEffect ,useState} from 'react'

export default function SaveToken() {
    // save token from query to localstorage and redirect
    const [token, setToken] = useState('')

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('JWT');
        console.log(token);
        setToken(token);
        localStorage.setItem('token', JSON.stringify(token));
        // validateuser()
        window.location.href = '/'
    }, [])

    return (
        <div>
            <h1>Logging in ...</h1>
            {/* add loader */}
            
        </div>
    )
}
