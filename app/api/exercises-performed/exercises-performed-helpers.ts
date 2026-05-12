import {
  AGE_RANGES,
  BODYWEIGHT_RANGES,
  EXERCISES_PERFORMED,
  GENDER,
  NON_STANDARD_EXERCISES_PERFORMED, UserWithProfile
} from '@/common/backend-types-and-constants'
import { ExercisePerformed, Prisma, Profile, Standard, User } from '@prisma/client'
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

function resolveStandardForQuantity(
  standards: Standard[],
  exerciseId: number,
  quantity: number
): Standard | undefined {
  return standards.find(
    (standard) =>
      standard.exerciseId === exerciseId &&
      standard.startRepRange <= quantity &&
      standard.endRepRange >= quantity
  )
}

function buildUpdatedExercise(
  exercise: UserSavedExercise,
  performed: ExercisePerformed,
  standard?: Standard
): UserSavedExercise {
  return {
    profileId: exercise.profileId,
    exerciseId: exercise.exerciseId,
    active: exercise.active,
    createdAt: exercise.createdAt,
    updatedAt: exercise.updatedAt,
    exercise: exercise.exercise,
    loggedExercise: standard
      ? ({ ...performed, ...standard } as UserSavedExercise['loggedExercise'])
      : (performed as UserSavedExercise['loggedExercise']),
  }
}

export const upsertNewExercisesPerformed = async ({tx, exercises, user, source}: { tx: TransactionClient, exercises: UserSavedExercise[], user: UserWithProfile, source: SAVED_EXERCISE_SOURCE_ENUM_VALUE }): Promise<UserSavedExercise[]> => {
  const exercisesWithQuantityEntered = exercises.filter(item => _.isNumber(item?.loggedExercise?.quantity))
  const standardExercises = exercisesWithQuantityEntered.filter(item => {
    return EXERCISES_PERFORMED.includes(item?.exercise?.exerciseName)
  })
  const nonStandardExercises = exercisesWithQuantityEntered.filter(item => {
    return NON_STANDARD_EXERCISES_PERFORMED.includes(item?.exercise?.exerciseName)
  })

  const updatedExercises: UserSavedExercise[] = []

  if (_.isArray(standardExercises) && standardExercises.length > 0) {
    updatedExercises.push(...await upsertNewStandardExercisesPerformed({tx, exercises: standardExercises, user, source}))
  }

  if (_.isArray(nonStandardExercises) && nonStandardExercises.length > 0) {
    updatedExercises.push(...await upsertNewNonStandardExercisesPerformed({tx, exercises: nonStandardExercises, user, source}))
  }

  return updatedExercises
}

/**
 * Upserts records for exercises with standards which are measured in REPS
 * @param tx
 * @param exercises
 * @param user
 * @param source
 */
export const upsertNewStandardExercisesPerformed = async ({tx, exercises, user, source}: { tx: TransactionClient, exercises: UserSavedExercise[], user: User & { profile: Profile }, source: SAVED_EXERCISE_SOURCE_ENUM_VALUE }): Promise<UserSavedExercise[]> => {
  const profile = user.profile as Profile
  const bodyWeightRange = findEnum(Object.keys(BODYWEIGHT_RANGES), profile.bodyWeight)
  const ageRange = findEnum(Object.keys(AGE_RANGES), profile.age)

  if (!bodyWeightRange || !ageRange) {
    console.error(`POST ExercisesPerformed missing data: bodyWeightEnum: ${bodyWeightRange}, ageEnum: ${ageRange}`)
    return []
  }

  const exerciseIds = Array.from(new Set(exercises.map((exercise) => exercise.exerciseId)))
  const standards = await tx.standard.findMany({
    where: {
      exerciseId: { in: exerciseIds },
      gender: GENDER[profile.gender],
      bodyWeight: BODYWEIGHT_RANGES[bodyWeightRange],
      ageRange: AGE_RANGES[ageRange],
    },
  })

  const promises = []
  for (const value of exercises) {
    const quantity = value?.loggedExercise?.quantity
    if (!_.isNumber(quantity)) {
      continue
    }

    const standard = resolveStandardForQuantity(standards, value.exerciseId, quantity)

    if (!standard) {
      console.error(
        `Issue fetching standard for exerciseId ${value.exerciseId} at quantity ${quantity} (gender ${GENDER[profile.gender]}, bodyWeight ${BODYWEIGHT_RANGES[bodyWeightRange]}, ageRange ${AGE_RANGES[ageRange]})`
      )
      continue
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
    }).then((performed) => buildUpdatedExercise(value, performed, standard))
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
export const upsertNewNonStandardExercisesPerformed = async ({tx, exercises, user, source}: { tx: TransactionClient, exercises: UserSavedExercise[], user: User & { profile: Profile }, source: SAVED_EXERCISE_SOURCE_ENUM_VALUE }): Promise<UserSavedExercise[]> => {
  const promises = []
  const exercisesWithReps = exercises.filter(item => {
    return _.isNumber(item?.loggedExercise?.quantity) && NON_STANDARD_EXERCISES_PERFORMED.includes(item?.exercise?.exerciseName)
  })

  for (const value of exercisesWithReps) {
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
    }).then((performed) => buildUpdatedExercise(value, performed))
    promises.push(promise)
  }
  return Promise.all(promises)
}