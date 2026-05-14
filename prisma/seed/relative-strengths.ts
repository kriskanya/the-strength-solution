import {
  AgeRange,
  BodyWeightRange,
  Exercise,
  ExerciseName,
  Gender,
  Level,
  Prisma,
} from '@prisma/client'

import { ExerciseRecordPayload, StrengthStandardRecord } from '../../common/backend-types-and-constants'
import { rebuildExerciseCohortProficiencies } from '../../lib/cohort-proficiencies'
import { prisma } from '../../lib/prisma'
import { createExerciseSeedValues, createStandardSeedValues } from './standards'

const SEED_EMAIL_DOMAIN = 'relative-strengths.local'
const SEED_USER_COUNT = 20
const SEED_PROFILE = {
  age: 32,
  bodyWeight: 185,
  gender: Gender.MALE,
  height: 70,
}
const SEED_AGE_RANGE = AgeRange.TWENTY_FOUR_TO_THIRTY_NINE
const SEED_BODYWEIGHT_RANGE = BodyWeightRange.ONE_HUNDRED_EIGHTY
const PROFICIENCY_LEVELS: Level[] = [
  Level.NOVICE,
  Level.INTERMEDIATE,
  Level.PROFICIENT,
  Level.ADVANCED,
  Level.ELITE,
]
const NON_STANDARD_EXERCISE_NAMES: ExerciseName[] = [
  ExerciseName.BROAD_JUMP,
  ExerciseName.DEAD_HANG,
  ExerciseName.FARMER_CARRY,
]
const NON_STANDARD_QUANTITIES: Record<ExerciseName, Record<Level, number>> = {
  BACK_EXTENSION: {} as Record<Level, number>,
  BROAD_JUMP: {
    NOVICE: SEED_PROFILE.height - 2,
    INTERMEDIATE: SEED_PROFILE.height - 1,
    PROFICIENT: SEED_PROFILE.height,
    ADVANCED: SEED_PROFILE.height + 1,
    ELITE: SEED_PROFILE.height + 2,
  },
  CHIN_UP: {} as Record<Level, number>,
  DEAD_HANG: {
    NOVICE: 30,
    INTERMEDIATE: 60,
    PROFICIENT: 90,
    ADVANCED: 120,
    ELITE: 180,
  },
  DIP: {} as Record<Level, number>,
  FARMER_CARRY: {
    NOVICE: 10,
    INTERMEDIATE: Math.round(SEED_PROFILE.bodyWeight * 0.25),
    PROFICIENT: Math.round(SEED_PROFILE.bodyWeight * 0.5),
    ADVANCED: Math.round(SEED_PROFILE.bodyWeight * 0.75),
    ELITE: SEED_PROFILE.bodyWeight,
  },
  GOBLET_SQUAT: {} as Record<Level, number>,
  INVERTED_ROW: {} as Record<Level, number>,
  PULL_UP: {} as Record<Level, number>,
  PUSH_UP: {} as Record<Level, number>,
}

function seedEmail(index: number) {
  return `relative-strengths-peer-${String(index).padStart(2, '0')}@${SEED_EMAIL_DOMAIN}`
}

function isStandardExercise(exerciseName: ExerciseName) {
  return !NON_STANDARD_EXERCISE_NAMES.includes(exerciseName)
}

function standardKey(exerciseId: number, level: Level) {
  return `${exerciseId}:${level}`
}

async function ensureExercisesAndStandards() {
  const exerciseSeedValues: ExerciseRecordPayload[] = createExerciseSeedValues()

  for (const exerciseSeedValue of exerciseSeedValues) {
    const existingExercise = await prisma.exercise.findFirst({
      where: { exerciseName: exerciseSeedValue.exerciseName },
    })

    if (!existingExercise) {
      await prisma.exercise.create({ data: exerciseSeedValue })
    }
  }

  const standardCount = await prisma.standard.count()

  if (standardCount > 0) {
    return
  }

  const exerciseRecords = await prisma.exercise.findMany()
  const standardSeedValues: StrengthStandardRecord[] = await createStandardSeedValues(exerciseRecords)

  await prisma.standard.createMany({
    data: standardSeedValues,
  })
}

