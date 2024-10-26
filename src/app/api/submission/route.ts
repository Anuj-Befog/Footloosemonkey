import { NextRequest, NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

interface CloudinaryUploadResult {
    public_id: string;
    bytes: number;
    duration?: number;
    secure_url: string;
    [key: string]: any;
}

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        const videoFile = formData.get("file") as File | null;
        const profileFile = formData.get("profilepic") as File | null;

        // Validate required fields
        const requiredFields = [
            'participantId', 'participantName', 'participantEmail',
            'participantAge', 'participanTalent', 'postTitle',
            'description', 'originalSize'
        ];

        for (const field of requiredFields) {
            if (!formData.get(field)) {
                return NextResponse.json({ error: `${field} is required` }, { status: 400 });
            }
        }

        if (!videoFile || !profileFile) return NextResponse.json({ error: "Both video and profile picture files are required" }, { status: 400 });

        // Upload video to Cloudinary
        const videoUpload = new Promise<CloudinaryUploadResult>(async (resolve, reject) => {
            try {
                const buffer = Buffer.from(await videoFile.arrayBuffer());
                cloudinary.uploader.upload_stream(
                    {
                        resource_type: "video",
                        folder: "footloosemonkey-next-cloudinary-uploads/videos",
                        transformation: [{ quality: "auto", fetch_format: "mp4" }]
                    },
                    (error, result) => {
                        if (error) reject(error);
                        else resolve(result as CloudinaryUploadResult);
                    }
                ).end(buffer);
            } catch (error) {
                reject(error);
            }
        });

        // Upload profile picture to Cloudinary
        const profileUpload = new Promise<CloudinaryUploadResult>(async (resolve, reject) => {
            try {
                const buffer = Buffer.from(await profileFile.arrayBuffer());
                cloudinary.uploader.upload_stream(
                    {
                        resource_type: "image",
                        folder: "footloosemonkey-next-cloudinary-uploads/profilepics",
                        transformation: [{ quality: "auto", fetch_format: "jpg" }]
                    },
                    (error, result) => {
                        if (error) reject(error);
                        else resolve(result as CloudinaryUploadResult);
                    }
                ).end(buffer);
            } catch (error) {
                reject(error);
            }
        });

        // Wait for both uploads to complete
        const [videoResult, profileResult] = await Promise.all([videoUpload, profileUpload]);

        // Store submission in the database
        const submission = await prisma.submission.create({
            data: {
                publicId: videoResult.public_id,
                participantId: formData.get("participantId") as string,
                participantName: formData.get("participantName") as string,
                participantEmail: formData.get("participantEmail") as string,
                participantAge: formData.get("participantAge") as string,
                profilepic: profileResult.secure_url, // profile image URL
                video: videoResult.secure_url, // video URL
                participanTalent: formData.get("participanTalent") as string,
                postTitle: formData.get("postTitle") as string,
                description: formData.get("description") as string,
                duration: videoResult.duration || 0,
                originalSize: formData.get("originalSize") as string,
                compressedSize: String(videoResult.bytes),
            }
        });

        return NextResponse.json(submission);
    } catch (error) {
        console.error("Upload failed:", error);
        return NextResponse.json({ error: "Upload failed" }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}
