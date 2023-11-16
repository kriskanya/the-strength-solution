import { Exercise, ExercisesOnProfiles } from '@prisma/client'

export interface ChosenExercise extends ExercisesOnProfiles {
  exercise: Exercise
}

export interface FlattenedChosenExercise extends ExercisesOnProfiles, Exercise {
  reps?: number
}

export type EXERCISE_ENUM_VALUE = 'PUSH_UP' | 'INVERTED_ROW' | 'DIP' | 'CHIN_UP' | 'PULL_UP' | 'GOBLET_SQUAT' | 'BACK_EXTENSION'

/**
 * e.g.,
 * {
 *     "PUSH_UP": {
 *         "reps": 1,
 *         "exerciseId": 1
 *     }
 * }
 */
export type ExercisesPerformedPayload = {
  [key in EXERCISE_ENUM_VALUE]: {
    reps: number
    exerciseId: number
  }
}