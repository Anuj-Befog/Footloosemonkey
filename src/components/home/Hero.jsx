"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import TypingEffect from 'react-typing-effect';
import { useRouter } from 'next/navigation'

const Hero = () => {
  const router = useRouter()

  return (
    <motion.div
      initial={{ opacity: 0 }}  // Initial state for animation
      animate={{ opacity: 1 }}  // Final state for animation
      transition={{ duration: 0.5 }}  // Duration of the fade effect
      className="relative flex flex-col-reverse lg:flex-row w-full min-h-[55vh] opacity-[80%] px-4 md:px-16 bg-[aliceblue]"
    >
      {/* Left Side Content */}
      <div className="flex flex-col justify-center lg:w-1/2">
        {/* Main Heading */}
        <div className="mt-8 lg:mt-0">
          <h1 className="text-5xl text-center md:text-justify font-semibold text-black">
            If your kid wants to{" "}
            <TypingEffect
              text={['dance', 'sing', 'act', 'mimic']}
              speed={200}
              eraseSpeed={50}
              typingDelay={100}
              className="text-blue-500 font-bold"
            />
          </h1>
        </div>

        {/* Subheading */}
        <div className="mt-6">
          <p className="text-center md:text-justify text-base font-semibold text-gray-700">
            Lights, Camera, talent. Your video is just a stage away!
          </p>
        </div>

        {/* Shows We Accepted */}
        <div className="mt-10">
          <h2 className="text-3xl text-center md:text-justify font-semibold text-black">
            Shows that We Accepted
          </h2>
        </div>

        {/* Description Paragraph */}
        <div className="mt-4">
          <p className="text-lg text-center md:text-justify text-black">
            Welcome to Footloosemonkey, the ultimate kid s talent competition
            platform! Young stars aged 3 to 12 can showcase their talents in
            dancing, singing, acting, and more. Our mission is to provide a fun,
            encouraging environment where children can express their creativity,
            build confidence, and compete for exciting prizes. Join us in
            celebrating the vibrant talents of our young performers. Register
            today and start discovering hidden talents!
          </p>
        </div>

        {/* Register Button */}
        <div className="mt-8 flex justify-center md:block">
          <button className="px-6 py-2 bg-[#004873] hover:bg-[#0076ff] text-white font-semibold rounded transition duration-300"
            onClick={() => router.push('/register')}
          >
            Register
          </button>
        </div>


      </div>

      {/* Right Side Image */}
      <div className="md:mt-12 lg:mt-0 lg:w-1/2 flex justify-center lg:justify-end">
        <Image
          src="/hero.png"
          priority={true}
          width={731}
          height={480}
          className="w-full h-auto"
          alt="Hero"
        />
      </div>
    </motion.div>
  );
};

export default Hero;
