import { prisma } from '@/lib/prisma'
import {
  Exercise,
  ExercisePerformed,
  ExercisePerformedSource,
  ExercisesOnProfiles,
  Gender,
  Level,
  Prisma,
  Standard,
  UnitOfMeasurementForExercise,
} from '@prisma/client'
import { UserSavedExercise } from '@/common/shared-types-and-constants'
import { ExerciseActiveChange } from '@/app/api/exercises/choose/choose-active.validation'
import TransactionClient = Prisma.TransactionClient

type LatestLoggedExerciseRow = {
  profileId: number
  exerciseId: number
  active: boolean
  eopCreatedAt: Date
  eopUpdatedAt: Date
  exerciseRecordId: number
  exerciseName: string
  displayName: string
  description: string
  unitOfMeasurement: UnitOfMeasurementForExercise
  exerciseCreatedAt: Date
  exerciseUpdatedAt: Date
  performedId: number | null
  quantity: number | null
  standardId: number | null
  performedUserId: number | null
  performedExerciseId: number | null
  datePerformed: Date | null
  performedSource: ExercisePerformedSource | null
  performedCreatedAt: Date | null
  performedUpdatedAt: Date | null
  standardRecordId: number | null
  level: Level | null
  standardExerciseId: number | null
  standardBodyWeight: string | null
  standardStartRepRange: number | null
  standardEndRepRange: number | null
  standardGender: Gender | null
  standardAgeRange: string | null
  standardCreatedAt: Date | null
  standardUpdatedAt: Date | null
}

export const profileHasChosenWorkouts = async (profileId: number): Promise<boolean> => {
  if (!profileId) return false

  const row = await prisma.exercisesOnProfiles.findFirst({
    where: { profileId },
    select: { profileId: true },
  })

  return row !== null
}

function mapLatestLoggedExerciseRow(row: LatestLoggedExerciseRow): UserSavedExercise {
  const exercise: Exercise = {
    id: row.exerciseRecordId,
    exerciseName: row.exerciseName as Exercise['exerciseName'],
    displayName: row.displayName,
    description: row.description,
    unitOfMeasurement: row.unitOfMeasurement,
    createdAt: row.exerciseCreatedAt,
    updatedAt: row.exerciseUpdatedAt,
  }

  const exercisesOnProfiles: ExercisesOnProfiles = {
    profileId: row.profileId,
    exerciseId: row.exerciseId,
    active: row.active,
    createdAt: row.eopCreatedAt,
    updatedAt: row.eopUpdatedAt,
  }

  let loggedExercise: UserSavedExercise['loggedExercise']

  if (row.performedId === null || row.quantity === null) {
    loggedExercise = { quantity: null } as unknown as UserSavedExercise['loggedExercise']
  } else {
    const performed: ExercisePerformed = {
    id: row.performedId,
    quantity: row.quantity,
    standardId: row.standardId,
    userId: row.performedUserId as number,
    exerciseId: row.performedExerciseId as number,
    datePerformed: row.datePerformed as Date,
    source: row.performedSource as ExercisePerformedSource,
    createdAt: row.performedCreatedAt as Date,
    updatedAt: row.performedUpdatedAt as Date,
  }

  const standardFields: Partial<Standard> =
    row.standardRecordId === null
      ? {}
      : {
          id: row.standardRecordId,
          exerciseId: row.standardExerciseId as number,
          level: row.level as Level,
          bodyWeight: row.standardBodyWeight as Standard['bodyWeight'],
          startRepRange: row.standardStartRepRange as number,
          endRepRange: row.standardEndRepRange as number,
          gender: row.standardGender as Gender,
          ageRange: row.standardAgeRange as Standard['ageRange'],
          createdAt: row.standardCreatedAt as Date,
          updatedAt: row.standardUpdatedAt as Date,
        }

    loggedExercise = {
      ...performed,
      ...standardFields,
    } as UserSavedExercise['loggedExercise']
  }

  return {
    ...exercisesOnProfiles,
    exercise,
    loggedExercise,
  }
}

/**
 * Fetches a user's most recent saved exercises, including the associated Exercise record
 * and the number of reps
 * @param profileId
 */
