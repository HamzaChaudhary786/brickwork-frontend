import React from 'react';
import { Navigate } from 'react-router-dom';

interface PrivateRouteProps {
    isAuthenticated: boolean;
    children: JSX.Element;
}

export const PrivateRoute = ({ isAuthenticated, children }: PrivateRouteProps) => {
    return isAuthenticated ? children : <Navigate to="/login" replace />;
};
