import { AgeRange, ExerciseName, Gender, Level, WeightRange } from '@prisma/client'

export interface StrengthStandardRecord {
  weight: WeightRange,
  startRepRange: number,
  endRepRange: number,
  level: Level,
  ageRange: AgeRange,
  gender: Gender,
  exercise: ExerciseName
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
  '90-99': WeightRange.NINETY,
  '100-109': WeightRange.ONE_HUNDRED,
  '110-119': WeightRange.ONE_HUNDRED_TEN,
  '120-129': WeightRange.ONE_HUNDRED_TWENTY,
  '130-139': WeightRange.ONE_HUNDRED_THIRTY,
  '140-149': WeightRange.ONE_HUNDRED_FORTY,
  '150-159': WeightRange.ONE_HUNDRED_FIFTY,
  '160-169': WeightRange.ONE_HUNDRED_SIXTY,
  '170-179': WeightRange.ONE_HUNDRED_SEVENTY,
  '180-189': WeightRange.ONE_HUNDRED_EIGHTY,
  '190-199': WeightRange.ONE_HUNDRED_NINETY,
  '200-209': WeightRange.TWO_HUNDRED,
  '210-219': WeightRange.TWO_HUNDRED_TEN,
  '220-229': WeightRange.TWO_HUNDRED_TWENTY,
  '230-239': WeightRange.TWO_HUNDRED_THIRTY,
  '240-249': WeightRange.TWO_HUNDRED_FORTY,
  '250-259': WeightRange.TWO_HUNDRED_FIFTY,
  '260-269': WeightRange.TWO_HUNDRED_SIXTY,
  '270-279': WeightRange.TWO_HUNDRED_SEVENTY,
  '280-289': WeightRange.TWO_HUNDRED_EIGHTY,
  '290-299': WeightRange.TWO_HUNDRED_NINETY,
  '300-309': WeightRange.THREE_HUNDRED,
  '310-319': WeightRange.THREE_HUNDRED_TEN
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