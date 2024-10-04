"use client";
import React, { useState } from "react";
import { useRouter } from 'next/navigation'
import { motion } from "framer-motion";

const About = () => {
  const router = useRouter()
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const texts = ["Singing", "Dancing", "Acting", "Mimicry"];

  return (
    <div className="py-16 px-8 w-full flex flex-col items-center bg-[aliceblue]">
      <h1 className="text-5xl font-semibold ">About</h1>

      <div className="mt-12 max-w-[800px] text-center">
        <h2 className="text-3xl font-semibold">Welcome to Footloosemonkey!</h2>
        <p className="mt-6 text-lg">
          At Footloosemonkey, we believe in the incredible potential of every child. Our platform is dedicated to uncovering and nurturing young talents in the most engaging and fun way possible. Here&apos;s everything you need to know about us.
        </p>
      </div>

      <div className="mt-12 max-w-[800px] text-center">
        <h2 className="text-3xl font-semibold">Our Mission</h2>
        <p className="mt-6 text-lg">
          Our mission is simple yet powerful: To provide a stage for young stars to shine. We aim to create a supportive and inspiring environment where children aged 6 to 12 can showcase their talents, build confidence, and experience the joy of performing.
        </p>
      </div>

      <div className="mt-12 w-full max-w-[800px]">
        <h2 className="text-3xl font-semibold text-center mb-6">What We Offer</h2>
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4 justify-center">
          {texts.map((text, key) => (
            <motion.div
              key={key}
              className="flex justify-center items-center rounded-full bg-[#6e96cf] text-white w-full h-[45px]"
              whileHover={{ scale: 1.05 }}
            >
              <p className="text-lg">{text}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="mt-12 w-full max-w-[800px]">
        {["What We Offer", "Why Choose Us?", "How It Works?"].map((title, index) => (
          <div key={index} className="mb-6">
            <motion.div
              className="p-4 bg-[#6e96cf] text-white rounded-lg cursor-pointer"
              onClick={() => toggleAccordion(index)}
              whileHover={{ scale: 1.02 }}
            >
              <h2 className="text-2xl font-semibold">{title}</h2>
            </motion.div>
            {activeIndex === index && (
              <motion.div
                className="p-4 mt-2 bg-white rounded-lg text-[#004873] shadow-lg"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
              >
                <p className="text-lg">
                  {index === 0 && "Footloosemonkey is an ultimate kid's talent competition platform focusing on singing, dancing, acting, and mimicry."}
                  {index === 1 && "Our platform is fun, encouraging, and inclusive. We provide valuable feedback, skill development, and exciting prizes to help children grow."}
                  {index === 2 && "Register, prepare, record your performance, and submit to join the competition. It's that simple!"}
                </p>
              </motion.div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-16 max-w-[900px] text-center">
        <h2 className="text-4xl font-semibold">Join Us</h2>
        <p className="mt-6 text-lg">
          At Footloosemonkey, every child is a star. We invite you to join us in this exciting journey of discovering and celebrating young talents. Let your child&apos;s imagination and creativity soar as they step into the spotlight!
        </p>
        <motion.button
          onClick={() => router.push('/register')}
          className="mt-8 bg-[#004873] hover:bg-[#0076ff] text-white px-6 py-2 rounded-lg"
          whileHover={{ scale: 1.05 }}
        >
          Register Now
        </motion.button>
      </div>
    </div>
  );
};

export default About;
