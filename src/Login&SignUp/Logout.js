import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../UserContext';

const Logout = () => {
    const { setUser } = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        setUser(null); // Clear the user context
        navigate('/login', { replace: true });
        window.history.pushState(null, '', window.location.href); // Prevent back navigation
    }, [setUser, navigate]);

    return null;
};

export default Logout;
