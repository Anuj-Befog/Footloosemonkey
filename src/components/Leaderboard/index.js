"use client";

import React, { useEffect, useState } from 'react';
import { Loader } from "lucide-react";
import { fetchLeaderboard } from '../../lib/submission';
import Image from 'next/image';

const Leaderboard = () => {
    const [leaderboard, setLeaderboard] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await fetchLeaderboard();
                setLeaderboard(response);
                setLoading(false);
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        }
        getData();
    }, []);

    if (loading) return (
        <div className='h-[50vh] flex justify-center items-center'>
            <Loader className="animate-spin" size={28} />
        </div>
    );

    return (
        <div className="max-w-5xl mx-auto md:p-4 sm:p-6 bg-gray-100 rounded-lg mt-10">
            <div className='overflow-x-auto'>
                <table className="w-full text-left bg-white border border-gray-300 rounded-lg">
                    <thead className="bg-blue-500 text-white">
                        <tr>
                            <th className="py-3 px-4 border-b">Rank</th>
                            <th className="py-3 px-4 border-b sm:table-cell">Participant ID</th>
                            <th className="py-3 px-4 border-b">Profile</th>
                            <th className="py-3 px-4 border-b">Name</th>
                            <th className="py-3 px-4 border-b lg:table-cell">Talent</th>
                            <th className="py-3 px-4 border-b">Votes</th>
                        </tr>
                    </thead>
                    <tbody>
                        {leaderboard.map((item, index) => (
                            <tr key={item.participantId} className={`hover:bg-gray-50 ${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}`}>
                                <td className="py-4 px-4 border-b text-gray-700 font-medium">{index + 1}</td>
                                <td className="py-4 px-4 border-b text-gray-700 sm:table-cell">{item.participantId}</td>
                                <td className="py-4 px-4 border-b">
                                    <Image
                                        src={item.profilepic}
                                        alt={`${item.participantName}'s profile`}
                                        width={40}
                                        height={40}
                                        className="rounded-full"
                                    />
                                </td>
                                <td className="py-4 px-4 border-b text-blue-600 font-semibold">
                                    <a href={`/profile/${item.participantId}`} target="_blank" rel="noopener noreferrer">
                                        {item.participantName}
                                    </a>
                                </td>
                                <td className="py-4 px-4 border-b text-gray-700 lg:table-cell">{item.participantTalent}</td>
                                <td className="py-4 px-4 border-b text-gray-700">{item.voteCount}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Leaderboard;
