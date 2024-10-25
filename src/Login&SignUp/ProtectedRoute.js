import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../UserContext';

const ProtectedRoute = ({ element: Component, ...rest }) => {
    const { user } = useContext(UserContext);

    return user ? <Component {...rest} /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
