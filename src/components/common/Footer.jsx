"use client"
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <footer className='bg-purple-500 w-full py-8'>
      <div className='max-w-screen-xl mx-auto px-4 lg:px-8'>
        <div className='md:flex md:justify-between'>
          <div className="mb-6 md:mb-0">
            <Link href="/" className="flex items-center">
              <Image src="/logo.png" width={90} height={90} alt="Logo" />
              <span className="self-center text-2xl font-semibold text-white ml-3">Foot Loose Monkey</span>
            </Link>
          </div>
          <div className='grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3 text-white'>
            <div>
              <h2 className="mb-6 text-sm font-semibold uppercase">Quick Links</h2>
              <ul className="font-medium">
                <li className="mb-4">
                  <a href="/" className="hover:underline">Home</a>
                </li>
                <li className="mb-4">
                  <a href="/competition" className="hover:underline">Competition</a>
                </li>
                <li className="mb-4">
                  <a href="/register" className="hover:underline">Registration</a>
                </li>
                <li className="mb-4">
                  <a href="/about" className="hover:underline">About Us</a>
                </li>
                <li>
                  <a href="#top" className="hover:underline">Jump to top</a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold uppercase">Our Competition</h2>
              <ul className="font-medium">
                <li className="mb-4">
                  <a href="/dancing" className="hover:underline">Dancing</a>
                </li>
                <li className="mb-4">
                  <a href="/singing" className="hover:underline">Singing</a>
                </li>
                <li className="mb-4">
                  <a href="/drawing" className="hover:underline">Drawing</a>
                </li>
                <li className="mb-4">
                  <a href="/mimicry" className="hover:underline">Mimicry</a>
                </li>
                <li>
                  <a href="/poetry" className="hover:underline">Poetry</a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold uppercase">About</h2>
              <ul className="font-medium">
                <li className="mb-4">
                  <a href="/company" className="hover:underline">Company</a>
                </li>
                <li className="mb-4">
                  <a href="/privacy" className="hover:underline">Privacy Policy</a>
                </li>
                <li className="mb-4">
                  <a href="/cookies" className="hover:underline">Cookie Policy</a>
                </li>
              </ul>
              <h2 className="mt-6 text-sm font-semibold uppercase">Connect with us</h2>
              <div className="flex space-x-5 mt-4">
                <a href="https://facebook.com" className="text-white hover:text-gray-300">
                  <Image src="/fb.png" className='w-[2.5rem] h-[2.8rem]' width={100} height={100} alt="Facebook" />
                </a>
                <a href="https://linkedin.com" className="text-white hover:text-gray-300">
                  <Image src="/linkedin.png" className='w-[2.5rem] h-[2.8rem]' width={100} height={100} alt="LinkedIn" />
                </a>
                <a href="https://instagram.com" className="text-white hover:text-gray-300">
                  <Image src="/insta.png" className='w-[2.5rem] h-[2.8rem]' width={100} height={100} alt="Instagram" />
                </a>
                <a href="https://youtube.com" className="text-white hover:text-gray-300">
                  <Image src="/yt.png" className='w-[2.5rem] h-[2.8rem]' width={100} height={100} alt="YouTube" />
                </a>
              </div>
            </div>
          </div>
        </div>
        <hr className="my-6 border-gray-200 dark:border-gray-700" />
        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-sm text-gray-200 sm:text-center">© 2023 Foot Loose Monkey. All Rights Reserved.</span>
        </div>
      </div>
    </footer>
  )
}

export default Footer
