import {
  AgeRange,
  ExerciseName,
  Gender,
  Level,
  BodyWeightRange,
  ExercisesOnProfiles,
  Exercise,
} from '@prisma/client'

export interface StrengthStandardRecord {
  bodyWeight: BodyWeightRange,
  startRepRange: number,
  endRepRange: number,
  level: Level,
  ageRange: AgeRange,
  gender: Gender,
  exerciseId: number
}

/* mapping values -> ENUMs */

export const LEVEL: any = {
  0: Level.NOVICE,
  1: Level.INTERMEDIATE,
  2: Level.PROFICIENT,
  3: Level.ADVANCED,
  4: Level.ELITE
}

export const AGE_RANGES: any = {
  '14-17': AgeRange.FOURTEEN_TO_SEVENTEEN,
  '18-23': AgeRange.EIGHTEEN_TO_TWENTY_THREE,
  '24-39': AgeRange.TWENTY_FOUR_TO_THIRTY_NINE,
  '40-49': AgeRange.FORTY_TO_FORTY_NINE,
  '50-59': AgeRange.FIFTY_TO_FIFTY_NINE,
  '60-69': AgeRange.SIXTY_TO_SIXTY_NINE,
  '70-79': AgeRange.SEVENTY_TO_SEVENTY_NINE,
  '80-89': AgeRange.EIGHTY_TO_EIGHTY_NINE
}

export const BODYWEIGHT_RANGES: any = {
  '90-99'  : BodyWeightRange.NINETY,
  '100-109': BodyWeightRange.ONE_HUNDRED,
  '110-119': BodyWeightRange.ONE_HUNDRED_TEN,
  '120-129': BodyWeightRange.ONE_HUNDRED_TWENTY,
  '130-139': BodyWeightRange.ONE_HUNDRED_THIRTY,
  '140-149': BodyWeightRange.ONE_HUNDRED_FORTY,
  '150-159': BodyWeightRange.ONE_HUNDRED_FIFTY,
  '160-169': BodyWeightRange.ONE_HUNDRED_SIXTY,
  '170-179': BodyWeightRange.ONE_HUNDRED_SEVENTY,
  '180-189': BodyWeightRange.ONE_HUNDRED_EIGHTY,
  '190-199': BodyWeightRange.ONE_HUNDRED_NINETY,
  '200-209': BodyWeightRange.TWO_HUNDRED,
  '210-219': BodyWeightRange.TWO_HUNDRED_TEN,
  '220-229': BodyWeightRange.TWO_HUNDRED_TWENTY,
  '230-239': BodyWeightRange.TWO_HUNDRED_THIRTY,
  '240-249': BodyWeightRange.TWO_HUNDRED_FORTY,
  '250-259': BodyWeightRange.TWO_HUNDRED_FIFTY,
  '260-269': BodyWeightRange.TWO_HUNDRED_SIXTY,
  '270-279': BodyWeightRange.TWO_HUNDRED_SEVENTY,
  '280-289': BodyWeightRange.TWO_HUNDRED_EIGHTY,
  '290-299': BodyWeightRange.TWO_HUNDRED_NINETY,
  '300-309': BodyWeightRange.THREE_HUNDRED,
  '310-319': BodyWeightRange.THREE_HUNDRED_TEN
}

export const GENDER: any = {
  'FEMALE': Gender.FEMALE,
  'MALE': Gender.MALE
}

export const EXERCISE_NAME: any = {
  'PUSH-UP': ExerciseName.PUSH_UP,
  'INVERTED ROW': ExerciseName.INVERTED_ROW,
  'DIP': ExerciseName.DIP,
  'CHIN-UP': ExerciseName.CHIN_UP,
  'PULL-UP': ExerciseName.PULL_UP,
  'GOBLET SQUAT': ExerciseName.GOBLET_SQUAT,
  'BACK EXTENSIONS': ExerciseName.BACK_EXTENSION
}


export const EXERCISE_METADATA: any = {
  'PUSH-UP': { displayName: 'Push-Ups', description: '' },
  'INVERTED ROW': { displayName: 'Inverted Rows', description: '' },
  'DIP': { displayName: 'Dips', description: '' },
  'CHIN-UP': { displayName: 'Chin-Ups', description: '' },
  'PULL-UP': { displayName: 'Pull-Ups', description: '' },
  'GOBLET SQUAT': { displayName: 'Goblet Squats', description: '' },
  'BACK EXTENSIONS': { displayName: 'Back Extensions', description: '' }
}

export interface ProfilePayload {
  userId: number
  gender: Gender,
  bodyWeight: number,
  age: number
}

export interface ExerciseRecordPayload {
  exerciseName: ExerciseName,
  displayName: string,
  description: string
}

export interface ActiveExercise extends ExercisesOnProfiles {
  exercise?: Exercise
}