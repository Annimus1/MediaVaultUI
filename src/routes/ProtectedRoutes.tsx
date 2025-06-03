import React from 'react';
import { Navigate } from 'react-router';
import { AuthContext } from '../context/AuthContext';

interface ProtectedRouteProps {
    children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const authContext = React.useContext(AuthContext);
    const isAuthenticated  = authContext?.isAuthenticated;

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default ProtectedRoute;