"use client";

import React from 'react';
import Leaderboard from '../../components/Leaderboard';

const LeaderboardPage = () => {
    return (
        <div className="min-h-screen bg-gray-100 py-12 px-4 md:px-8 lg:px-16">
            <div className="max-w-5xl mx-auto text-center">
                <h1 className="text-4xl font-extrabold text-gray-800 md:text-5xl lg:text-6xl mb-4">
                    Leaderboard
                </h1>
                <p className="text-gray-600 text-lg md:text-xl lg:text-2xl mb-10">
                    Welcome to the Video Talent Competition
                </p>
            </div>
            <Leaderboard />
        </div>
    );
};

export default LeaderboardPage;