export const fetchMostRecentLoggedExercises = async (profileId: number): Promise<UserSavedExercise[] | undefined> => {
  if (!profileId) return

  const user = await prisma.user.findFirst({
    where: { profileId },
    select: { id: true },
  })

  if (!user) {
    throw new Error(`No user found for profile ${profileId}`)
  }

  const rows = await prisma.$queryRaw<LatestLoggedExerciseRow[]>(Prisma.sql`
    SELECT
      eop."profileId" AS "profileId",
      eop."exerciseId" AS "exerciseId",
      eop."active" AS "active",
      eop."createdAt" AS "eopCreatedAt",
      eop."updatedAt" AS "eopUpdatedAt",
      e."id" AS "exerciseRecordId",
      e."exerciseName"::text AS "exerciseName",
      e."displayName" AS "displayName",
      e."description" AS "description",
      e."unitOfMeasurement"::text AS "unitOfMeasurement",
      e."createdAt" AS "exerciseCreatedAt",
      e."updatedAt" AS "exerciseUpdatedAt",
      latest."performedId" AS "performedId",
      latest."quantity" AS "quantity",
      latest."standardId" AS "standardId",
      latest."performedUserId" AS "performedUserId",
      latest."performedExerciseId" AS "performedExerciseId",
      latest."datePerformed" AS "datePerformed",
      latest."performedSource"::text AS "performedSource",
      latest."performedCreatedAt" AS "performedCreatedAt",
      latest."performedUpdatedAt" AS "performedUpdatedAt",
      latest."standardRecordId" AS "standardRecordId",
      latest."level"::text AS "level",
      latest."standardExerciseId" AS "standardExerciseId",
      latest."standardBodyWeight"::text AS "standardBodyWeight",
      latest."standardStartRepRange" AS "standardStartRepRange",
      latest."standardEndRepRange" AS "standardEndRepRange",
      latest."standardGender"::text AS "standardGender",
      latest."standardAgeRange"::text AS "standardAgeRange",
      latest."standardCreatedAt" AS "standardCreatedAt",
      latest."standardUpdatedAt" AS "standardUpdatedAt"
    FROM "ExercisesOnProfiles" eop
    INNER JOIN "Exercise" e ON e."id" = eop."exerciseId"
    INNER JOIN "User" u ON u."profileId" = eop."profileId"
    LEFT JOIN LATERAL (
      SELECT
        ep."id" AS "performedId",
        ep."quantity" AS "quantity",
        ep."standardId" AS "standardId",
        ep."userId" AS "performedUserId",
        ep."exerciseId" AS "performedExerciseId",
        ep."datePerformed" AS "datePerformed",
        ep."source" AS "performedSource",
        ep."createdAt" AS "performedCreatedAt",
        ep."updatedAt" AS "performedUpdatedAt",
        st."id" AS "standardRecordId",
        st."level" AS "level",
        st."exerciseId" AS "standardExerciseId",
        st."bodyWeight" AS "standardBodyWeight",
        st."startRepRange" AS "standardStartRepRange",
        st."endRepRange" AS "standardEndRepRange",
        st."gender" AS "standardGender",
        st."ageRange" AS "standardAgeRange",
        st."createdAt" AS "standardCreatedAt",
        st."updatedAt" AS "standardUpdatedAt"
      FROM "ExercisePerformed" ep
      LEFT JOIN "Standard" st ON st."id" = ep."standardId"
      WHERE ep."userId" = u."id"
        AND ep."exerciseId" = eop."exerciseId"
        AND ep."source" = 'UPDATE_STATS'::"ExercisePerformedSource"
      ORDER BY ep."datePerformed" DESC, ep."id" DESC
      LIMIT 1
    ) latest ON true
    WHERE eop."profileId" = ${profileId}
    ORDER BY e."displayName" ASC
  `)

  return rows.map(mapLatestLoggedExerciseRow)
}

export const saveActiveExerciseChanges = async ({
  tx,
  profileId,
  changes,
}: {
  tx: TransactionClient
  profileId: number
  changes: ExerciseActiveChange[]
}) => {
  if (!profileId || changes.length === 0) {
    return
  }

  const promises = changes.map((change) =>
    tx.exercisesOnProfiles.upsert({
      where: { profileId_exerciseId: { profileId, exerciseId: change.exerciseId } },
      update: {
        active: change.active,
      },
      create: {
        profileId,
        exerciseId: change.exerciseId,
        active: change.active,
      },
    })
  )

  await Promise.all(promises)
}

export const saveChosenExercises = async ({tx, exercises, profileId}: { tx: TransactionClient, exercises: UserSavedExercise[], profileId: number }) => {
  if (!profileId) {
    console.log('No profileId provided for saveChosenExercises')
    return
  }

  const promises = exercises.map((payload: UserSavedExercise) => {
    const active = payload.active

    return tx.exercisesOnProfiles.upsert({
      where: { profileId_exerciseId: { profileId, exerciseId: payload.exercise.id } },
      update: {
        active
      },
      create: ({
        profileId,
        exerciseId: payload.exercise.id,
        active
      })
    })
  })

  await Promise.all(promises)
}

export interface InitialChooseExercises {
  profileId: number,
  exercises: UserSavedExercise[]
}
