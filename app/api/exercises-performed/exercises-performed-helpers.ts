import { AGE_RANGES, BODYWEIGHT_RANGES, GENDER } from '@/common/backend-types'
import { Prisma, Profile, User } from '@prisma/client'
import TransactionClient = Prisma.TransactionClient
import { ExercisesPerformedPayload } from '@/app/api/exercises-performed/exercises-performed.constants'

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

export const createNewExercisesPerformed = async ({tx, payload, user}: { tx: TransactionClient, payload: ExercisesPerformedPayload, user: User & { profile: Profile } }) => {
  let promises = []
  for (const [key, value] of Object.entries(payload)) {
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
        lte: value.reps
      },
      endRepRange: {
        gte: value.reps
      }
    }

    const standard = await tx.standard.findFirst({
      where
    })

    if (!standard) {
      console.error(`Issue fetching standard for following conditions: ${ JSON.stringify(where) }`)
      return
    }

    const promise = tx.exercisePerformed.create({
      data: {
        reps: value.reps,
        standardId: standard.id,
        userId: user.id,
        exerciseId: value.exerciseId,
        datePerformed: new Date()
      }
    })
    promises.push(promise)
  }
  return await Promise.all(promises)
}