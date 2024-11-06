import prisma from '../../../lib/prisma'; // Adjust the path as necessary

export async function GET(req) {
  try {
    const leaderboard = await prisma.submission.findMany({
      orderBy: {
        voteCount: 'desc', // Sort by vote count descending
      },
      take: 10, // Fetch top 10 submissions
      select: {
        id: true,
        participantName: true,
        participantTalent: true,
        voteCount: true,
        createdAt: true,
      },
    });
    console.log(leaderboard);
    return new Response(JSON.stringify(leaderboard), { status: 200 });
  } catch (error) {
    console.error("Error fetching leaderboard:", error);
    return new Response(JSON.stringify({ message: 'Internal Server Error' }), { status: 500 });
  }
}
