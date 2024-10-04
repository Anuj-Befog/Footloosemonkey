// components/Button.js

import React from "react";
import Head from "next/head";
import Image from "next/image";
import Navbar from "@/components/common/Navbar";
import Link from "next/link";
export default function Dancing() {
  return (
    <div className="bg-[#E0F7FA]">
      <div className="container pb-16">
        <h2 className="text-6xl text-center font-bold mb-16 pt-14">Acting</h2>
        <div className="flex ml-14 font-semibold">
          <div>
            <h1 className="text-[25px] font-semibold text-[#004873] mb-6">
              Unleash Your Inner Star with Our Acting Competition!
            </h1>
            <p className="text-2xl mb-8">
              Have you ever dreamed of being on stage or in the spotlight? Do you
              love pretending to be different characters and telling amazing
              stories? If so, our Acting Competition is the perfect place for you
              to shine
            </p>
            <div className="mt-12">
              <h3 className="text-3xl font-bold">Why Join?</h3>
              <ul className="text-left text-2xl mx-16 list-disc list-inside mt-4 space-y-2">
                <li>
                  <span className="font-semibold text-sky-900">
                    Show Your Talent:
                  </span>{" "}
                  Perform your favorite scenes, monologues, or create your own
                  original skits.
                </li>
                <li>
                  <span className="font-semibold  text-sky-900">
                    Build Confidence:
                  </span>{" "}
                  Acting helps you become more confident and expressive.
                </li>
                <li>
                  <span className="font-semibold  text-sky-900">
                    Win Amazing Prizes:
                  </span>{" "}
                  Get tips and feedback from experienced judges to improve your
                  acting skills
                </li>
                <li>
                  <span className="font-semibold  text-sky-900">
                    Learn and Grow:
                  </span>{" "}
                  Stand a chance to win awesome prizes and recognition for your
                  talent.
                </li>
              </ul>
            </div>
            <div className="mt-12">
              <h3 className="text-3xl font-bold">Who Can Participate?</h3>
              <p className="text-xl font-semibold mt-7 mx-14">All young stars aged 5 to 15 who love acting and performing!</p>
            </div>
            <div className="mt-12">
              <h3 className="text-3xl font-bold">How to Join:</h3>
              <ol className="text-left text-2xl mx-16 list-disc list-inside mt-4 space-y-2">
                <li>
                  <span className="font-semibold  text-sky-900">Register:</span>{" "}
                  Click the Register button below to sign up..
                </li>
                <li>
                  <span className="font-semibold  text-sky-900">
                    Prepare Your Act:
                  </span>{" "}
                  Practice your performance and get ready to impress the judges.
                </li>
                <li>
                  <span className="font-semibold  text-sky-900">
                    Submit Your Video:
                  </span>{" "}
                  Record your act and upload it to our platform
                </li>
              </ol>
            </div>

          </div>
          <Image
            src="/dancer.png"
            alt="Dancer"
            width={700}
            height={700}
            className="-my-36"
          />
        </div>
        <div className="mt-40">
          <p className="mt-4 text-2xl mx-16 font-semibold">
            Join us and step into the world of acting where your imagination knows
            no bounds! Show the world what you&apos;ve got and become the next big
            star!
          </p>
        </div>
        <div className="text-center">
          <Link href="/register">
            <button className="mt-4 font-bold py-2 px-4 rounded">
              <Image src="/registerbtn.png" alt="Dancer" width={250} height={250} />
            </button>
          </Link>
        </div>
        <div className="mt-[8rem]">
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
    </div>
  );
}
