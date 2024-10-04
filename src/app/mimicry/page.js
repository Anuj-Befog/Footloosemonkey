// components/Button.js

import React from 'react';
import Image from "next/image";
import Link from 'next/link';
export default function Mimicry() {
  return (
    <div className='bg-[#E0F7FA] pt-10 pb-14'>
      <h2 className="text-6xl text-center font-bold mb-20 my-8">Mimicry</h2>
      <div className="flex ml-14">
        <div>
          <div className="mt-8">
            <h3 className="text-3xl text-sky-700 font-bold">Unleash Your Inner Performer with Mimicry!</h3>
            <p className='text-2xl mt-16 mx-8'>Do you have a knack for imitating voices, sounds, or even your favorite characters? Join our Mimicry competition and show off your unique talent! Whether it&apos;s a famous celebrity, a cartoon character, or any funny sound, we want to see your best impersonations.</p>
          </div>
          <div className="mt-8">
            <p className="mt-16 text-2xl ">
              Mimicry is all about creativity, humor, and originality. This is your chance to make everyone laugh, impress the judges, and win exciting prizes. Don&apos;t miss out on this fun opportunity to showcase your talent!
            </p>

            <p className='mt-20 text-2xl'>Register today and let your voice be heard!</p>
            <Link href="/register">
              <button className="mt-8 ml-40 font-bold py-2 px-4 rounded">
                <Image
                  src="/registerbtn.png"
                  alt="Dancer"
                  width={250}
                  height={250}
                />
              </button>
            </Link>
          </div>
        </div>
        <Image
          src="/mimicry.png"
          alt="Dancer"
          width={600}
          height={600}
          className="-my-20"
        />

      </div>
      <div className="mt-8">
        <h3 className="text-4xl text-center font-bold mb-10">
          Our <span className="text-sky-700">Winners</span>
        </h3>
        <div className='flex justify-center mt-10 gap-14'>
          <Image src="/winner.png" width={178} height={164} alt="winner" />
          <Image src="/winner.png" width={178} height={164} alt="winner" />
          <Image src="/winner.png" width={178} height={164} alt="winner" />
          <Image src="/winner.png" width={178} height={164} alt="winner" />
          <Image src="/winner.png" width={178} height={164} alt="winner" />
        </div>
      </div>
    </div>
  );
}
