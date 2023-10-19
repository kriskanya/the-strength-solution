-- CreateEnum
CREATE TYPE "Level" AS ENUM ('NOVICE', 'INTERMEDIATE', 'PROFICIENT', 'ADVANCED', 'ELITE');

-- CreateEnum
CREATE TYPE "Operator" AS ENUM ('GREATER_THAN', 'LESS_THAN', 'EQUAL_TO');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE');

-- CreateTable
CREATE TABLE "Standard" (
    "id" SERIAL NOT NULL,
    "exercise" TEXT NOT NULL,
    "level" "Level" NOT NULL,
    "weight" INTEGER NOT NULL,
    "reps" INTEGER NOT NULL,
    "gender" "Gender" NOT NULL,
    "age" INTEGER NOT NULL,
    "operator" "Operator" NOT NULL DEFAULT 'EQUAL_TO',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Standard_pkey" PRIMARY KEY ("id")
);
