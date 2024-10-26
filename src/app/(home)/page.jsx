"use client";

import Hero from "../../components/home/Hero";
import Mission from "../../components/home/Mission";
import Talent from "../../components/home/Talent";
import Certificate from "../../components/home/Certificate";
import About from "../../components/home/About";
import Pricing from "../../components/home/Pricing";
import Schedule from "../../components/home/Schedule";
// import Voting from "../../components/home/Voting";
import Contact from "../../components/home/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <Mission />
      <Talent />
      <Certificate />
      <About />
      <Pricing />
      <Schedule />
      {/* <Voting /> */}
      <Contact />
    </>
  );
}
