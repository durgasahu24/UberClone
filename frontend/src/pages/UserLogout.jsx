import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function UserLogout() {
    const token = localStorage.getItem("token");
    console.log('logout token', token);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_BASE_URL}/users/logout`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((response) => {
            console.log("response in logout:", response);
            if (response.status === 200) {
                localStorage.removeItem('token');
                navigate('/login');
            }
        }).catch((error) => {
            console.log("Error during logout:", error);
        });
    }, [navigate, token]);

    return (
        <div>
            User logout
        </div>
    );
}

export default UserLogout;