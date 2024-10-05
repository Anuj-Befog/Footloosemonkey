"use client"
import Image from 'next/image'
import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaBars } from 'react-icons/fa'
import Link from 'next/link'
import { getAdminData, getRegistrationData } from '../../app/services/index';  // Import necessary services

const Navbar = () => {

  const [isVisible, setIsVisible] = useState(true);

  // Function to handle closing the alert
  const closeAlert = () => {
    setIsVisible(false);
  };

  const [datas, setDatas] = useState([])

  useEffect(() => {
    const fetchAdminData = async () => {
      const response = await getAdminData();
      if (response.success && response.data) {
        setDatas(response.data);
      }
    };
    fetchAdminData();
  }, []);

  const [competition, setCompetition] = useState('')

  // Load data from getRegistrationData()
  useEffect(() => {
    const fetchRegistrationData = async () => {
      const response = await getRegistrationData();
      if (response.success && response.data) {
        setCompetition(response.data[0].talent.toLowerCase());
      } else {
        console.error('Error fetching data:', response.message);
      }
    };

    fetchRegistrationData();
  }, []); // Empty dependency array ensures this runs only on initial render

  useEffect(() => {
  }, [competition]);

  const [isOpen, setIsOpen] = useState(false)
  const [navbarBg, setNavbarBg] = useState('bg-blue-500')

  // Function to toggle the drawer
  const toggleDrawer = () => {
    setIsOpen(!isOpen)
  }

  // Function to handle scroll for changing navbar background
  const handleScroll = () => {
    if (window.scrollY > 50) {
      setNavbarBg('bg-[#6e96cf] text-white')
    } else {
      setNavbarBg('bg-blue-500 text-white')
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <>
      {/* Sticky Navbar with background change on scroll */}
      <nav className={`${navbarBg} text-white sticky top-0 z-50 transition-colors duration-300`}>

        {/* Alert */}
        {isVisible && (
          <div className="flex justify-around items-center bg-[#6e96cf] border-b-2 p-2">
            <div className="xl:flex xl:flex-row xl:items-center py-2 xl:space-x-2 mx-auto text-center">
              {
                datas.map((item, index) => {
                  return (
                    <div key={index} className="leading-6 lg:text-lg text-[#fff] font-rubik flex">
                      <Link href={'/register'}>
                        <div className='text-xl font-semibold'>
                          Get ready for the <strong>{item.talent}</strong> Competition at <strong>Footloosemonkey</strong>! Registrations are now
                          <span className="p-1 px-2 mx-[0.5rem] w-auto bg-white dark:bg-[#181a1b] text-[#6e96cf] lg:text-l font-rubik font-semibold rounded-md">
                            LIVE
                          </span>
                        </div>
                      </Link>
                    </div>
                  )
                })
              }
              <button
                aria-label="close"
                onClick={closeAlert}
                className="rotate-45 text-4xl text-[#fff] relative left-[3rem] transition-transform duration-500 hover:rotate-[405deg]"  // 45deg + 360deg
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-plus border-2 border-white"
                >
                  <path d="M5 12h14"></path>
                  <path d="M12 5v14"></path>
                </svg>
              </button>

            </div>
          </div>
        )}

        {/* Navbar */}
        <div className="flex flex-row items-center justify-between w-full px-6 py-4">
          {/* Logo */}
          <Link href='/'>
            <Image src="/logo.png" width={45} height={45} className="my-1" alt="Logo" />
          </Link>

          {/* Hamburger Menu Icon for Small Screens */}
          <div className="lg:hidden">
            <button onClick={toggleDrawer} aria-label="Toggle Menu">
              <FaBars className="text-2xl" />
            </button>
          </div>

          {/* Nav Items - Hidden on Small Screens */}
          <div className="hidden lg:flex flex-row items-center gap-12">
            <Link href="/" className="text-xl font-semibold hover:underline transition-colors duration-200">Home</Link>
            <Link href={`/${competition}`} className="text-xl font-semibold hover:underline transition-colors duration-200">Competition</Link>
            <Link href="/register" className="text-xl font-semibold hover:underline transition-colors duration-200">Register</Link>
            <Link href="/about" className="text-xl font-semibold hover:underline transition-colors duration-200">About Us</Link>
          </div>
        </div>
      </nav>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            className="fixed top-0 left-0 w-64 h-full bg-[#004873] shadow-lg z-40"
          >
            <div className="flex flex-col items-start p-6 mt-20 font-bold">
              <button
                className="text-xl mb-6 text-white"
                onClick={toggleDrawer}
              >
                Close
              </button>
              <h1 className="text-xl font-semibold  hover:text-blue-300 transition-colors duration-200 mb-4">Home</h1>
              <h1 className="text-xl font-semibold  hover:text-blue-300 transition-colors duration-200 mb-4">Competition</h1>
              <h1 className="text-xl font-semibold  hover:text-blue-300 transition-colors duration-200 mb-4">Register</h1>
              <h1 className="text-xl font-semibold  hover:text-blue-300 transition-colors duration-200">About Us</h1>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navbar
