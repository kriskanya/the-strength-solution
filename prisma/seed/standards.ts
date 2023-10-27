const _ = require('lodash')
import { AgeRange, ExerciseName, Gender, Level, WeightRange } from '@prisma/client'
const fs = require('fs');
const fileName = `${__dirname}/exercise_standards.csv`;
const { parse } = require('csv-parse');

const records: StrengthStandardRecord[] = [];

export interface StrengthStandardRecord {
  weight: WeightRange,
  startRepRange: number,
  endRepRange: number,
  level: Level,
  ageRange: AgeRange,
  gender: Gender,
  exercise: ExerciseName
}

const LEVEL: any = {
  0: Level.NOVICE,
  1: Level.INTERMEDIATE,
  2: Level.PROFICIENT,
  3: Level.ADVANCED,
  4: Level.ELITE
}

const AGE_RANGES: any = {
  '14-17': AgeRange.FOURTEEN_TO_SEVENTEEN,
  '18-23': AgeRange.EIGHTEEN_TO_TWENTY_THREE,
  '24-39': AgeRange.TWENTY_FOUR_TO_THIRTY_NINE,
  '40-49': AgeRange.FORTY_TO_FORTY_NINE,
  '50-59': AgeRange.FIFTY_TO_FIFTY_NINE,
  '60-69': AgeRange.SIXTY_TO_SIXTY_NINE,
  '70-79': AgeRange.SEVENTY_TO_SEVENTY_NINE,
  '80-89': AgeRange.EIGHTY_TO_EIGHTY_NINE
}

const BODYWEIGHT_RANGES: any = {
  '90': WeightRange.NINETY,
  '100': WeightRange.ONE_HUNDRED,
  '110': WeightRange.ONE_HUNDRED_TEN,
  '120': WeightRange.ONE_HUNDRED_TWENTY,
  '130': WeightRange.ONE_HUNDRED_THIRTY,
  '140': WeightRange.ONE_HUNDRED_FORTY,
  '150': WeightRange.ONE_HUNDRED_FIFTY,
  '160': WeightRange.ONE_HUNDRED_SIXTY,
  '170': WeightRange.ONE_HUNDRED_SEVENTY,
  '180': WeightRange.ONE_HUNDRED_EIGHTY,
  '190': WeightRange.ONE_HUNDRED_NINETY,
  '200': WeightRange.TWO_HUNDRED,
  '210': WeightRange.TWO_HUNDRED_TEN,
  '220': WeightRange.TWO_HUNDRED_TWENTY,
  '230': WeightRange.TWO_HUNDRED_THIRTY,
  '240': WeightRange.TWO_HUNDRED_FORTY,
  '250': WeightRange.TWO_HUNDRED_FIFTY,
  '260': WeightRange.TWO_HUNDRED_SIXTY,
  '270': WeightRange.TWO_HUNDRED_SEVENTY,
  '280': WeightRange.TWO_HUNDRED_EIGHTY,
  '290': WeightRange.TWO_HUNDRED_NINETY,
  '300': WeightRange.THREE_HUNDRED,
  '310': WeightRange.THREE_HUNDRED_TEN
}

const GENDER: any = {
  'FEMALE': Gender.FEMALE,
  'MALE': Gender.MALE
}

const EXERCISE_NAME: any = {
  'PUSH-UP': ExerciseName.PUSH_UP,
  'INVERTED ROW': ExerciseName.INVERTED_ROW,
  'DIP': ExerciseName.DIP,
  'CHIN-UP': ExerciseName.CHIN_UP,
  'PULL-UP': ExerciseName.PULL_UP,
  'GOBLET SQUAT': ExerciseName.GOBLET_SQUAT,
  'BACK EXTENSIONS': ExerciseName.BACK_EXTENSION
}

function stripOperator(str: string) {
  str = str.replace(/</g,"")
  return str.trim()
}

function isNumeric(str: string) {
  str = stripOperator(str)
  return /^-?\d+$/.test(str)
}

function determineRepRange(start: string, end?: string): { startRepRange: number, endRepRange: number } {
  let startRepRange, endRepRange, startIncludesOperator, endIncludesOperator
  if (start.includes('<')) {
    startIncludesOperator = true
    start = stripOperator(start)
  }
  if (end?.includes('<')) {
    endIncludesOperator = true
    end = stripOperator(end)
  }

  // if both novice and intermediate are < 1, novice should be 0 and intermediate should be 1
  if (startIncludesOperator && endIncludesOperator) {
    return { startRepRange: 0, endRepRange: 1 }
  }

  if (!end) endRepRange = 1000
  else      endRepRange = +end - 1

  return { startRepRange: +start, endRepRange }
}

function createDBInsert(records: any) {
  let result: StrengthStandardRecord[] = []
  let exerciseName: string, gender: string, ageRange: string, bodyWeight: string

  records.forEach((record: string[]) => {
    const headerSection = record.find((r: any) => r.includes('STANDARD') || r.includes('STANDARDS'))
    const dataSection = record.every((r: any) => isNumeric(r))
    if (headerSection) {
      // need to find which exercise name, gender, and age range is in the header
      exerciseName = _.get(Object.keys(EXERCISE_NAME).filter((pattern) => new RegExp(pattern).test(headerSection)), '[0]')
      gender       = _.get(Object.keys(GENDER).filter((pattern)        => new RegExp(pattern).test(headerSection)), '[0]')
      ageRange     = _.get(Object.keys(AGE_RANGES).filter((pattern)    => new RegExp(pattern).test(headerSection)), '[0]')
    } else if (dataSection) {
      bodyWeight = record.shift() as string
      const fiveProficiencies: StrengthStandardRecord[] = record.map((r, i) => {
        const { startRepRange, endRepRange } = determineRepRange(r, record[i+1])
        return {
          exercise: EXERCISE_NAME[exerciseName],
          gender: GENDER[gender],
          ageRange: AGE_RANGES[ageRange],
          weight: BODYWEIGHT_RANGES[bodyWeight],
          startRepRange,
          endRepRange,
          level: LEVEL[i],
        }
      })
      result = [...result, ...fiveProficiencies]
    }
  })
  return result
}

export async function standardSeedValues() {
  // Initialize the parser
  const parser = parse({
    delimiter: ','
  })

  return new Promise((resolve, reject) => {
    fs.createReadStream(fileName)
      .pipe(parser)
      .on('readable', function(){
        let record;
        while ((record = parser.read()) !== null) {
          records.push(record);
        }
      })
      .on("error", (error: any) => reject(error))
      .on("end", () => {
        resolve(createDBInsert(records))
      });
  });
}