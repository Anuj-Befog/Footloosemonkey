import React, { useState, useEffect, useMemo } from 'react'
import { getCldImageUrl, getCldVideoUrl } from "next-cloudinary"
import { Download, Clock, FileDown, FileUp } from "lucide-react"
import dayjs from 'dayjs'
import relativeTime from "dayjs/plugin/relativeTime"
import { filesize } from "filesize"
import Image from 'next/image'
import { fetchAllSubmission } from '../../../lib/submission'

dayjs.extend(relativeTime)

const VideoGallery = () => {
    const [videos, setVideos] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await fetchAllSubmission()
                console.log("Response", response)
                setVideos(response)
                setLoading(false)
            } catch (error) {
                console.error(error)
                setLoading(false)
            }
        }
        getData()
    }, [])

    if (loading) return <p>Loading...</p>
    if (!videos.length) return <p>No videos found</p>

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {videos.map((video) => (
                <VideoCard key={video.id} video={video} />
            ))}
        </div>
    )
}

const VideoCard = ({ video }) => {
    const [isHovered, setIsHovered] = useState(false)
    const [previewError, setPreviewError] = useState(false)

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
        }) : ''
    }, [video?.publicId])

    const getFullVideoUrl = useMemo(() => {
        return video?.publicId ? getCldVideoUrl({
            src: video.publicId,
            width: 1920,
            height: 1080,
        }) : ''
    }, [video?.publicId])

    const getPreviewVideoUrl = useMemo(() => {
        return video?.publicId ? getCldVideoUrl({
            src: video.publicId,
            width: 400,
            height: 225,
            rawTransformations: ["e_preview:duration_15:max_seg_9:min_seg_dur_1"]
        }) : ''
    }, [video?.publicId])

    const formatSize = (size) => filesize(size)

    const formatDuration = (seconds) => {
        const minutes = Math.floor(seconds / 60)
        const remainingSeconds = Math.round(seconds % 60)
        return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`
    }

    const compressionPercentage = video ? Math.round(
        (1 - Number(video.compressedSize) / Number(video.originalSize)) * 100
    ) : 0

    const handlePreviewError = () => {
        setPreviewError(true)
    }

    useEffect(() => {
        setPreviewError(false)
    }, [isHovered])

    return (
        <div
            className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-2xl"
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
                            src={getPreviewVideoUrl}
                            autoPlay
                            loop
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
                <div className="absolute bottom-2 right-2 bg-base-100 bg-opacity-70 px-2 py-1 rounded-lg text-sm flex items-center">
                    <Clock size={16} className="mr-1" />
                    {formatDuration(video.duration)}
                </div>
            </figure>
            <div className="p-4">
                <h2 className="text-lg font-bold">{video.postTitle}</h2>
                <p className="text-sm text-gray-600 mb-4">{video.description}</p>
                <p className="text-sm text-gray-600 mb-2">
                    Uploaded by {video.participantName} ({video.participantEmail})
                </p>
                <p className="text-sm text-gray-600 mb-4">
                    Uploaded {dayjs(video.createdAt).fromNow()}
                </p>
                <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                    <div className="flex items-center">
                        <FileUp size={18} className="mr-2 text-primary" />
                        <div>
                            <div className="font-semibold">Original</div>
                            <div>{formatSize(Number(video.originalSize))}</div>
                        </div>
                    </div>
                    <div className="flex items-center">
                        <FileDown size={18} className="mr-2 text-secondary" />
                        <div>
                            <div className="font-semibold">Compressed</div>
                            <div>{formatSize(Number(video.compressedSize))}</div>
                        </div>
                    </div>
                </div>
                <div className="flex justify-between items-center mt-4">
                    <div className="text-sm font-semibold">
                        Compression:{" "}
                        <span className="text-accent">{compressionPercentage}%</span>
                    </div>
                    <button
                        className="btn btn-primary btn-sm"
                        disabled={!getFullVideoUrl || previewError}
                    >
                        <Download size={16} />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default VideoGallery