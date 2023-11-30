import { SAVED_EXERCISE_SOURCE_ENUM_VALUE, UserSavedExercise } from '@/common/shared-types-and-constants'

export interface SaveStats {
  gender: 'MALE' | 'FEMALE',
  bodyWeight: number,
  age: number,
  exercises: UserSavedExercise[],
  userId: number,
  source: SAVED_EXERCISE_SOURCE_ENUM_VALUE
}