import React from 'react'
import { Link } from 'react-router-dom';

const Login = () => {
    const handleFormSubmit = (e) => {
        e.preventDefault();

        let email = e.target.elements.email?.value;
        let password = e.target.elements.password?.value;

        console.log(email, password);
    };
    return (
        <div className='flex justify-center items-center w-full h-[100%]'>
            <div className='w-[30%]'>
                <h1 className='text-[30px] font-medium mt-[50px]'>Login Page</h1>
                <form onSubmit={handleFormSubmit} className='mt-[20px]'>
                    <div className='flex'>
                        <input
                            type="text"
                            name="email"
                            className="block w-full rounded-md border-0 py-1.5 pl-4 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-none sm:text-sm sm:leading-6 mb-[10px]"
                            placeholder="Enter Your Email"
                        />
                    </div>
                    <div className='flex'>
                        <input
                            type="password"
                            name="password"
                            className="block w-full rounded-md border-0 py-1.5 pl-4 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-none sm:text-sm sm:leading-6 my-[10px]"
                            placeholder="Enter Your Password"
                        />
                    </div>
                    <div className='mt-[10px]'>
                        <button type="submit"
                            className="flex w-full justify-center rounded-md bg-gray-800 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
                        >Login</button>
                    </div>
                </form>
                <div className='mt-[15px]'>
                    <Link to='/signup' className='text-[dodgerblue] ml-[10px]' >Go to Signup</Link>
                </div>
            </div>
        </div>
    );

}

export default Login
