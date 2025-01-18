import React, { useContext, useEffect, useState } from 'react';
import { CaptainDataContext } from '../context/CaptainContext.jsx';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function CaptainProtectedWrapper({ children }) {
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    const { captain, setCaptain } = useContext(CaptainDataContext);


    useEffect(() => {
        if (!token) {
            navigate('/captain-login');
        } else {
            console.log('token in protect captain : ', token);
            axios.get(`${import.meta.env.VITE_BASE_URL}/captain/profile`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(response => {
                console.log("response:", response);
                if (response.status === 200) {
                    setCaptain(response.data.captain);
                    setLoading(false);
                }
            }).catch((err) => {
                console.log("error", err);
                localStorage.removeItem("token");
                navigate('/captain-login');
            });
        }
    }, [token, navigate, setCaptain]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            {children}
        </>
    );
}

export default CaptainProtectedWrapper;