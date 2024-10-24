"use client";

import About from "@/components/home/About";
import Certificate from "@/components/home/Certificate";
import Contact from "@/components/home/Contact";
import Hero from "@/components/home/Hero";
import Mission from "@/components/home/Mission";
import Pricing from "@/components/home/Pricing";
import Talent from "@/components/home/Talent";
import Voting from "@/components/home/Voting";

export default function Home() {
  return (
    <>
      <Hero />
      <Mission />
      <Talent />
      <Certificate />
      <About />
      <Pricing />
      {/* <Voting /> */}
      <Contact />
    </>
  );
}
