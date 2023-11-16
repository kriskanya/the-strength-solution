import { FlattenedChosenExercise } from '@/common/shared-types'

export interface SaveStats {
  gender: 'MALE' | 'FEMALE',
  bodyWeight: number,
  age: number,
  exercises: FlattenedChosenExercise[],
  userId: number,
}