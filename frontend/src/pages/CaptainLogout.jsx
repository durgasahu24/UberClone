import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CaptainLogout() {
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_BASE_URL}/captain/logout`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((response) => {
            if (response.status === 200) {
                console.log("response");
                localStorage.removeItem("token");
                navigate('/captain-login');
            }
        }).catch((err) => {
            console.log("error ", err);
        });
    }, [token, navigate]);

    return (
        <div>
            captain logout
        </div>
    );
}

export default CaptainLogout;