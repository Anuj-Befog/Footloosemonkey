import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');

    if (!email) {
        return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    try {
        const existingSubmission = await prisma.submission.findFirst({
            where: {
                participantEmail: email
            },
        });

        if (existingSubmission) {
            return NextResponse.json({ 
                success: true, 
                message: "User has an existing submission",
                submission: existingSubmission
            });
        } else {
            return NextResponse.json({ 
                success: false, 
                message: "No submission found for this user" 
            });
        }
    } catch (error) {
        console.error("Error checking submission:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}
