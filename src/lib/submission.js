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