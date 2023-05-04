import React, { useEffect, useState } from 'react'
import axios from '../axios'
import { useNavigate } from 'react-router-dom'
import jwt from 'jwt-decode' // import dependency

const Home = () => {
    const [roleList, setRoleList] = useState([])

    const navigate = useNavigate()

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            navigate("/login")
        } else {
            const user = jwt(localStorage.getItem('token'));
            // console.log(user)
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
            {roleList.length !== 0 && <h1 className='font-[500] text-[30px] ml-5 mt-5'>Hello {roleList[0].name}</h1>}
            {roleList.length !== 0 &&
                <>
                    <div key={roleList[0]._id} className='ml-10 mt-5'>
                        <h1 className='font-[500] flex items-center'><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 mr-1">
                            <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-.53 14.03a.75.75 0 001.06 0l3-3a.75.75 0 10-1.06-1.06l-1.72 1.72V8.25a.75.75 0 00-1.5 0v5.69l-1.72-1.72a.75.75 0 00-1.06 1.06l3 3z" clipRule="evenodd" />
                        </svg>

                            {roleList[0].role}</h1>
                    </div>
                </>}
            <>
                {roleList.length > 1 && roleList.map((data, index) => {
                    return (
                        <>
                            {index !== 0 &&
                                <div key={data._id} className=' mt-1'>
                                    <h1 className='kalp'><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 mr-1">
                                        <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm4.28 10.28a.75.75 0 000-1.06l-3-3a.75.75 0 10-1.06 1.06l1.72 1.72H8.25a.75.75 0 000 1.5h5.69l-1.72 1.72a.75.75 0 101.06 1.06l3-3z" clipRule="evenodd" />
                                    </svg>
                                        {data.role}</h1>
                                </div>
                            }
                        </>
                    )
                })}
            </>
        </div>
    )
}

export default Home
