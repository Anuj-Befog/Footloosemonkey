"use client";

import React, { useEffect, useState } from 'react';
import { Loader } from "lucide-react";
import { fetchLeaderboard } from '../../lib/submission';

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

    if (loading) return <div className='flex justify-center'><Loader className="animate-" size={20} /></div>;

    return (
        <div className="max-w-4xl mx-auto p-4">
            <table className="min-w-full bg-white border border-gray-300 text-center">
                <thead>
                    <tr>
                        <th className="py-2 px-4 border-b">Rank</th>
                        <th className="py-2 px-4 border-b">Participant Name</th>
                        <th className="py-2 px-4 border-b">Talent</th>
                        <th className="py-2 px-4 border-b">Votes</th>
                    </tr>
                </thead>
                <tbody>
                    {leaderboard.map((item, index) => (
                        <tr key={item.id} className="hover:bg-gray-100">
                            <td className="py-2 px-4 border-b">{index + 1}</td>
                            <td className="py-2 px-4 border-b">{item.participantName}</td>
                            <td className="py-2 px-4 border-b">{item.participantTalent}</td>
                            <td className="py-2 px-4 border-b">{item.voteCount}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Leaderboard;
