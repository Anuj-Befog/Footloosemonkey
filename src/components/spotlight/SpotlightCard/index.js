"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { getCldImageUrl, getCldVideoUrl } from "next-cloudinary";
import { Download, Clock, FileUp } from "lucide-react";
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
                console.log("Response", response);
                setVideos(response);
                setLoading(false);
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        };
        getData();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (!videos.length) return <p>No videos found</p>;

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {videos.map((video) => (
                <VideoCard key={video.id} video={video} />
            ))}
        </div>
    );
};

const VideoCard = ({ video }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [previewError, setPreviewError] = useState(false);
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

    const getFullVideoUrl = useMemo(() => {
        return video?.publicId ? getCldVideoUrl({
            src: video.publicId,
            width: 1920,
            height: 1080,
        }) : '';
    }, [video?.publicId]);

    const getPreviewVideoUrl = useMemo(() => {
        return video?.publicId ? getCldVideoUrl({
            src: video.publicId,
            width: 400,
            height: 225,
            rawTransformations: ["e_preview:duration_15:max_seg_9:min_seg_dur_1"]
        }) : '';
    }, [video?.publicId]);

    const formatSize = (size) => filesize(size);

    const formatDuration = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.round(seconds % 60);
        return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
    };

    const handlePreviewError = () => {
        setPreviewError(true);
    };

    const handleDownloadClick = () => {
        if (videoRef.current) {
            videoRef.current.requestFullscreen();
        }
        window.open(getFullVideoUrl, "_blank");
    };

    useEffect(() => {
        setPreviewError(false);
    }, [isHovered]);

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
            className="w-[18vw] bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-2xl"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <figure className="aspect-video relative">
                {isHovered ? (
                    previewError || !getPreviewVideoUrl ? (
                        <div className="w-full h-full flex items-center justify-center bg-gray-200">
                            <p className="text-red-500">Preview not available</p>
                        </div>
                    ) : (
                        <video
                            ref={videoRef}
                            src={getPreviewVideoUrl}
                            controls
                            className="w-full h-full object-cover cursor-pointer"
                            onError={handlePreviewError}
                        />
                    )
                ) : (
                    <Image
                        width={400}
                        height={225}
                        src={getThumbnailUrl}
                        alt={video.postTitle}
                        className="w-full h-full object-cover"
                    />
                )}
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
                    <div className="bg-opacity-70 relative left-[20%] rounded-lg text-sm flex items-center">
                        <Clock size={16} className="mr-1" />
                        {formatDuration(video.duration)}
                    </div>
                </div>
                <div className="flex justify-between items-center mt-4">
                    <div className="flex items-center">
                        <FileUp size={18} className="mr-2 text-primary" />
                        <div>
                            <div>{formatSize(Number(video.originalSize))}</div>
                        </div>
                    </div>
                    <button
                        className="btn btn-primary btn-sm flex items-center"
                        onClick={handleDownloadClick}
                    >
                        <Download size={16} className="mr-1" />
                        Download
                    </button>
                </div>
            </div>
        </div>
    );
};

export default VideoGallery;
