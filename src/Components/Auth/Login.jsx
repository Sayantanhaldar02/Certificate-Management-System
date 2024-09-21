import React, { useEffect, useState } from 'react'
import {  useLoginMutation } from '../../Reducers/apiReducers/authApi/authApi'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import loginimage from '../../assets/login.svg';

export function Login() {
    const [userDetails, setUserDetails] = useState({
        email: '',
        password: ''
    })

    const handelOnchnage = (e) => {
        setUserDetails({ ...userDetails, [e.target.name]: e.target.value })
    }

    const navigate = useNavigate()
    const user = useSelector(state=>state.user.userData)
    const [userLogin, loginResponse] = useLoginMutation()
    const handelSubmit = async (e) => {
        e.preventDefault();
        await userLogin(userDetails).unwrap();
        // console.log(userDetails)
    };

    useEffect(()=>{
        if(loginResponse.isSuccess){
            toast.success("login successful");
            user && user.role === 'admin' ? navigate("/admin", {replace: true}) : navigate("/", {replace: true})
        }
        if(loginResponse.isError){
            toast.error(loginResponse.error.data.error);
        }
    },[loginResponse.isSuccess, loginResponse.isError, loginResponse.error])
    return (
        <>
            <section className='h-full'>
                <div className="grid grid-cols-1 lg:grid-cols-2  border-2">
                    <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
                        <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
                            <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl">Sign <span className='text-[#fd715d]'>in</span></h2>
                            <p className="mt-2 text-sm text-gray-600">
                                Don&apos;t have an account?{' '}
                                <Link
                                    to="/register"
                                    className="font-semibold text-black transition-all duration-200 hover:underline"
                                >
                                    Create a free account
                                </Link>
                            </p>
                            <form onSubmit={handelSubmit} className="mt-8">
                                <div className="space-y-5">
                                    <div>
                                        <label htmlFor="" className="text-base font-medium text-gray-900">
                                            Email address
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                                type="email"
                                                name='email'
                                                id='email'
                                                placeholder="Email"
                                                value={userDetails.email}
                                                onChange={handelOnchnage}
                                            ></input>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex items-center justify-between">
                                            <label htmlFor="" className="text-base font-medium text-gray-900">
                                                Password
                                            </label>
                                        </div>
                                        <div className="mt-2">
                                            <input
                                                className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                                type="password"
                                                name='password'
                                                id='password'
                                                placeholder="Password"
                                                value={userDetails.password}
                                                onChange={handelOnchnage}
                                            ></input>
                                        </div>
                                    </div>
                                    <div>
                                        <button
                                            type="submit"
                                            className="inline-flex w-full items-center justify-center rounded-md bg-[#fd715d] px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80 transition-all"
                                        >
                                            Sign in
                                            {/* Get started <ArrowRight className="ml-2" size={16} /> */}
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="h-[100%] w-full ">
                        <img
                            className="mx-auto w-[90%] object-cover"
                            src={loginimage}
                            alt=""
                        />
                    </div>
                </div>
            </section>
        </>

    )
}




