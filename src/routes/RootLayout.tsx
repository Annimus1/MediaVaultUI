// src/components/RootLayout.tsx (crea este nuevo archivo)
import React from 'react';
import { AuthProvider } from '../context/AuthContext';
import { Outlet } from 'react-router';

const RootLayout: React.FC = () => {
    return (
        <AuthProvider>
            <Outlet />
        </AuthProvider>
    );
};

export default RootLayout;