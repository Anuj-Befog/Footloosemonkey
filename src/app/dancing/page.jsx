// components/Button.js

import React from "react";
import Image from "next/image";
import Link from "next/link";
export default function Dancing() {
  return (
    <div className="bg-[#E0F7FA]">
      <div className="pt-10 pb-14 container">
        <h2 className="text-5xl text-center font-bold mb-20">Dancing</h2>
        <div className="flex ml-14">
          <div>
            <p className="text-xl mb-8">
              Do you love to dance? Show off your best moves and join our exciting
              dance competition! Whether you groove to hip-hop, twirl in ballet,
              or shake it to jazz, we want to see your unique style.
            </p>
            <div className="mt-8">
              <h3 className="text-2xl font-bold">Why Participate?</h3>
              <ul className="text-left text-xl mx-16 list-disc list-inside mt-4 space-y-2">
                <li>
                  <span className="font-semibold text-sky-900">
                    Express Your Creativity:
                  </span>{" "}
                  Let your dance tell a story and showcase your passion.
                </li>
                <li>
                  <span className="font-semibold  text-sky-900">
                    Build Confidence:
                  </span>{" "}
                  Gain confidence by performing in front of an audience.
                </li>
                <li>
                  <span className="font-semibold  text-sky-900">
                    Win Amazing Prizes:
                  </span>{" "}
                  Compete for exciting prizes and recognition.
                </li>
                <li>
                  <span className="font-semibold  text-sky-900">Have Fun:</span>{" "}
                  Enjoy a fun and supportive environment where everyone celebrates
                  your talent.
                </li>
              </ul>
            </div>
            <div className="mt-8">
              <h3 className="text-2xl font-bold">How to Join:</h3>
              <ol className="text-left text-xl mx-16 list-decimal list-inside mt-4 space-y-2">
                <li>Register on our website.</li>
                <li>Upload a video of your best dance performance.</li>
                <li>Wait for the results and get ready to shine!</li>
              </ol>
              <p className="mt-4 text-xl mx-16">
                Don&apos;t miss this chance to be a dance star! Click the button below
                to register and start your journey to the spotlight.
              </p>
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
            src="/dancer.png"
            alt="Dancer"
            width={580}
            height={400}
            className="my-[-10rem]"
          />
        </div>
        <div className="mt-[8rem]">
          <h3 className="text-4xl text-center font-bold mb-10">
            Our <span className="text-sky-700">Winners</span>
          </h3>
          <div className="flex mt-4 gap-14 justify-center">
            {/* Replace these divs with actual winner images and details */}
            <div className="h-32 w-32 flex justify-center items-center">
              <Image src="/avatar.jpg" width={150} height={150} alt="winner" />
            </div>
            <div className="h-32 w-32 flex justify-center items-center">
              <Image src="/avatar.jpg" width={150} height={150} alt="winner" />
            </div>
            <div className="h-32 w-32 flex justify-center items-center">
              <Image src="/avatar.jpg" width={150} height={150} alt="winner" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
