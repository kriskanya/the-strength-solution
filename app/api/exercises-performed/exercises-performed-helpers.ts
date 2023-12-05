import {
  AGE_RANGES,
  BODYWEIGHT_RANGES,
  EXERCISES_PERFORMED,
  GENDER,
  NON_STANDARD_EXERCISES_PERFORMED, UserWithProfile
} from '@/common/backend-types-and-constants'
import { Prisma, Profile, User } from '@prisma/client'
import TransactionClient = Prisma.TransactionClient
import { SAVED_EXERCISE_SOURCE_ENUM_VALUE, UserSavedExercise } from '@/common/shared-types-and-constants'
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

export const upsertNewExercisesPerformed = async ({tx, exercises, user, source}: { tx: TransactionClient, exercises: UserSavedExercise[], user: UserWithProfile, source: SAVED_EXERCISE_SOURCE_ENUM_VALUE }) => {
  const exercisesWithQuantityEntered = exercises.filter(item => _.isNumber(item?.loggedExercise?.quantity))
  const standardExercises = exercisesWithQuantityEntered.filter(item => {
    return EXERCISES_PERFORMED.includes(item?.exercise?.exerciseName)
  })
  const nonStandardExercises = exercisesWithQuantityEntered.filter(item => {
    return NON_STANDARD_EXERCISES_PERFORMED.includes(item?.exercise?.exerciseName)
  })

  if (_.isArray(standardExercises) && standardExercises.length > 0) {
    await upsertNewStandardExercisesPerformed({tx, exercises: standardExercises, user, source})
  }

  if (_.isArray(nonStandardExercises) && nonStandardExercises.length > 0) {
    await upsertNewNonStandardExercisesPerformed({tx, exercises: nonStandardExercises, user, source})
  }
}

/**
 * Upserts records for exercises with standards which are measured in REPS
 * @param tx
 * @param exercises
 * @param user
 * @param source
 */
export const upsertNewStandardExercisesPerformed = async ({tx, exercises, user, source}: { tx: TransactionClient, exercises: UserSavedExercise[], user: User & { profile: Profile }, source: SAVED_EXERCISE_SOURCE_ENUM_VALUE }) => {
  let promises = []
  for (const [key, value] of Object.entries(exercises)) {
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
        lte: value?.loggedExercise?.quantity
      },
      endRepRange: {
        gte: value?.loggedExercise?.quantity
      }
    }

    const standard = await tx.standard.findFirst({
      where
    })

    if (!standard) {
      console.error(`Issue fetching standard for following conditions: ${ JSON.stringify(where) }`)
      return
    }

    const promise = tx.exercisePerformed.upsert({
      where: {id: value?.loggedExercise?.id || 0}, // prisma upsert fails if the id is `undefined`
      update: {
        // @ts-ignore
        quantity: value.loggedExercise.quantity,
        standardId: standard.id,
      },
      create: {
        // @ts-ignore
        quantity: value.loggedExercise?.quantity,
        standardId: standard.id,
        userId: user.id,
        exerciseId: value.exerciseId,
        datePerformed: new Date(),
        source
      }
    })
    promises.push(promise)
  }
  return Promise.all(promises)
}

/**
 * Upserts records for exercises without standards which are measured in SECONDS, INCHES, or POUNDS_PER_HAND
 * @param tx
 * @param exercises
 * @param user
 * @param source
 */
export const upsertNewNonStandardExercisesPerformed = async ({tx, exercises, user, source}: { tx: TransactionClient, exercises: UserSavedExercise[], user: User & { profile: Profile }, source: SAVED_EXERCISE_SOURCE_ENUM_VALUE }) => {
  let promises = []
  const exercisesWithReps = exercises.filter(item => {
    return _.isNumber(item?.loggedExercise?.quantity) && NON_STANDARD_EXERCISES_PERFORMED.includes(item?.exercise?.exerciseName)
  })

  for (const [key, value] of Object.entries(exercisesWithReps)) {
    const promise = tx.exercisePerformed.upsert({
      where: {id: value?.loggedExercise?.id || 0}, // prisma upsert fails if the id is `undefined`
      update: {
        // @ts-ignore
        quantity: value.loggedExercise.quantity,
      },
      create: {
        // @ts-ignore
        quantity: value.loggedExercise.quantity,
        userId: user.id,
        exerciseId: value.exerciseId,
        source,
        datePerformed: new Date()
      }
    })
    promises.push(promise)
  }
  return Promise.all(promises)
}