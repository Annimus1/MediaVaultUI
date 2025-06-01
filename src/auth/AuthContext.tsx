/*
This file defines the AuthContext which provides authentication state and logout functionality
to the components in the application. It uses React's Context API to share
the authentication state across the component tree without prop drilling.
The context is initialized with default values, which can be overridden by a provider higher in the component tree.
*/
import React from "react";
import { useNavigate } from "react-router";

interface AuthContextType {
    token: string | null;
    isAuthenticated: boolean;
    login: (token: string) => void;
    updateToken: (token: string) => void;
    logout: () => void;
}

export const AuthContext = React.createContext<AuthContextType | null>(null);

interface AuthProviderProps {
    children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [token, setToken] = React.useState<string | null>(localStorage.getItem('token'));
    const [isAuthenticated,setIsAuthenticated] = React.useState<boolean>(!!token);
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

    const login = (token: string)=> {
        setToken(token);
        navigate('/');
    }

    const logout = React.useCallback(() => {
        setToken(null);
        setIsAuthenticated(false);
        navigate('/login');
    }, [navigate]);

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