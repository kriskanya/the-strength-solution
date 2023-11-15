import { prisma } from '@/lib/prisma'
import _ from 'lodash'
import { UserSavedExercise } from '@/common/backend-types'
import { ExercisePerformed } from '@prisma/client'

/**
 * Fetches a user's saved exercises, including the associated Exercise record
 * and the number of reps
 * @param profileId
 */
export const fetchUsersExercises = async (profileId: number): Promise<UserSavedExercise[]> => {
  const user = await prisma.user.findFirst({
    where: { profileId }
  })
  const exercisesOnProfiles = await prisma.exercisesOnProfiles.findMany({
    where: { profileId },
    include: {
      exercise: true
    }
  })

  const sql = `
      SELECT DISTINCT ON ("ExercisePerformed"."exerciseId") *
      FROM "ExercisePerformed"
      INNER JOIN "Exercise"
      ON "ExercisePerformed"."exerciseId" = "Exercise".id
      WHERE "ExercisePerformed"."userId" = ${user?.id}
      ORDER BY "ExercisePerformed"."exerciseId", "ExercisePerformed"."datePerformed" DESC;
    `

  const exercisesPerformed = await prisma.$queryRawUnsafe(sql)

  let sortedData = exercisesOnProfiles
    .sort((a: any, b: any) => a.exercise.displayName.localeCompare(b.exercise.displayName))

  if (_.isArray(exercisesPerformed) && exercisesPerformed.length) {
    sortedData = sortedData
      .map((record: UserSavedExercise) => {
        const exercisePerformed = exercisesPerformed.find((e: ExercisePerformed) => e.exerciseId === record.exerciseId)
        record['reps'] = exercisePerformed?.reps
        return record
      })
  }

  return sortedData
}