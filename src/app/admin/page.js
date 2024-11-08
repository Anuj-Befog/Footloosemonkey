"use client"

import React, { useEffect, useState } from 'react'
import AdminHomeView from '../../components/admin-view/home'
import { login } from '../services/index'
import Login from '../../components/admin-view/login'
import { toast } from 'react-toastify'

const initialLoginFormData = {
    username: '',
    password: '',
}


const menuItems = [
    { id: 'home', label: 'Home' },
]

const AdminView = () => {
    const [currentSelectedTab, setCurrentSelectedTab] = useState('/')

    const [authUser, setAuthUser] = useState(false)
    const [loginFormData, setLoginFormData] = useState(initialLoginFormData)
    const [isNavbarOpen, setIsNavbarOpen] = useState(false);

    useEffect(() => {
        setAuthUser(JSON.parse(sessionStorage.getItem('authUser')))
    }, [])

    async function handleLogin() {
        if (!loginFormData.username || !loginFormData.password) {
            toast.error('Please fill in all fields')
            return;
        }
        try {
            const res = await login(loginFormData)
            if (res?.success) {
                setAuthUser(true)
                toast.success(res?.message || 'Login successful')
                sessionStorage.setItem('authUser', JSON.stringify(true))
            }
            else {
                toast.error(res?.message || 'Login failed')
            }
        } catch (error) {
            toast.error(res?.message || 'Login failed')
        }
    }

    function handleLogout() {
        const confirmLogout = window.confirm('Are you sure you want to logout?');
        if (confirmLogout) {
            setAuthUser(false);
            sessionStorage.removeItem('authUser');
        }
        toast.success('Logout successful');
    }

    if (!authUser) return <Login formData={loginFormData} handleLogin={handleLogin} setFormData={setLoginFormData} />

    return (
        <>
            {/*  Navbar */}
            <div className='border-b-2 border-gray-300'>
                <nav className='flex items-center justify-between p-4 bg-gray-100'>
                    <div className='flex items-center'>
                        <h1 className='text-2xl font-bold text-black'>Admin Panel</h1>
                    </div>
                    <button className='text-xl font-bold text-black md:hidden' onClick={() => setIsNavbarOpen(!isNavbarOpen)}>
                        ☰
                    </button>

                    <div className='hidden items-center md:flex space-x-6'>
                        {menuItems.map((item, index) => (
                            <button
                                key={index}
                                type='button'
                                onClick={() => setCurrentSelectedTab(item.id)}
                                className='p-4 font-bold text-xl text-black hover:text-blue-500'
                            >
                                {item.label}
                            </button>
                        ))}

                        {/* Logout */}
                        <button
                            onClick={handleLogout}
                            className="group flex items-center justify-start w-11 h-11 bg-red-600 rounded-full cursor-pointer relative overflow-hidden transition-all duration-200 shadow-lg hover:w-32 hover:rounded-lg active:translate-x-1 active:translate-y-1"
                        >
                            <div
                                className="flex rounded-full items-center justify-center w-full transition-all duration-300 group-hover:justify-start group-hover:px-3"
                            >
                                <svg className="w-4 h-4" viewBox="0 0 512 512" fill="white">
                                    <path
                                        d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"
                                    ></path>
                                </svg>
                            </div>
                            <div
                                className="absolute rounded-full right-5 transform translate-x-full opacity-0 text-white text-lg font-semibold transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
                            >
                                Logout
                            </div>
                        </button>
                    </div>

                    {/* Mobile Menu */}
                    <div className={`fixed inset-0 bg-gray-900 bg-opacity-75 z-40 transition-opacity duration-300 ${isNavbarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'} md:hidden`}>
                        <div className='fixed inset-0 bg-red-500 flex justify-center items-center flex-col space-y-4'>
                            <button className='text-4xl font-bold text-white' onClick={() => setIsNavbarOpen(false)}>X</button>
                            {menuItems.map((item, index) => (
                                <button
                                    key={index}
                                    type='button'
                                    onClick={() => { setCurrentSelectedTab(item.id); setIsNavbarOpen(false); }}
                                    className='block w-full p-4 font-bold text-3xl text-white'
                                >
                                    {item.label}
                                </button>
                            ))}
                            <button
                                onClick={() => { setAuthUser(false); sessionStorage.removeItem('authUser'); setIsNavbarOpen(false); }}
                                className='block w-full p-4 font-bold text-3xl text-white'
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </nav>
            </div>
            {/* Content */}
            <div className='bg-gray-100'>
                <h1 className="text-4xl pt-4 text-center font-extrabold text-gray-800 md:text-5xl lg:text-6xl mb-4">
                    Customize Contest
                </h1>
                <AdminHomeView />
            </div>
        </>
    )
}

export default AdminView