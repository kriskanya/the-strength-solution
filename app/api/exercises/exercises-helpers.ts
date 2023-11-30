import { prisma } from '@/lib/prisma'
import _ from 'lodash'
import { ExercisePerformed, Prisma } from '@prisma/client'
import { UserSavedExercise } from '@/common/shared-types-and-constants'
import TransactionClient = Prisma.TransactionClient

/**
 * Fetches a user's most recent saved exercises, including the associated Exercise record
 * and the number of reps
 * @param profileId
 */
export const fetchMostRecentLoggedExercises = async (profileId: number): Promise<UserSavedExercise[]> => {
  const user = await prisma.user.findFirst({
    where: { profileId }
  })
  const exercisesOnProfiles = await prisma.exercisesOnProfiles.findMany({
    where: { profileId },
    include: {
      exercise: true
    }
  })

  const sql = `SELECT *, "ExercisePerformed".id, "ExercisePerformed"."exerciseId" FROM "ExercisePerformed"
      INNER JOIN "Exercise" ON "ExercisePerformed"."exerciseId" = "Exercise".id
      LEFT OUTER JOIN "Standard" ON "ExercisePerformed"."standardId" = "Standard".id
      WHERE "ExercisePerformed"."userId" = 2 AND "ExercisePerformed"."source" = 'UPDATE_STATS'
      ORDER BY "ExercisePerformed"."exerciseId", "ExercisePerformed"."datePerformed" DESC;
  `
  const exercisesPerformed = await prisma.$queryRawUnsafe(sql)

  let sortedData = exercisesOnProfiles
    .sort((a: any, b: any) => a.exercise.displayName.localeCompare(b.exercise.displayName))

  sortedData = sortedData
    .map((record: UserSavedExercise) => {
      if (_.isArray(exercisesPerformed) && exercisesPerformed.length) {
        const res = exercisesPerformed.find((e: ExercisePerformed) => e.exerciseId === record.exerciseId)
        record.loggedExercise = res
      } else {
        // @ts-ignore
        record.loggedExercise = { quantity: null }
      }
      return record
    })

  return sortedData
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