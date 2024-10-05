import Image from 'next/image';
import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const Certificate = () => {
  return (
    <div className="bg-[aliceblue] w-full py-16 flex flex-col items-center">
      <h1 className='text-5xl text-center font-semibold mt-14 text-sky-700'>Certifications and Prizes</h1>

      <div className="mt-6 px-6 max-w-[1000px] text-center">
        <p className="text-lg">
          Earn certifications that not only showcase your skills but also open doors to new opportunities. Our certification programs are designed to validate your expertise and help you stand out in your field. With each certificate, you build credibility and gain recognition for your achievements.
        </p>
        <p className="mt-4 text-lg">
          Beyond certificates, we offer exciting prizes that celebrate your success and motivate you to push your limits. These rewards are more than just trophies; they are symbols of your dedication and hard work. Join us and start your journey towards excellence today.
        </p>
      </div>

      <div className="flex flex-wrap gap-10 justify-center mt-20">
        {['/certificate-1.png', '/certificate-2.png', '/certificate-1.png', '/certificate-2.png'].map((src, index) => (
          <motion.div
            key={index}
            className="relative w-[249px] h-[239px] rounded-lg overflow-hidden shadow-lg cursor-pointer"
            whileHover={{ scale: 1.05 }} // Slight scale on hover
            transition={{ duration: 0.3 }} // Smooth transition
          >
            <Image src={src} layout="fill" objectFit="cover" alt={`certificate-${index + 1}`} />
            <motion.div
              className="absolute inset-0 bg-black bg-opacity-0 flex items-center justify-center transition-opacity duration-300"
              whileHover={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }} // Dark mask on hover
            >
              <Link href="/register">
                <motion.button
                  className="bg-[#E5C3FF] text-white px-4 py-2 rounded opacity-0 hover:opacity-100 transition-opacity duration-300"
                >
                  Get Prize
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Certificate;
