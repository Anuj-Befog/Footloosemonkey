import prisma from '../../../lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { userId, submissionId } = await req.json();

    // Check if the user has already voted on this submission
    const existingVote = await prisma.vote.findUnique({
      where: {
        userId_submissionId: {
          userId,
          submissionId,
        },
      },
    });

    if (existingVote) {
      // If the user has already voted, we delete the vote and decrement the count
      await prisma.$transaction(async (prisma) => {
        await prisma.vote.delete({
          where: { id: existingVote.id },
        });
        await prisma.submission.update({
          where: { id: submissionId },
          data: { voteCount: { decrement: 1 } },
        });
      });

      return NextResponse.json({
        message: "Vote removed",
        isVoted: false,
      });
    } else {
      // If the user has not voted, we add the vote and increment the count
      await prisma.$transaction(async (prisma) => {
        await prisma.vote.create({
          data: { userId, submissionId },
        });
        await prisma.submission.update({
          where: { id: submissionId },
          data: { voteCount: { increment: 1 } },
        });
      });

      return NextResponse.json({
        message: "Vote added",
        isVoted: true,
      });
    }
  } catch (error) {
    console.error("Error toggling vote:", error);
    return NextResponse.json({ error: "Failed to toggle vote" }, { status: 500 });
  }
}
