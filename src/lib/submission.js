"use server"

import { PrismaClient } from "@prisma/client"

export const fetchAllSubmission = async () => {
    const prisma = new PrismaClient()

    try {
        // Fetch all submissions
        const response = await prisma.submission.findMany()
        return response
    } catch (error) {
        console.error(error)
    } finally {
        prisma.$disconnect()
    }
}

export const fetchLeaderboard = async () => {
    const prisma = new PrismaClient()

    try {
        // Fetch top 10 submissions by vote count
        const leaderboard = await prisma.submission.findMany({
            orderBy: {
                voteCount: 'desc'
            },
            take: 10,
            select: {
                id: true,
                participantId: true,
                profilepic: true,
                participantName: true,
                participantTalent: true,
                voteCount: true,
                createdAt: true
            }
        })
        return leaderboard
    } catch (error) {
        console.error(error)
    } finally {
        prisma.$disconnect()
    }
}