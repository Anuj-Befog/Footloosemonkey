-- CreateTable
CREATE TABLE "Submission" (
    "id" TEXT NOT NULL,
    "publicId" TEXT NOT NULL,
    "participantId" TEXT NOT NULL,
    "participantName" TEXT NOT NULL,
    "participantEmail" TEXT NOT NULL,
    "participantAge" TEXT NOT NULL,
    "participantAgeCriteria" TEXT NOT NULL,
    "partcipantAddress" TEXT NOT NULL,
    "participantNumber" TEXT NOT NULL,
    "participantCharge" TEXT NOT NULL,
    "participantPaymentID" TEXT NOT NULL,
    "participantPaymentStatus" TEXT NOT NULL,
    "profilepic" TEXT NOT NULL,
    "video" TEXT NOT NULL,
    "participanTalent" TEXT NOT NULL,
    "postTitle" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "duration" DOUBLE PRECISION NOT NULL,
    "originalSize" TEXT NOT NULL,
    "compressedSize" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "voteCount" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Submission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Vote" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "submission_id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Vote_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Submission_publicId_key" ON "Submission"("publicId");

-- CreateIndex
CREATE UNIQUE INDEX "Vote_userId_submission_id_key" ON "Vote"("userId", "submission_id");

-- AddForeignKey
ALTER TABLE "Vote" ADD CONSTRAINT "Vote_submission_id_fkey" FOREIGN KEY ("submission_id") REFERENCES "Submission"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
