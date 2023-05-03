import React, { useEffect, useState } from 'react'
import axios from '../axios'
import { useNavigate } from 'react-router-dom'
import jwt from 'jwt-decode' // import dependency

const Home = () => {
    const [roleList, setRoleList] = useState([])
    const [id, setId] = useState(null)

    const navigate = useNavigate()

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            navigate("/login")
        } else {
            const user = jwt(localStorage.getItem('token'));
            axios.post(`/role/home`, { id: user.data._id }, {
                headers: {
                    'Content-Type': 'application/json',
                }
            })
                .then((res) => {
                    setRoleList(res.data)
                })
                .catch((error) => {
                    console.log(error);
                })
        }
    }, [])

    const Logout = () => {
        localStorage.removeItem('token')
        navigate("/login")
    }

    return (
        <div>
            <button className='absolute right-10 top-5 bg-black text-white rounded-sm px-5 py-2' onClick={Logout}>Logout</button>
            {roleList && roleList.map((data) => {
                return (
                    <div key={data._id}>
                        <h1>{data.name}</h1>
                    </div>
                )
            })}
        </div>
    )
}

export default Home
