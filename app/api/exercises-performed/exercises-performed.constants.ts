import { EXERCISE_ENUM_VALUE } from '@/common/backend-types'

export interface CreateExercisesPerformed {
  userId: number,
  payload: ExercisesPerformedPayload
}

export type ExercisesPerformedPayload = {
  [key in EXERCISE_ENUM_VALUE]: {
    reps: number
    exerciseId: number
  }
}
