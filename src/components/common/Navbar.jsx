"use client"
import Image from 'next/image'
import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaBars } from 'react-icons/fa'
import Link from 'next/link'
import { getAdminData, getRegistrationData } from '../../app/services/index';  // Import necessary services
import gsap from 'gsap';

const Navbar = () => {

  // Alert State
  const [isVisible, setIsVisible] = useState(true);
  // Toggle Mobile Navbar State
  const [isOpen, setIsOpen] = useState(false)

  // Ref for mobile navbar
  const mobileNavRef = useRef(null);

  // Ref for hamburger icon
  const NavBarsRef = useRef(null);

  // Function for mobile navbar
  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  const closeDrawer = () => {
    setIsOpen(false);
  };

  // Close mobile navbar if clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && mobileNavRef.current && !mobileNavRef.current.contains(event.target) && !NavBarsRef.current.contains(event.target)) {
        closeDrawer();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

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
      // Alert of special offer appears
      .from('#specialAlert', {
        duration: 0.2,
        opacity: 1,
        display: 'none',
        ease: 'elastic.out'
      })
      .to('#specialAlert', {
        duration: 2,
        opacity: 1,
        display: 'flex',
        ease: 'elastic.in'
      })
      // Alert of special offer disappears
      .to('#specialAlert', {
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
      // Alert of special offer appears
      .from('#specialAlert', {
        duration: 0.2,
        opacity: 1,
        display: 'none',
        ease: 'elastic.out'
      })
      .to('#specialAlert', {
        duration: 2,
        opacity: 1,
        display: 'flex',
        ease: 'elastic.in'
      })
      // Alert of special offer disappears
      .to('#specialAlert', {
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
      // Alert of special offer appears
      .from('#specialAlert', {
        duration: 0.2,
        opacity: 1,
        display: 'none',
        ease: 'elastic.out'
      })
      .to('#specialAlert', {
        duration: 2,
        opacity: 1,
        display: 'flex',
        ease: 'elastic.in'
      })
      // Alert of special offer disappears
      .to('#specialAlert', {
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
      // Alert of special offer appears
      .from('#specialAlert', {
        duration: 0.2,
        opacity: 1,
        display: 'none',
        ease: 'elastic.out'
      })
      .to('#specialAlert', {
        duration: 2,
        opacity: 1,
        display: 'flex',
        ease: 'elastic.in'
      })
      // Alert of special offer disappears
      .to('#specialAlert', {
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

  // eslint-disable-next-line no-unused-vars
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

  const [navbarBg, setNavbarBg] = useState('bg-[#6e96cf]')

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
                    Get ready for the <strong className='capitalize'>{(competition)} <strong>🕺💃</strong></strong> Competition at <strong>Footloosemonkey</strong>! Registrations are now
                    <span className="p-1 px-2 mx-[0.5rem] w-auto bg-red-500 dark:bg-[#181a1b] text-white lg:text-l font-rubik font-semibold rounded-md">
                      LIVE
                    </span>
                  </div>
                </Link>
              </div>

              {/* Special Offer */}
              <div id='specialAlert' className="flex leading-6 lg:text-lg text-[#fff] font-rubik w-[95vw] text-center justify-center" style={{ display: 'none' }}>
                <Link href={'/register'}>
                  <div className='md:text-xl leading-8 font-semibold sm:text-lg md:pl-[5vw] pl-0 w-[80vw] md:w-full'>
                    <strong>Diwali Dhamaka! 🎆 </strong> Free entry for all ages <strong>2 days</strong> only! <span>Register now to shine!</span> <strong>🪔🪔</strong>
                  </div>
                </Link>
              </div>

              {/* Alert2 */}
              <div id='alert2' className="flex leading-6 lg:text-lg text-[#fff] font-rubik w-[95vw] text-center justify-center" style={{ display: 'none' }}>
                <Link href={'/register'}>
                  <div className='md:text-xl leading-8 font-semibold sm:text-lg md:pl-[5vw] pl-0 w-[80vw] md:w-full'>
                    <strong>Footloose Monkey</strong> competition: <strong>25th Oct to 10th Nov</strong>! Showcase your talent and shine! <strong>🌟</strong>
                  </div>
                </Link>
              </div>

              {/* Alert3 */}
              <div id='alert3' className="flex leading-6 lg:text-lg text-[#fff] font-rubik w-[95vw] text-center justify-center" style={{ display: 'none' }}>
                <Link href={'/register'}>
                  <div className='md:text-xl leading-8 font-semibold sm:text-lg md:pl-[5vw] pl-0 w-[80vw] md:w-full'>
                    Voting lines <strong>📈</strong> for <strong>Footloose Monkey</strong> open on <strong>11th November</strong>! Cast your vote now.  <strong>⭐</strong>
                  </div>
                </Link>
              </div>

              {/* Alert4 */}
              <div id='alert4' className="flex leading-6 lg:text-lg text-[#fff] font-rubik w-[95vw] text-center justify-center" style={{ display: 'none' }}>
                <Link href={'/register'}>
                  <div className='md:text-xl leading-8 font-semibold sm:text-lg md:pl-[5vw] pl-0 w-[83vw] md:w-full'>
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
          <div className='flex items-center gap-[5rem]'>
            {/* Logo */}
            <div>
              <Link href='/'>
                <Image src="/logo.png" width={65} height={65} className="my-1 absolute top-0" alt="Logo" />
              </Link>
            </div>

            {/* Collaboration Description */}
            <div className="flex flex-col items-start justify-center">
              <h1 className="text-lg font-bold">Collaboration with</h1>
              <h3 className="text-[14px] font-semibold uppercase">Red Hill school Aliganj Branch, Lucknow</h3>
            </div>
          </div>

          {/* Hamburger Menu Icon for Small Screens */}
          <div className="lg:hidden" >
            <button onClick={toggleDrawer} ref={NavBarsRef} aria-label="Toggle Menu">
              <FaBars className="text-2xl" />
            </button>
          </div>

          {/* Nav Items - Hidden on Small Screens */}
          <div className="hidden lg:flex flex-row items-center gap-12">
            <Link href="/" className="text-xl font-semibold hover:underline transition-colors duration-200">Home</Link>
            <Link href="/about" className="text-xl font-semibold hover:underline transition-colors duration-200">About Us</Link>
            <Link href={`/${competition}`} className="text-xl font-semibold hover:underline transition-colors duration-200">Competition</Link>
            <Link href="/register" className="text-xl font-semibold hover:underline transition-colors duration-200">Register</Link>
            <Link href="/verifyuser" className="text-xl font-semibold hover:underline transition-colors duration-200">Submission</Link>
            <Link href="/spotlight" className="text-xl font-semibold hover:underline transition-colors duration-200">Spotlight</Link>
            <Link href="/leaderboard" className="text-xl font-semibold hover:underline transition-colors duration-200">Leaderboard</Link>
          </div>
        </div>
      </nav>

      {/* Fade Background for mobile view */}
      <AnimatePresence>
        {isOpen && (
          <motion.div>
            <div className='fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-40'></div>
          </motion.div>
        )}
      </AnimatePresence >

      {/* Mobile Navbar Close Button */}
      <AnimatePresence>
        {isOpen && (
          <motion.div className=''>
            <div className='fixed z-[50] right-0 flex justify-end p-4'>
              <button onClick={handleCloseMenu} type="button" className="text-blue-500 font-bold bg-white border-blue-500 border-4 transition-colors transition-300 cursor-pointer p-2 inline-flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-inset rounded-full">
                <span className="sr-only">Close menu</span>
                <svg className="h-8 w-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence >

      {/* Mobile Navbar */}
      <AnimatePresence >
        {isOpen && (
          <motion.div
            ref={mobileNavRef}
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            className="fixed left-0 w-56 h-full bg-[#6e96cf] shadow-lg z-40 flex"
          >
            <div className="flex flex-col items-start p-6 font-bold text-white mt-[1rem] gap-[1rem]">
              {/* Navbar Links */}
              <Link href="/" onClick={handleCloseMenu} className='z-[1000]'>
                <h1 className="text-2xl font-semibold hover:text-blue-300 transition-colors duration-200 mb-4">Home</h1>
              </Link>
              <Link href="/about" onClick={handleCloseMenu} className='z-[1000]'>
                <h1 className="text-2xl font-semibold hover:text-blue-300 transition-colors duration-200 mb-4">About Us</h1>
              </Link>
              <Link href={`/${competition}`} onClick={handleCloseMenu} className='z-[1000]'>
                <h1 className="text-2xl font-semibold hover:text-blue-300 transition-colors duration-200 mb-4">Competition</h1>
              </Link>
              <Link href="/register" onClick={handleCloseMenu} className='z-[1000]'>
                <h1 className="text-2xl font-semibold hover:text-blue-300 transition-colors duration-200 mb-4">Register</h1>
              </Link>
              <Link href="/verifyuser" onClick={handleCloseMenu} className='z-[1000]'>
                <h1 className="text-2xl font-semibold hover:text-blue-300 transition-colors duration-200 mb-4">Submission</h1>
              </Link>
              <Link href="/spotlight" onClick={handleCloseMenu} className='z-[1000]'>
                <h1 className="text-2xl font-semibold hover:text-blue-300 transition-colors duration-200 mb-4">Spotlight</h1>
              </Link>
              <Link href="/leaderboard" onClick={handleCloseMenu} className='z-[1000]'>
                <h1 className="text-2xl font-semibold hover:text-blue-300 transition-colors duration-200 mb-4">Leaderboard</h1>
              </Link>
            </div>
          </motion.div>
        )
        }
      </AnimatePresence>
    </>
  )
}

export default Navbar
