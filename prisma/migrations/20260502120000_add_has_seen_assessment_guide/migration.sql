-- AlterTable
ALTER TABLE "User" ADD COLUMN "hasSeenAssessmentGuide" BOOLEAN NOT NULL DEFAULT false;

-- Users who already existed before this feature are treated as onboarded
UPDATE "User" SET "hasSeenAssessmentGuide" = true;
