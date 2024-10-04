"use client"
import Image from 'next/image'
import React from 'react'
import Link from 'next/link'

const Contact = () => {
  return (
    <div className='bg-white flex flex-col items-center w-full mb-7 mt-20 px-4 sm:px-6 lg:px-8'>
      <h1 className='text-5xl font-semibold'>Contact Us</h1>
      <p className='text-lg mt-2 text-center'>
        For more information or any queries, feel free to reach out to us at:
      </p>
      <div className="flex flex-col sm:flex-row sm:justify-between sm:gap-6 mt-10 w-full max-w-4xl">
        <div aria-label="call" onClick={() => window.location.href = 'tel:+917985322738'}
          className="flex flex-col items-center mb-6 sm:mb-0 hover:bg-gray-100 p-4 rounded-lg transition-transform transform hover:scale-105">
          <Image src="/call-logo.png" width={57} height={52.11} alt="Call" />
          <p className='mt-5 text-lg font-semibold'>+91 7985322738</p>
        </div>

        <div
          className="flex flex-col items-center mb-6 sm:mb-0 hover:bg-gray-100 p-4 rounded-lg transition-transform transform hover:scale-105 cursor-pointer"
          onClick={() => window.location.href = 'mailto:footloosemonkey@gmail.com'}
        >
          <Image src="/message-logo.png" width={81} height={52.11} alt="Email" />
          <p className='mt-5 text-lg font-semibold'>footloosemonkey@gmail.com</p>
        </div>


        <Link href="https://www.instagram.com/footloosemonkey" target="_blank">
          <div className="flex flex-col items-center hover:bg-gray-100 p-4 rounded-lg transition-transform transform hover:scale-105">
            <Image src="/insta-logo.png" width={57} height={52.11} alt="Instagram" />
            <p className='mt-5 text-lg font-semibold'>@footloosemonkey</p>
          </div>
        </Link>
      </div>
    </div>
  )
}

export default Contact
