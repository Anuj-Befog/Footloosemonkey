"use client";

import About from "@/components/home/About";
import Certificate from "@/components/home/Certificate";
import Contact from "@/components/home/Contact";
import Footer from "@/components/common/Footer";
import Hero from "@/components/home/Hero";
import Mission from "@/components/home/Mission";
import Talent from "@/components/home/Talent";


export default function Home() {

  return (
    <>
    <Hero/>
    <Mission/>
    <Talent/>
    <Certificate/>
    <About/>
    <Contact/>

    </>
  );
}
