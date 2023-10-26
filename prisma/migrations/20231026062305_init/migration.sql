-- CreateEnum
CREATE TYPE "Level" AS ENUM ('NOVICE', 'INTERMEDIATE', 'PROFICIENT', 'ADVANCED', 'ELITE');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE');

-- CreateEnum
CREATE TYPE "ExerciseName" AS ENUM ('BACK_EXTENSION', 'CHIN_UP', 'DIP', 'GOBLET_SQUAT', 'INVERTED_ROW', 'PULL_UP', 'PUSH_UP', 'BROAD_JUMP', 'HANG');

-- CreateEnum
CREATE TYPE "AgeRange" AS ENUM ('14-17', '18-23', '24-39', '40-49', '50-59', '60-69', '70-79', '80-89');

-- CreateEnum
CREATE TYPE "WeightRange" AS ENUM ('90-99', '100-109', '110-119', '120-129', '130-139', '140-149', '150-159', '160-169', '170-179', '180-189', '190-199', '200-209', '210-219', '220-229', '230-239', '240-249', '250-259', '260-269', '270-279', '280-289', '290-299', '300-309', '310-319');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT,
    "firstName" TEXT,
    "lastName" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Standard" (
    "id" SERIAL NOT NULL,
    "exercise" "ExerciseName" NOT NULL,
    "level" "Level" NOT NULL,
    "weight" "WeightRange" NOT NULL,
    "reps" INTEGER NOT NULL,
    "gender" "Gender" NOT NULL,
    "ageRange" "AgeRange" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Standard_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
