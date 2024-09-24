// components/Button.js

import React from "react";
import Image from "next/image";
export default function Dancing() {
  return (
    <div className="bg-[#E0F7FA] pt-10 pb-14">
      <h2 className="text-6xl text-center font-bold mb-20">Dancing</h2>
      <div className="flex ml-14">
        <div>
          <p className="text-2xl mb-8">
            Do you love to dance? Show off your best moves and join our exciting
            dance competition! Whether you groove to hip-hop, twirl in ballet,
            or shake it to jazz, we want to see your unique style.
          </p>
          <div className="mt-8">
            <h3 className="text-3xl font-bold">Why Participate?</h3>
            <ul className="text-left text-2xl mx-16 list-disc list-inside mt-4 space-y-2">
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
            <h3 className="text-3xl font-bold">How to Join:</h3>
            <ol className="text-left text-2xl mx-16 list-decimal list-inside mt-4 space-y-2">
              <li>Register on our website.</li>
              <li>Upload a video of your best dance performance.</li>
              <li>Wait for the results and get ready to shine!</li>
            </ol>
            <p className="mt-4 text-2xl mx-16">
              Don&apos;t miss this chance to be a dance star! Click the button below
              to register and start your journey to the spotlight.
            </p>
            <button className="mt-4  ml-40 font-bold py-2 px-4 rounded">
              <Image
                src="/registerbtn.png"
                alt="Dancer"
                width={250}
                height={250}
              />
            </button>
          </div>
        </div>
        <Image
          src="/dancer.png"
          alt="Dancer"
          width={700}
          height={700}
          className="-my-20"
        />
      </div>
      <div className="mt-8">
        <h3 className="text-3xl text-center font-bold">
          Our <span className="text-sky-700">Winners</span>
        </h3>
        <div className="flex mt-4 gap-14 justify-center">
          {/* Replace these divs with actual winner images and details */}
          <div className="bg-gray-200 h-32 w-32"></div>
          <div className="bg-gray-200 h-32 w-32"></div>
          <div className="bg-gray-200 h-32 w-32"></div>
          <div className="bg-gray-200 h-32 w-32"></div>
          <div className="bg-gray-200 h-32 w-32"></div>
        </div>
        <div className="flex justify-end mr-24">
          <button className="mt-4  py-2 px-4 rounded">
            <Image
              src="/seeMore.png"
              alt="Dancer"
              width={150}
              height={150}
            />
          </button>
        </div>
      </div>
    </div>
  );
}
