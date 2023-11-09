-- CreateEnum
CREATE TYPE "Level" AS ENUM ('NOVICE', 'INTERMEDIATE', 'PROFICIENT', 'ADVANCED', 'ELITE');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE');

-- CreateEnum
CREATE TYPE "ExerciseName" AS ENUM ('BACK_EXTENSION', 'CHIN_UP', 'DIP', 'GOBLET_SQUAT', 'INVERTED_ROW', 'PULL_UP', 'PUSH_UP', 'BROAD_JUMP', 'HANG');

-- CreateEnum
CREATE TYPE "AgeRange" AS ENUM ('14-17', '18-23', '24-39', '40-49', '50-59', '60-69', '70-79', '80-89');

-- CreateEnum
CREATE TYPE "BodyWeightRange" AS ENUM ('90-99', '100-109', '110-119', '120-129', '130-139', '140-149', '150-159', '160-169', '170-179', '180-189', '190-199', '200-209', '210-219', '220-229', '230-239', '240-249', '250-259', '260-269', '270-279', '280-289', '290-299', '300-309', '310-319');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT,
    "firstName" TEXT,
    "lastName" TEXT,
    "fullName" TEXT,
    "imageUrl" TEXT,
    "profileId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Profile" (
    "id" SERIAL NOT NULL,
    "gender" "Gender" NOT NULL,
    "bodyWeight" INTEGER NOT NULL,
    "age" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExercisesOnProfiles" (
    "profileId" INTEGER NOT NULL,
    "exerciseId" INTEGER NOT NULL,
    "active" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ExercisesOnProfiles_pkey" PRIMARY KEY ("profileId","exerciseId")
);

-- CreateTable
CREATE TABLE "Exercise" (
    "id" SERIAL NOT NULL,
    "exerciseName" "ExerciseName" NOT NULL,
    "displayName" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Exercise_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Standard" (
    "id" SERIAL NOT NULL,
    "exerciseId" INTEGER NOT NULL,
    "level" "Level" NOT NULL,
    "bodyWeight" "BodyWeightRange" NOT NULL,
    "startRepRange" INTEGER NOT NULL,
    "endRepRange" INTEGER NOT NULL,
    "gender" "Gender" NOT NULL,
    "ageRange" "AgeRange" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Standard_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExercisePerformed" (
    "id" SERIAL NOT NULL,
    "reps" INTEGER NOT NULL,
    "standardId" INTEGER,
    "userId" INTEGER NOT NULL,
    "datePerformed" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ExercisePerformed_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_profileId_key" ON "User"("profileId");

-- CreateIndex
CREATE UNIQUE INDEX "ExercisePerformed_standardId_key" ON "ExercisePerformed"("standardId");

-- CreateIndex
CREATE UNIQUE INDEX "ExercisePerformed_userId_key" ON "ExercisePerformed"("userId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExercisesOnProfiles" ADD CONSTRAINT "ExercisesOnProfiles_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExercisesOnProfiles" ADD CONSTRAINT "ExercisesOnProfiles_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "Exercise"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Standard" ADD CONSTRAINT "Standard_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "Exercise"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExercisePerformed" ADD CONSTRAINT "ExercisePerformed_standardId_fkey" FOREIGN KEY ("standardId") REFERENCES "Standard"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExercisePerformed" ADD CONSTRAINT "ExercisePerformed_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
