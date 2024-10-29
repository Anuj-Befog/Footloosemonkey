"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { getCldImageUrl, getCldVideoUrl } from "next-cloudinary";
import { Clock } from "lucide-react";
import dayjs from 'dayjs';
import relativeTime from "dayjs/plugin/relativeTime";
import { filesize } from "filesize";
import Image from 'next/image';
import { fetchAllSubmission } from '../../../lib/submission';

dayjs.extend(relativeTime);

const VideoGallery = () => {
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await fetchAllSubmission();
                setVideos(response);
                setLoading(false);
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        };
        getData();
    }, []);

    if (loading) return <div className='text-center'>Loading...</div>;
    if (!videos.length) return <p>No videos found</p>;

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
            {videos.map((video) => (
                <VideoCard key={video.id} video={video} />
            ))}
        </div>
    );
};

const VideoCard = ({ video }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [isVoted, setIsVoted] = useState(false);
    const [videos, setVideos] = useState([]);

    const videoRef = React.useRef(null);

    const getThumbnailUrl = useMemo(() => {
        return video?.publicId ? getCldImageUrl({
            src: video.publicId,
            width: 400,
            height: 225,
            crop: "fill",
            gravity: "auto",
            format: "jpg",
            quality: "auto",
            assetType: "video"
        }) : '';
    }, [video?.publicId]);

    const handleVoteToggle = async (videoId) => {
        try {
            const response = await fetch('/api/vote', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId: video?.id, submissionId: videoId }) // Ensure you have the userId available here
            });
            const result = await response.json();

            if (response.ok) {
                setIsVoted(result.isVoted);
                setVideos((prevVideos) =>
                    prevVideos.map((v) =>
                        v.id === videoId ? { ...v, voteCount: result.voteCount } : v
                    )
                );
            } else {
                console.error(result.message);
            }
        } catch (error) {
            console.error('Error toggling vote:', error);
        }
    };

    const formatDuration = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.round(seconds % 60);
        return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
    };

    const [isTitleExpanded, setIsTitleExpanded] = useState(false);
    const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

    const handleToggleTitle = () => {
        setIsTitleExpanded((prev) => !prev);
    };

    const handleToggleDescription = () => {
        setIsDescriptionExpanded((prev) => !prev);
    };

    return (
        <div
            className="w-[25vw] bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-2xl"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <figure className="aspect-video relative">
                <video
                    ref={videoRef}
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
                        width={40}
                        height={40}
                        className="rounded-full mr-2"
                    />
                    <span className="text-sm font-semibold">{video.participantName}</span>
                </div>
                <h2 className="text-lg font-bold truncate">
                    {isTitleExpanded ? (
                        <span>{video.postTitle}</span>
                    ) : (
                        <span>{video.postTitle.length > 30 ? `${video.postTitle.slice(0, 30)}` : video.postTitle}</span>
                    )}
                    {video.postTitle.length > 30 && (
                        <button onClick={handleToggleTitle} className="text-blue-500 hover:underline ml-2">
                            {isTitleExpanded ? "Read Less" : "Read More"}
                        </button>
                    )}
                </h2>
                <p className="text-sm text-gray-600 mb-4 truncate">
                    {isDescriptionExpanded ? (
                        video.description
                    ) : (
                        `${video.description.slice(0, 80)}`
                    )}
                    {video.description.length > 80 && (
                        <button onClick={handleToggleDescription} className="text-blue-500 hover:underline ml-2">
                            {isDescriptionExpanded ? "Read Less" : "Read More"}
                        </button>
                    )}
                </p>
                <div className='flex items-center'>
                    <div className="text-sm text-gray-600">
                        Uploaded {dayjs(video.createdAt).fromNow()}
                    </div>
                    <div className="bg-opacity-70 relative left-[43%] rounded-lg text-sm flex items-center">
                        <Clock size={16} className="mr-1" />
                        {formatDuration(video.duration)}
                    </div>
                </div>
                <div className="flex justify-between items-center mt-4">
                    <button
                        className={`w-full justify-center font-bold py-2 px-4 rounded inline-flex items-center ${isVoted ? 'bg-red-500 hover:bg-red-700' : 'bg-[#004873] hover:bg-[#0076ff]'
                            } text-white uppercase`}
                        onClick={() => handleVoteToggle(video.id)}
                    >
                        {isVoted ? "Unvote" : "Vote"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default VideoGallery;
