import prisma from '../../../lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { userId, submissionId } = await req.json(); // Get user ID and submission ID from the request body
    
    // Check if the user has already voted on this submission
    const existingVote = await prisma.vote.findUnique({
      where: {
        userId_submissionId: {
          userId,
          submissionId,
        },
      },
    });

    await prisma.$transaction(async (prisma) => {
      if (existingVote) {
        // User has already voted, so we delete the vote and decrement the count
        await prisma.vote.delete({
          where: { id: existingVote.id },
        });
        await prisma.submission.update({
          where: { id: submissionId },
          data: { voteCount: { decrement: 1 } },
        });
      } else {
        // User has not voted yet, so we create a new vote and increment the count
        await prisma.vote.create({
          data: { userId, submissionId },
        });
        await prisma.submission.update({
          where: { id: submissionId },
          data: { voteCount: { increment: 1 } },
        });
      }
    });

    // Send response indicating the vote status
    return NextResponse.json({
      message: existingVote ? "Vote removed" : "Vote added",
      isVoted: !existingVote,
    });
  } catch (error) {
    console.error("Error toggling vote:", error);
    return NextResponse.json({ error: "Failed to toggle vote" }, { status: 500 });
  }
}
