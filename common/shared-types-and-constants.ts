import { Exercise, ExercisePerformed, ExercisesOnProfiles, Standard } from '@prisma/client'

export interface ChosenExercise extends ExercisesOnProfiles {
  exercise: Exercise
}

/**
 * ExercisesOnProfiles record joined with exercise and loggedExercise
 */
export interface UserSavedExercise extends ExercisesOnProfiles {
  exercise: Exercise,
  loggedExercise?: ExercisePerformed & Standard
  source?: SAVED_EXERCISE_SOURCE_ENUM_VALUE
}

export type EXERCISE_ENUM_VALUE = 'PUSH_UP' | 'INVERTED_ROW' | 'DIP' | 'CHIN_UP' | 'PULL_UP' | 'GOBLET_SQUAT' | 'BACK_EXTENSION' | 'DEAD_HANG' | 'BROAD_JUMP' | 'FARMER_CARRY'
export type UNIT_OF_MEASUREMENT_ENUM_VALUE = 'REPS' | 'SECONDS' | 'INCHES' | 'POUNDS_PER_HAND'
export type SAVED_EXERCISE_SOURCE_ENUM_VALUE = 'UPDATE_STATS' | 'LOG_EXERCISE'
export type PROFICIENCY_LEVELS = 'NOVICE' | 'INTERMEDIATE' | 'PROFICIENT' | 'ADVANCED' | 'ELITE'

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

export const NON_STANDARD_EXERCISES = ['BROAD_JUMP', 'DEAD_HANG', 'FARMER_CARRY']
export const PROFICIENCY_LEVELS_ASC = ['NOVICE', 'INTERMEDIATE', 'PROFICIENT', 'ADVANCED', 'ELITE']
export const PROFICIENCY_LEVELS_DESC = ['ELITE', 'ADVANCED', 'PROFICIENT', 'INTERMEDIATE', 'NOVICE']