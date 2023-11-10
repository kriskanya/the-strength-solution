import { Exercise, ExercisesOnProfiles } from '@prisma/client'

export interface ChosenExercise extends ExercisesOnProfiles {
  exercise: Exercise
}

export interface FlattenedChosenExercise extends ExercisesOnProfiles, Exercise {}