"use client";

import React from 'react';
import SpotlightCard from '../../components/spotlight/SpotlightCard';

export default function Spotlight() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 md:px-8 lg:px-16">
      <div className="max-w-5xl mx-auto text-center">
        <h1 className="text-4xl font-extrabold text-gray-800 md:text-5xl lg:text-6xl mb-4">
          Spotlight
        </h1>
        <p className="text-gray-600 text-lg md:text-xl lg:text-2xl mb-10">
          Discover outstanding talent showcased for you.
        </p>
      </div>

      {/* Render multiple SpotlightCards */}
      <div className="holder mx-auto w-[80vw] grid gap-[2rem] sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <SpotlightCard />
      </div>
    </div>
  );
}
