"use client";

import React, { useState, useEffect } from 'react';
import { Clock, Loader } from "lucide-react";
import dayjs from 'dayjs';
import relativeTime from "dayjs/plugin/relativeTime";
import Image from 'next/image';
import { fetchAllSubmission } from '../../../lib/submission';
import { v4 as uuidv4 } from 'uuid';

dayjs.extend(relativeTime); // Add relativeTime plugin to dayjs

const VideoGallery = () => {
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await fetchAllSubmission();
                // Sort videos by createdAt in descending order
                const sortedVideos = response.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                setVideos(sortedVideos);
                setLoading(false);
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        };
        getData();
    }, []);

    if (loading) return (
        <div className='h-[50vh] w-[80vw] flex justify-center items-center'>
            <Loader className="animate-spin" size={28} />
        </div>
    );

    // Ensure videos is always an array
    if (!Array.isArray(videos) || !videos.length) {
        return <div className='h-[50vh] w-[80vw] flex justify-center items-center text-2xl'>No videos found</div>;
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2" style={{ display: 'contents' }}>
            {videos.map((video) => (
                <VideoCard key={video.id} video={video} />
            ))}
        </div>
    );
};

const VideoCard = ({ video }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [isVoted, setIsVoted] = useState(false);
    const [voting, setVoting] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false); // State for expanded description

    const getUserId = () => {
        let userId = localStorage.getItem('userId');
        if (!userId) {
            userId = uuidv4();
            localStorage.setItem('userId', userId);
        }
        return userId;
    };

    useEffect(() => {
        const votedVideos = JSON.parse(localStorage.getItem('votedVideos')) || [];
        setIsVoted(votedVideos.includes(video.id));
    }, [video.id]);

    const handleVoteToggle = async (videoId) => {
        if (voting) return; // Prevent multiple requests

        const userId = getUserId();
        setVoting(true); // Set loading to prevent further clicks

        try {
            const response = await fetch('/api/vote', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId, submissionId: videoId })
            });
            const result = await response.json();

            if (response.ok) {
                setIsVoted(!isVoted);

                const votedVideos = JSON.parse(localStorage.getItem('votedVideos')) || [];
                if (isVoted) {
                    const updatedVotes = votedVideos.filter((id) => id !== videoId);
                    localStorage.setItem('votedVideos', JSON.stringify(updatedVotes));
                } else {
                    votedVideos.push(videoId);
                    localStorage.setItem('votedVideos', JSON.stringify(votedVideos));
                }
            } else {
                console.error(result.message);
            }
        } catch (error) {
            console.error('Error toggling vote:', error);
        } finally {
            setVoting(false); // Reset loading state
        }
    };

    const formatDuration = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.round(seconds % 60);
        return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
    };

    // Toggle function for read more/less
    const toggleDescription = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div
            className="w-[25vw] bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-2xl"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <figure className="aspect-video relative">
                <video
                    src={video.publicId ? video.video : ''}
                    controls
                    className="w-full h-full object-cover cursor-pointer"
                />
            </figure>
            <div className="p-4">
                <div className="flex items-center mb-2">
                    <Image
                        src={video.profilepic}
                        alt={video.participantName}
                        width={500}
                        height={500}
                        className="rounded-full mr-2 p-[0.15rem] w-[60px] h-[60px] border-blue-500 border-[3px]"
                    />
                    <div>
                        <div className="text-xl font-semibold uppercase">{video.participantName}</div>
                        <div className="text-sm">{video.participantId}</div>
                    </div>
                </div>
                <div className='flex justify-between items-center my-4 bg-white uppercase'>
                    <div className='text-sm font-semibold text-gray-700'>
                        <span className='font-bold text-blue-500'>Talent:</span> {video.participantTalent}
                    </div>
                    <div className="text-sm font-semibold text-gray-700">
                        <span className='font-bold text-blue-500'>Votes:</span> {video.voteCount}
                    </div>
                </div>
                <h2 className="text-lg font-bold truncate">{video.postTitle}</h2>
                <p className="text-sm text-gray-600 mb-4">
                    {isExpanded ? video.description : `${video.description.slice(0, 80)}...`} {/* Truncate description */}
                    {video.description.length > 80 && ( // Only show "Read More" if the description is longer than 100 characters
                        <span
                            onClick={toggleDescription}
                            className="text-blue-500 cursor-pointer"
                        >
                            {isExpanded ? " Read Less" : " Read More"}
                        </span>
                    )}
                </p>
                <div className='flex items-center justify-between'>
                    <div className="text-sm text-gray-600">
                        Uploaded {dayjs(video.createdAt).fromNow()}
                    </div>
                    <div className="bg-opacity-70 relative rounded-lg text-sm flex items-center">
                        <Clock size={16} className="mr-1" />
                        {formatDuration(video.duration)}
                    </div>
                </div>
                <div className="flex justify-between items-center mt-4">
                    <button
                        className={`w-full justify-center font-bold py-2 px-4 rounded inline-flex items-center ${isVoted ? 'bg-red-500 hover:bg-red-700' : 'bg-[#004873] hover:bg-[#0076ff]'} ${voting ? 'cursor-not-allowed' : 'cursor-pointer'} text-white uppercase`}
                        onClick={() => handleVoteToggle(video.id)}
                        disabled={voting} // Disable button while voting
                    >
                        {voting ? ( // Show spinner while voting
                            <Loader className="animate-spin" size={20} />
                        ) : (
                            isVoted ? "Unvote" : "Vote"
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default VideoGallery;
