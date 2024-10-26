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

    CONSTRAINT "Submission_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Submission_publicId_key" ON "Submission"("publicId");
