"use client";

import React, { useState } from 'react';
import SpotlightCard from '../../components/spotlight/SpotlightCard';

export default function Spotlight() {
  const [searchInput, setSearchInput] = useState("");

  const handleSearchClear = () => {
    setSearchInput(""); // clear the search bar
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 md:px-8 lg:px-16">
      <div className="max-w-5xl mx-auto text-center">
        <h1 className="text-4xl font-extrabold text-gray-800 md:text-5xl lg:text-6xl mb-4">
          Spotlight
        </h1>
        <p className="text-gray-600 text-lg md:text-xl lg:text-2xl mb-10">
          Discover outstanding talent showcased for you.
        </p>
      </div>

      {/* Search Bar */}
      <div className='flex justify-center items-center mb-10'>
        <div className="relative">
          <input
            className="appearance-none border-2 pl-10 border-gray-300 hover:border-gray-400 transition-colors rounded-md w-[30vw] py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:ring-blue-400 focus:border-blue-400 focus:shadow-outline"
            id="search"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            type="text"
            placeholder="Search by id, name, title, or talent"
          />
          <div className="absolute right-0 inset-y-0 flex items-center cursor-pointer" onClick={handleSearchClear}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="-ml-1 mr-3 h-5 w-5 text-gray-400 hover:text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
          <div className="absolute left-0 inset-y-0 flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 ml-3 text-gray-400 hover:text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Render multiple SpotlightCards */}
      <div className="holder mx-auto w-[80vw] grid gap-[2rem] sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <SpotlightCard searchInput={searchInput} />
      </div>
    </div>
  );
}
