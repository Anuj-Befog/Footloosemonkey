"use client";
import { useRouter } from 'next/navigation';
import React from 'react';
import { motion } from 'framer-motion';

const Talent = () => {
  const router = useRouter();
  const texts = ["Singing", "Dancing", "Mimicry", "Acting"];

  const handleNavigate = (text) => {
    router.push(`/${text.toLowerCase()}`);
  };

  return (
    <div className='w-full flex flex-col items-center justify-center p-4 bg-[aliceblue]'>
      <h1 className='text-5xl text-center font-semibold mb-10'>
        Showcase your Talent
      </h1>

      <div className="w-[77%] flex space-x-4 overflow-x-auto pb-4 hide-scrollbar">
        {texts.map((text, index) => (
          <motion.div
            key={index}
            className="min-w-[200px] rounded-xl sm:min-w-[250px] p-4 sm:p-6 bg-[#6e96cf] border border-gray-200 rounded-lg shadow-lg flex-shrink-0 cursor-pointer"
            onClick={() => handleNavigate(text)}
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.3 }}
          >
            <svg className="w-7 h-7 text-white mb-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
              <path d="M18 5h-.7c.229-.467.349-.98.351-1.5a3.5 3.5 0 0 0-3.5-3.5c-1.717 0-3.215 1.2-4.331 2.481C8.4.842 6.949 0 5.5 0A3.5 3.5 0 0 0 2 3.5c.003.52.123 1.033.351 1.5H2a2 2 0 0 0-2 2v3a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1V7a2 2 0 0 0-2-2ZM8.058 5H5.5a1.5 1.5 0 0 1 0-3c.9 0 2 .754 3.092 2.122-.219.337-.392.635-.534.878Zm6.1 0h-3.742c.933-1.368 2.371-3 3.739-3a1.5 1.5 0 0 1 0 3h.003ZM11 13H9v7h2v-7Zm-4 0H2v5a2 2 0 0 0 2 2h3v-7Zm6 0v7h3a2 2 0 0 0 2-2v-5h-5Z"/>
            </svg>
            <h5 className="mb-2 text-2xl font-semibold tracking-tight text-white">
              {text}
            </h5>
            <p className="mb-3 font-normal text-white">
              Discover your passion and shine on stage!
            </p>
            <a href="#" className="inline-flex font-medium items-center text-white hover:underline">
              Explore Now
              <svg className="w-3 h-3 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11v4.833A1.166 1.166 0 0 1 13.833 17H2.167A1.167 1.167 0 0 1 1 15.833V4.167A1.166 1.166 0 0 1 2.167 3h4.618m4.447-2H17v5.768M9.111 8.889l7.778-7.778"/>
              </svg>
            </a>
          </motion.div>
        ))}
      </div>

      <p className='text-lg text-center mt-10 px-6 max-w-[800px] font-semibold'>
        Enroll your child today to let their talent shine and be celebrated!
      </p>
    </div>
  );
};

export default Talent;
