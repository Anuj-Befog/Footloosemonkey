// pages/api/leaderboard.js

import prisma from '../../../lib/prisma'; // Adjust the path as necessary

export default async function handler(req, res) {
  if (req.method === 'GET') {
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
      res.status(200).json(leaderboard);
    } catch (error) {
      console.error("Error fetching leaderboard:", error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
    // Handle any other HTTP method
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
