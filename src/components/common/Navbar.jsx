"use client"
import Image from 'next/image'
import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaBars } from 'react-icons/fa'
import Link from 'next/link'
import { getAdminData, getRegistrationData } from '../../app/services/index';  // Import necessary services
import gsap from 'gsap';

const Navbar = () => {

  // Alert State
  const [isVisible, setIsVisible] = useState(true);

  // Function to handle closing the alert
  const closeAlert = () => {
    setIsVisible(false);
  };

  // Alert Animation
  useEffect(() => {
    const tl = gsap.timeline({ repeat: -1 });

    // Alert 1 appears
    tl.from('#alert1', {
      duration: 0.2,
      opacity: 1,
      display: 'none',
      ease: 'elastic.out'
    })
      .to('#alert1', {
        duration: 2,
        opacity: 1,
        display: 'flex',
        ease: 'elastic.in'
      })
      // Alert 1 disappears
      .to('#alert1', {
        duration: 0.2,
        opacity: 1,
        display: 'none',
        ease: 'elastic.out',
        delay: 1  // Pause before it disappears
      })
      // Alert 2 appears
      .from('#alert2', {
        duration: 0.2,
        opacity: 1,
        display: 'none',
        ease: 'elastic.out'
      })
      .to('#alert2', {
        duration: 2,
        opacity: 1,
        display: 'flex',
        ease: 'elastic.in'
      })
      // Alert 2 disappears
      .to('#alert2', {
        duration: 0.2,
        opacity: 1,
        display: 'none',
        ease: 'elastic.out',
        delay: 1  // Pause before it disappears
      })
      // Alert 3 appears
      .from('#alert3', {
        duration: 0.2,
        opacity: 1,
        display: 'none',
        ease: 'elastic.out'
      })
      .to('#alert3', {
        duration: 2,
        opacity: 1,
        display: 'flex',
        ease: 'elastic.in'
      })
      // Alert 3 disappears
      .to('#alert3', {
        duration: 0.2,
        opacity: 1,
        display: 'none',
        ease: 'elastic.out',
        delay: 1  // Pause before it disappears
      })
      // Alert 4 appears
      .from('#alert4', {
        duration: 0.2,
        opacity: 1,
        display: 'none',
        ease: 'elastic.out'
      })
      .to('#alert4', {
        duration: 2,
        opacity: 1,
        display: 'flex',
        ease: 'elastic.in'
      })
      // Alert 4 disappears
      .to('#alert4', {
        duration: 0.2,
        opacity: 1,
        display: 'none',
        ease: 'elastic.out',
        delay: 1  // Pause before it disappears
      })
      // Alert 1 disappears with delay
      .from('#alert1', {
        opacity: 1,
        display: 'none',
        ease: 'elastic.out',
        delay: 0.0000001 // Pause before it appears again 
      })
  }, []);

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
  const [navbarBg, setNavbarBg] = useState('bg-[#6e96cf]')

  // Function to toggle the drawer
  const toggleDrawer = () => {
    setIsOpen(!isOpen)
  }

  // Function to handle scroll for changing navbar background
  const handleScroll = () => {
    if (window.scrollY > 50) {
      setNavbarBg('bg-[#6e96cf] text-white')
    } else {
      setNavbarBg('bg-[#6e96cf] text-white')
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const handleCloseMenu = () => {
    setTimeout(() => {
      toggleDrawer();
    }, 300);
  }

  return (
    <>
      {/* Sticky Navbar with background change on scroll */}
      <nav className={`${navbarBg} text-white sticky top-0 z-50 transition-colors duration-300`}>

        {/* Alert */}
        {isVisible && (
          <div className="relative flex justify-between items-center bg-[#6e96cf] h-[17vh] md:h-[8vh] border-b-2 py-2">
            <div className="flex justify-between w-full items-center text-center">
              {/* Alert1 */}
              <div id='alert1' className="flex leading-6 lg:text-lg text-[#fff] font-rubik w-[90vw] md:[95vw] text-center justify-center">
                <Link href={'/register'}>
                  <div className='md:text-xl leading-8 font-semibold sm:text-lg md:pl-[5vw] pl-0 w-[85vw] md:w-full'>
                    Get ready for the <strong className='capitalize'>{(competition)}</strong> Competition at <strong>Footloosemonkey</strong>! Registrations are now
                    <span className="p-1 px-2 mx-[0.5rem] w-auto bg-red-500 dark:bg-[#181a1b] text-white lg:text-l font-rubik font-semibold rounded-md">
                      LIVE
                    </span>
                  </div>
                </Link>
              </div>

              {/* Alert2 */}
              <div id='alert2' className="flex leading-6 lg:text-lg text-[#fff] font-rubik w-[95vw] text-center justify-center" style={{ display: 'none' }}>
                <Link href={'/register'}>
                  <div className='md:text-xl leading-8 font-semibold sm:text-lg md:pl-[5vw] pl-0 w-[85vw] md:w-full'>
                    <strong>Footloose Monkey</strong> competition: <strong>25th Oct to 10th Nov</strong>! Showcase your talent and shine!
                  </div>
                </Link>
              </div>

              {/* Alert3 */}
              <div id='alert3' className="flex leading-6 lg:text-lg text-[#fff] font-rubik w-[95vw] text-center justify-center" style={{ display: 'none' }}>
                <Link href={'/register'}>
                  <div className='md:text-xl leading-8 font-semibold sm:text-lg md:pl-[5vw] pl-0 w-[82vw] md:w-full'>
                    Voting lines for <strong>Footloose Monkey</strong> open on <strong>11th November</strong>! Cast your vote now.
                  </div>
                </Link>
              </div>


              {/* Alert4 */}
              <div id='alert4' className="flex leading-6 lg:text-lg text-[#fff] font-rubik w-[95vw] text-center justify-center" style={{ display: 'none' }}>
                <Link href={'/register'}>
                  <div className='md:text-xl leading-8 font-semibold sm:text-lg md:pl-[5vw] pl-0 w-[85vw] md:w-full'>
                    Winners of the <strong>Footloose Monkey</strong> competition will be declared on <strong>20th November 2024</strong>! Stay tuned.
                  </div>
                </Link>
              </div>

              {/* Close Button */}
              <div
                aria-label="close"
                onClick={closeAlert}
                className='absolute w-[10vw] border-l-2 md:w-[5vw] h-[16.8vh] md:h-[7.8vh] flex justify-center items-center text-white bg-[#6e96cf] hover:bg-red-500 transition-colors transition-300 cursor-pointer right-0 top-0 text-2xl font-bold'
              >
                X
              </div>
            </div>
          </div>
        )}

        {/* Navbar */}
        <div className="flex flex-row items-center justify-between w-full px-6 py-4 h-[5rem] relative">
          {/* Logo */}
          <Link href='/'>
            <Image src="/logo.png" width={65} height={65} className="my-1 absolute top-0" alt="Logo" />
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
            className="fixed top-0 left-0 w-64 h-full bg-[#6e96cf] shadow-lg z-40 flex items-center"
          >
            <div className="flex flex-col items-start p-6 mt-24 font-bold">
              <button
                className="text-xl font-bold mb-6 text-white"
                onClick={toggleDrawer}
              >
                Close
              </button>
              <Link href="/" onClick={handleCloseMenu}>
                <h1 className="text-xl font-semibold hover:text-blue-300 transition-colors duration-200 mb-4">Home</h1>
              </Link>
              <Link href={`/${competition}`} onClick={handleCloseMenu}>
                <h1 className="text-xl font-semibold hover:text-blue-300 transition-colors duration-200 mb-4">Competition</h1>
              </Link>
              <Link href="/register" onClick={handleCloseMenu}>
                <h1 className="text-xl font-semibold hover:text-blue-300 transition-colors duration-200 mb-4">Register</h1>
              </Link>
              <Link href="/about" onClick={handleCloseMenu}>
                <h1 className="text-xl font-semibold hover:text-blue-300 transition-colors duration-200">About Us</h1>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navbar
