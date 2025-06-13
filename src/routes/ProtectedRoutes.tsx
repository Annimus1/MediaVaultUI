import React from 'react';
import { Navigate } from 'react-router';
import { AuthContext } from '../context/AuthContext';

/**
 * Props for the ProtectedRoute component.
 * @typedef {Object} ProtectedRouteProps
 * @property {React.ReactNode} children - The child components to render if authenticated.
 */
interface ProtectedRouteProps {
    children: React.ReactNode;
}

/**
 * ProtectedRoute component restricts access to its children based on authentication state.
 * If the user is not authenticated, it redirects to the login page.
 *
 * @param {ProtectedRouteProps} props - The props for the component.
 * @returns {JSX.Element} The protected children or a redirect to login.
 */
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const authContext = React.useContext(AuthContext);
    const isAuthenticated  = authContext?.isAuthenticated;

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default ProtectedRoute;