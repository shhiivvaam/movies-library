import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { AuthContext } from '../../../context/AuthContext';

export default function PrivateRoute({ children }) {
    const { user } = useContext(AuthContext);

    if (user !== null) {
        return children;
    }
    else {
        return <Navigate to="/signin" />
    }
}
