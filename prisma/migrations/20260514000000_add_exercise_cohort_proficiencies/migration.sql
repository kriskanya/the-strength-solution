CREATE TABLE "ExerciseCohortProficiency" (
    "exerciseId" INTEGER NOT NULL,
    "gender" "Gender" NOT NULL,
    "ageRange" "AgeRange" NOT NULL,
    "sampleSize" INTEGER NOT NULL,
    "noviceCount" INTEGER NOT NULL DEFAULT 0,
    "intermediateCount" INTEGER NOT NULL DEFAULT 0,
    "proficientCount" INTEGER NOT NULL DEFAULT 0,
    "advancedCount" INTEGER NOT NULL DEFAULT 0,
    "eliteCount" INTEGER NOT NULL DEFAULT 0,
    "computedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ExerciseCohortProficiency_pkey" PRIMARY KEY ("exerciseId","gender","ageRange")
);

ALTER TABLE "ExerciseCohortProficiency"
ADD CONSTRAINT "ExerciseCohortProficiency_exerciseId_fkey"
FOREIGN KEY ("exerciseId") REFERENCES "Exercise"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
