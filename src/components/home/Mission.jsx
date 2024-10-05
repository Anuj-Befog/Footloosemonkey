"use client";
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion'; // Ensure to import correctly
import Link from 'next/link';

const Mission = () => {
  const [currentImage, setCurrentImage] = useState(0); // State for current image index in slider
  const controls = useAnimation(); // Controls for Framer Motion animation
  const ref = React.useRef(null); // Create a ref to attach to the component
  const inView = useInView(ref, { triggerOnce: true, threshold: 0.1 }); // Detect when the component is in view

  useEffect(() => {
    if (inView) {
      controls.start({ opacity: 1, y: 0 });
    }
  }, [controls, inView]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev === 1 ? 0 : prev + 1));
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const sliderVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
    exit: { opacity: 0, x: 50, transition: { duration: 0.8 } }
  };

  const fadeInVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 1 } }
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={fadeInVariants}
      className="w-full min-h-[729px] flex flex-col lg:flex-row items-center bg-[aliceblue]"
    >
      <div className="w-full lg:w-1/2 flex justify-center lg:order-1 order-2 mb-2 lg:mb-0">
        <motion.div
          key={currentImage}
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={sliderVariants}
          className="w-full max-w-md"
        >
          <Image
            src={currentImage === 0 ? "/mission.png" : "/mission2.jpg"} // Change this to other image paths if you have more
            width={654}
            height={401}
            className="mx-auto"
            alt="Mission Image"
          />
        </motion.div>
      </div>

      {/* Content Section */}
      <div className="w-full flex flex-col items-center justify-center lg:w-1/2 lg:order-2 order-1 px-6 lg:px-16 py-8">
        <h1 className="text-3xl lg:text-[35px] font-semibold mb-6 text-sky-700">Our Mission</h1>
        <p className="text-lg mb-6">
          Welcome to Footloosemonkey, where young stars shine bright! Our mission is to provide a fun, safe, and inspiring platform for children aged 6 to 10 to showcase their talents in singing, dancing, acting, mimicry, and more. At Footloosemonkey, we believe every child is unique and talented in their own way, and we are here to celebrate and nurture that talent. Join us in our exciting competitions, make new friends, and discover your amazing potential!
        </p>
        <div>
          <Link href="/about">
            <button className="px-6 py-2 bg-[#004873] text-white font-semibold rounded hover:bg-[#0076ff] transition duration-300">
              Know More
            </button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default Mission;
