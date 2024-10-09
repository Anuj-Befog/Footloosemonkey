"use client"
import Image from 'next/image'
import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import { getRegistrationData } from '../../app/services/index';  // Import necessary services


const Footer = () => {
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

  return (
    <footer className='bg-[#6e96cf] w-full py-8'>
      <div className='max-w-screen-xl mx-auto px-4 lg:px-8'>
        <div className='md:flex md:justify-between'>
          <div className="mb-6 md:mb-0">
            <Link href="/" className="flex items-center">
              <Image src="/logo.png" width={90} height={90} alt="Logo" />
              <span className="self-center text-2xl font-bold text-white ml-3">Footloosemonkey</span>
            </Link>
          </div>
          <div className='grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-4 items-baseline text-white'>
            <div>
              <h2 className="mb-6 text-base font-semibold uppercase">Quick Links</h2>
              <ul className="font-medium">
                <li className="mb-4">
                  <Link href="/" className="hover:underline">Home</Link>
                </li>
                <li className="mb-4">
                  <Link href="/register" className="hover:underline">Registration</Link>
                </li>
                <li className="mb-4">
                  <Link href={`/${competition}`} className="hover:underline">Competition</Link>
                </li>
                <li className="mb-4">
                  <Link href="/about" className="hover:underline">About Us</Link>
                </li>
                <li>
                  <Link href="#top" className="hover:underline">Jump to top</Link>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-base font-semibold uppercase">Our Competition</h2>
              <ul className="font-medium">
                <li className="mb-4">
                  <Link href="/acting" className="hover:underline">Acting</Link>
                </li>
                <li className="mb-4">
                  <Link href="/dancing" className="hover:underline">Dancing</Link>
                </li>
                <li className="mb-4">
                  <Link href="/singing" className="hover:underline">Singing</Link>
                </li>
                <li className="mb-4">
                  <Link href="/mimicry" className="hover:underline">Mimicry</Link>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-base font-semibold uppercase">About</h2>
              <ul className="font-medium">
                <li className="mb-4">
                  <Link href="/about" className="hover:underline">Company</Link>
                </li>
                <li className="mb-4">
                  <Link href="/privacy-policy" className="hover:underline">Privacy Policy</Link>
                </li>
                <li className="mb-4">
                  <Link href="/refund-policy" className="hover:underline">Refund Policy</Link>
                </li>
                <li className="mb-4">
                  <Link href="/terms-condition-policy" className="hover:underline">Terms and Condition</Link>
                </li>
              </ul>

            </div>
            <div>
              <h2 className="mt-6 text-base font-bold uppercase">Connect with us </h2>
              <div className="flex items-center space-x-5 mt-4">
                <div onClick={() => window.location.href = 'mailto:contact@footloosemonkey.club'} target="_blank" className="text-white cursor-pointer hover:text-gray-300">
                  <Image src="/social/gmail.png" className='w-[2.5rem] h-[2.5rem]' width={100} height={100} alt="YouTube" />
                </div>
                <Link href="https://www.facebook.com/profile.php?id=61559932162853" target="_blank" className="text-white hover:text-gray-300">
                  <Image src="/social/facebook.png" className='w-[2rem] h-[2rem]' width={100} height={100} alt="Facebook" />
                </Link>
                <Link href="https://www.instagram.com/footloosemonkey" target="_blank" className="text-white hover:text-gray-300">
                  <Image src="/social/instagram.png" className='w-[2rem] h-[2rem]' width={100} height={100} alt="Instagram" />
                </Link>
              </div>
            </div>
          </div>
        </div>
        <hr className="my-6 border-gray-200 dark:border-gray-700" />
        <div className="sm:flex sm:items-center text-center sm:justify-between">
          <span className="text-sm text-gray-200 sm:text-center">© {new Date().getFullYear()} <b>Footloosemonkey</b> - A&W Technologies. All Rights Reserved.</span>
        </div>
      </div>
    </footer>
  )
}

export default Footer
