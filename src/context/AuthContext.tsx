/**
 * This file defines the AuthContext which provides authentication state and functionality
 * to the components in the application. It uses React's Context API to share
 * the authentication state across the component tree without prop drilling.
 * The context is initialized with default values, which can be overridden by a provider higher in the component tree.
 */

import React from "react";
import { useNavigate } from "react-router";

/**
 * AuthContextType defines the shape of the authentication context.
 * @typedef {Object} AuthContextType
 * @property {string|null} token - The authentication token, or null if not authenticated.
 * @property {boolean} isAuthenticated - Whether the user is authenticated.
 * @property {(token: string) => void} login - Function to log in and set the token.
 * @property {(token: string) => void} updateToken - Function to update the token.
 * @property {Function} logout - Function to log out and clear authentication state.
 */
interface AuthContextType {
    token: string | null;
    isAuthenticated: boolean;
    login: (token: string) => void;
    updateToken: (token: string) => void;
    logout: Function;
}

/**
 * The AuthContext provides authentication state and actions to its consumers.
 * @type {React.Context<AuthContextType | null>}
 */
export const AuthContext = React.createContext<AuthContextType | null>(null);

/**
 * Props for the AuthProvider component.
 * @typedef {Object} AuthProviderProps
 * @property {React.ReactNode} children - Child components to be wrapped by the provider.
 */
interface AuthProviderProps {
    children: React.ReactNode;
}

/**
 * AuthProvider component that supplies authentication state and actions to its children via context.
 * @param {AuthProviderProps} props - The props for the provider.
 * @returns {JSX.Element} The provider component wrapping its children.
 */
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [token, setToken] = React.useState<string | null>(localStorage.getItem('token'));
    const [isAuthenticated, setIsAuthenticated] = React.useState<boolean>(!!token);
    const navigate = useNavigate();

    React.useEffect(() => {
        if (token) {
            localStorage.setItem('token', token);
            setIsAuthenticated(true);
        } else {
            localStorage.removeItem('token');
            setIsAuthenticated(false);
        }
    }, [token]); 

    /**
     * Logs in the user by setting the token and navigating to the home page.
     * @param {string} token - The authentication token.
     */
    const login = (token: string) => {
        setToken(token);
        navigate('/');
    }

    /**
     * Logs out the user by clearing the token and navigating to the login page.
     */
    const logout = React.useCallback(() => {
        setToken(null);
        setIsAuthenticated(false);
        navigate('/login');
    }, [navigate]);

    /**
     * Updates the authentication token and stores it in localStorage.
     * @param {string} newToken - The new authentication token.
     */
    const updateToken = (newToken: string) => {
        setToken(newToken);
        localStorage.setItem('token', newToken);
    };

    const value: AuthContextType | null = {
        token,
        isAuthenticated: !!token,
        login,
        logout,
        updateToken
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};