import React, { useState, useEffect, useMemo } from 'react';
import { getCldImageUrl } from "next-cloudinary";
import { fetchAllSubmission } from '../../../lib/submission';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

const VideoGallery = () => {
    const [videos, setVideos] = useState([]); // Initial state is an empty array
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await fetchAllSubmission();
                console.log("Response", response);
                // Ensure response is an array
                if (Array.isArray(response)) {
                    setVideos(response);
                } else {
                    console.error("Expected an array but got:", response);
                    setVideos([]);
                }
                setLoading(false);
            } catch (error) {
                console.error(error);
                setVideos([]); // Set to an empty array on error
                setLoading(false);
            }
        };
        getData();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (!Array.isArray(videos) || videos.length === 0) return <p>No videos found</p>; // Check for array before length

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.map((video) => (
                <VideoCard key={video.id} video={video} />
            ))}
        </div>
    );
};

const VideoCard = ({ video }) => {
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

    const formatDuration = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.round(seconds % 60);
        return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
    };

    return (
        <div class="holder mx-auto w-10/12 grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
            <div className="each w-[18vw]  mb-10 m-4 mx-6 shadow-lg border-gray-800 bg-gray-100 relative">
                <img className="w-full" src={getThumbnailUrl} alt={video.postTitle} />
                <div className="badge absolute top-0 right-0 bg-indigo-500 m-1 text-gray-200 p-1 px-2 text-xs font-bold rounded">
                    {formatDuration(video.duration)}  {/* Display formatted duration */}
                </div>
                <div className="desc p-4 text-gray-800">
                    <a
                        href={`https://www.youtube.com/watch?v=${video.id}`} // Adjust based on your data
                        target="_blank"
                        rel="noopener noreferrer"
                        className="title font-bold block cursor-pointer hover:underline"
                    >
                        {video.postTitle}
                    </a>
                    <span className="text-xs text-gray-500">
                        Uploaded {dayjs(video.createdAt).fromNow()}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default VideoGallery;