async function deleteExistingSeedUsers(tx: Prisma.TransactionClient) {
  const existingUsers = await tx.user.findMany({
    where: { email: { endsWith: `@${SEED_EMAIL_DOMAIN}` } },
    select: {
      id: true,
      profileId: true,
    },
  })

  if (existingUsers.length === 0) {
    return
  }

  const userIds = existingUsers.map(({ id }) => id)
  const profileIds = existingUsers
    .map(({ profileId }) => profileId)
    .filter((profileId): profileId is number => profileId !== null)

  await tx.exercisePerformed.deleteMany({
    where: { userId: { in: userIds } },
  })
  await tx.exercisesOnProfiles.deleteMany({
    where: { profileId: { in: profileIds } },
  })
  await tx.user.deleteMany({
    where: { id: { in: userIds } },
  })
  await tx.profile.deleteMany({
    where: { id: { in: profileIds } },
  })
}

function createStandardLookup(standards: { exerciseId: number, level: Level, id: number, startRepRange: number }[]) {
  return standards.reduce((lookup, standard) => {
    lookup.set(standardKey(standard.exerciseId, standard.level), standard)

    return lookup
  }, new Map<string, { id: number, startRepRange: number }>())
}

function resolveSeedQuantity({
  exercise,
  exerciseIndex,
  standardLookup,
  userIndex,
}: {
  exercise: Exercise
  exerciseIndex: number
  standardLookup: Map<string, { id: number, startRepRange: number }>
  userIndex: number
}) {
  const level = PROFICIENCY_LEVELS[(userIndex + exerciseIndex) % PROFICIENCY_LEVELS.length]

  if (!isStandardExercise(exercise.exerciseName)) {
    return {
      quantity: NON_STANDARD_QUANTITIES[exercise.exerciseName][level],
      standardId: null,
    }
  }

  const standard = standardLookup.get(standardKey(exercise.id, level))

  if (!standard) {
    throw new Error(`Missing standard for ${exercise.exerciseName} at ${level}`)
  }

  return {
    quantity: standard.startRepRange,
    standardId: standard.id,
  }
}

async function createSeedUsers(tx: Prisma.TransactionClient) {
  const exercises = await tx.exercise.findMany({
    orderBy: { id: 'asc' },
  })
  const standardExerciseIds = exercises
    .filter((exercise) => isStandardExercise(exercise.exerciseName))
    .map((exercise) => exercise.id)
  const standards = await tx.standard.findMany({
    where: {
      ageRange: SEED_AGE_RANGE,
      bodyWeight: SEED_BODYWEIGHT_RANGE,
      exerciseId: { in: standardExerciseIds },
      gender: SEED_PROFILE.gender,
    },
    select: {
      exerciseId: true,
      id: true,
      level: true,
      startRepRange: true,
    },
  })
  const standardLookup = createStandardLookup(standards)
  const now = new Date()

  for (let userIndex = 0; userIndex < SEED_USER_COUNT; userIndex += 1) {
    const user = await tx.user.create({
      data: {
        email: seedEmail(userIndex + 1),
        firstName: 'Relative',
        fullName: `Relative Strength Peer ${userIndex + 1}`,
        hasSeenAssessmentGuide: true,
        lastName: `Peer ${userIndex + 1}`,
        profile: {
          create: SEED_PROFILE,
        },
      },
      include: {
        profile: true,
      },
    })

    if (!user.profileId) {
      throw new Error(`Missing profile for seeded user ${user.email}`)
    }

    await tx.exercisesOnProfiles.createMany({
      data: exercises.map((exercise) => ({
        active: true,
        exerciseId: exercise.id,
        profileId: user.profileId as number,
      })),
    })

    await tx.exercisePerformed.createMany({
      data: exercises.map((exercise, exerciseIndex) => {
        const { quantity, standardId } = resolveSeedQuantity({
          exercise,
          exerciseIndex,
          standardLookup,
          userIndex,
        })

        return {
          datePerformed: new Date(now.getTime() - userIndex * 60_000),
          exerciseId: exercise.id,
          quantity,
          source: 'UPDATE_STATS',
          standardId,
          userId: user.id,
        }
      }),
    })
  }
}

async function main() {
  await ensureExercisesAndStandards()

  await prisma.$transaction(async (tx) => {
    await deleteExistingSeedUsers(tx)
    await createSeedUsers(tx)
  })

  const result = await rebuildExerciseCohortProficiencies()

  console.log(`Seeded ${SEED_USER_COUNT} relative strengths peer users and rebuilt ${result.cohortCount} cohort rows from ${result.sourceRowCount} latest performed rows.`)
}

main()
  .catch((err) => {
    console.error(err)
    process.exitCode = 1
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
