import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

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
                toast.success("captain logout sucessfully :")
                navigate('/captain-login');
            }
        }).catch((err) => {
            console.log("error ", err);
            toast.error("captain logout failed")
        });
    }, [token, navigate]);

    return (
        <div>
            captain logout
        </div>
    );
}

export default CaptainLogout;