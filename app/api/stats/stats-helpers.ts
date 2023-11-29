import { SAVED_EXERCISE_SOURCE_ENUM_VALUE, UserSavedExercise } from '@/common/shared-types'

export interface SaveStats {
  gender: 'MALE' | 'FEMALE',
  bodyWeight: number,
  age: number,
  exercises: UserSavedExercise[],
  userId: number,
  source: SAVED_EXERCISE_SOURCE_ENUM_VALUE
}