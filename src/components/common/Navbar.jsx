"use client"
import Image from 'next/image'
import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaBars } from 'react-icons/fa'
import Link from 'next/link'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [navbarBg, setNavbarBg] = useState('bg-[lightcoral]')

  // Function to toggle the drawer
  const toggleDrawer = () => {
    setIsOpen(!isOpen)
  }

  // Function to handle scroll for changing navbar background
  const handleScroll = () => {
    if (window.scrollY > 50) {
      setNavbarBg('bg-purple-700 text-white')
    } else {
      setNavbarBg('bg-[lightcoral] text-white')
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
        <div className="flex flex-row  items-center justify-between w-full px-6 py-4">
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
            <Link href="/" className="text-xl font-semibold hover:text-black transition-colors duration-200">Home</Link>
            <Link href="/" className="text-xl font-semibold hover:text-black transition-colors duration-200">Competition</Link>
            <Link href="/register" className="text-xl font-semibold hover:text-black transition-colors duration-200">Register</Link>
            <Link href="/" className="text-xl font-semibold hover:text-black transition-colors duration-200">About Us</Link>
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
            className="fixed top-0 left-0 w-64 h-full bg-purple-700 shadow-lg z-40"
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
