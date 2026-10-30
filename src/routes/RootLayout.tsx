// src/components/RootLayout.tsx (crea este nuevo archivo)
import React from 'react';
import { AuthProvider } from '../context/AuthContext';
import { RecommendationsProvider } from '../context/RecommendationsContext';
import { Outlet } from 'react-router';

const RootLayout: React.FC = () => {
    return (
        <AuthProvider>
            <RecommendationsProvider>
                <Outlet />
            </RecommendationsProvider>
        </AuthProvider>
    );
};

export default RootLayout;
