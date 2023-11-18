import { UserSavedExercise } from '@/common/shared-types'

export interface SaveStats {
  gender: 'MALE' | 'FEMALE',
  bodyWeight: number,
  age: number,
  exercises: UserSavedExercise[],
  userId: number,
}