import { AGE_RANGES, BODYWEIGHT_RANGES, GENDER } from '@/common/backend-types'
import { Prisma, Profile, User } from '@prisma/client'
import TransactionClient = Prisma.TransactionClient
import { UserSavedExercise } from '@/common/shared-types'
import { prisma } from '@/lib/prisma'
import _ from 'lodash'

export const findEnum = (enums: string[], reps: number) => {
  let i = 0

  while (i < enums.length) {
    const bounds = enums[i].split('-')
    const lowerBound = +bounds[0]
    const upperBound = +bounds[1]

    if (reps >= lowerBound && reps <= upperBound) return enums[i]
    i++
  }
}

export const createNewExercisesPerformed = async ({tx, exercises, user}: { tx: TransactionClient, exercises: UserSavedExercise[], user: User & { profile: Profile } }) => {
  let promises = []
  const exercisesWithReps = exercises.filter(item => _.isNumber(item?.loggedExercise?.reps))
  for (const [key, value] of Object.entries(exercisesWithReps)) {
    const bodyWeightRange = findEnum(Object.keys(BODYWEIGHT_RANGES), (user?.profile as Profile).bodyWeight)
    const ageRange = findEnum(Object.keys(AGE_RANGES), (user?.profile as Profile).age)

    if (!bodyWeightRange || !ageRange) {
      console.error(`POST ExercisesPerformed missing data: bodyWeightEnum: ${bodyWeightRange}, ageEnum: ${ageRange}`)
      return
    }

    const where = {
      exerciseId: value.exerciseId,
      gender: GENDER[(user?.profile as Profile).gender],
      bodyWeight: BODYWEIGHT_RANGES[bodyWeightRange],
      ageRange: AGE_RANGES[ageRange],
      startRepRange: {
        lte: value?.loggedExercise?.reps
      },
      endRepRange: {
        gte: value?.loggedExercise?.reps
      }
    }

    const standard = await tx.standard.findFirst({
      where
    })

    if (!standard) {
      console.error(`Issue fetching standard for following conditions: ${ JSON.stringify(where) }`)
      return
    }

    const data = {
      // @ts-ignore
      reps: value.loggedExercise.reps,
        standardId: standard.id,
        userId: user.id,
        exerciseId: value.exerciseId,
        datePerformed: new Date()
    }
    debugger

    const promise = tx.exercisePerformed.create({
      data: {
        // @ts-ignore
        reps: value.loggedExercise.reps,
        standardId: standard.id,
        userId: user.id,
        exerciseId: value.exerciseId,
        datePerformed: new Date()
      }
    })
    promises.push(promise)
  }
  return Promise.all(promises)
}