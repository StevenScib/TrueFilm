import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

//handles users logging out by getting logout function from authcontext
const Logout = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    //once the user logouts they are sent to home page
    useEffect(() => {
        logout();
        navigate('/');
    }, [logout, navigate]);

    //displays message when logout is pressed but will rarely be shown as logging out is instantaneous
    return (
        <div>
            <p>Logging out</p>
        </div>
    );
};

export default Logout;
