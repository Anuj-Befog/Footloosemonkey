"use client";

import Hero from "../../components/home/Hero";
import Mission from "../../components/home/Mission";
import Talent from "../../components/home/Talent";
import Certificate from "../../components/home/Certificate";
import About from "../../components/home/About";
import OfferPrice from "../../components/home/OfferPrice";
import Pricing from "../../components/home/Pricing";
import Schedule from "../../components/home/Schedule";
import Voting from "../../components/home/Voting";
import Contact from "../../components/home/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <Mission />
      <Talent />
      <Certificate />
      <About />
      <OfferPrice />
      <Pricing />
      <Schedule />
      <Voting />
      <Contact />
    </>
  );
}
