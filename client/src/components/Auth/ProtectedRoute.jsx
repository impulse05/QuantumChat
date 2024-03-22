import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { getCurrentUser } from './auth'
function ProtectedRoute({ children }) {
    const currentUser = getCurrentUser();
    const location = useLocation();
    // console.log(location);
    return (
        <>
            {
                currentUser ? children : <Navigate to={{ pathname: '/login', state: { from: location } }} />
            }
        </>
    )
}

export default ProtectedRoute