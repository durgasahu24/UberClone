import React, { useContext, useEffect, useState } from 'react'
import { UserDataContext } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';

function UserProtectedWrapper({ children }) {

    console.log("welcome to protected wroute user protected routed ")


    const token = localStorage.getItem('jwt');
    const navigate = useNavigate();
    const { user, setUser } = useContext(UserDataContext)
    const [loading, setLoading] = useState(true);

    console.log("token  in protected route ", token)

    useEffect(() => {
        if (!token) {
            navigate('/login');
        }
        else {
            const response = axios.get(`${import.meta.env.VITE_BASE_URL}/users/profile`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then((response) => {
                if (response.status === 200) {
                    console.log("response in wrpatere ", response);
                    console.log("response in wrpatere ", response.data);
                    setUser(response.data);
                    setLoading(false)
                }
            }).catch((err) => {
                console.log(err)
                navigate('/login')
            })


        }
    }, [token, setUser, navigate])

    if (loading) {
        return <div>Loading ... </div>
    }

    return (
        <>
            {children}
        </>
    )
}

export default UserProtectedWrapper
