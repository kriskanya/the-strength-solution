import { Exercise, ExerciseName } from '@prisma/client'

const _ = require('lodash')
const fs = require('fs')
const { parse } = require('csv-parse')
import {
  AGE_RANGES,
  BODYWEIGHT_RANGES,
  EXERCISE_NAME,
  GENDER,
  LEVEL,
  StrengthStandardRecord,
  EXERCISE_METADATA,
  ExerciseRecordPayload
} from '../../common/backend-types'
import { determineRange } from '../../common/standards-helpers'
const fileName = `${__dirname}/exercise_standards.csv`

const records: StrengthStandardRecord[] = [];

function stripOperator(str: string) {
  str = str.replace(/</g,"")
  return str.trim()
}

function isNumeric(str: string) {
  str = stripOperator(str)
  return /^-?\d+$/.test(str)
}

function determineRepRange(start: string, end?: string): { startRepRange: number, endRepRange: number } {
  let startRepRange , endRepRange, startIncludesOperator, endIncludesOperator
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

export function createExerciseSeedValues() {
  let records: ExerciseRecordPayload[] = []
  for (let [key, value] of Object.entries(EXERCISE_NAME)) {
    const record = {
      exerciseName : value,
      displayName : EXERCISE_METADATA[key]?.displayName,
      description : EXERCISE_METADATA[key]?.description
    } as ExerciseRecordPayload
    records = [...records, record]
  }
  return records
}

/**
 * Sets exercise 'name' as the object key, so that associating it with a Standard will be easier
 * @param exerciseRecords => [{
 *   "id": 15,
 *   "name": "PUSH_UP",
 *   "displayName": "Push-Ups",
 *   "description": "",
 *   "createdAt": "2023-11-06T19:37:55.002Z",
 *   "updatedAt": "2023-11-06T19:37:55.002Z"
 * },
 * ...
 * ]
 * @returns
 * {
 *   PUSH_UP: {
 *     "id": 43,
 *     "name": "PUSH_UP",
 *     "displayName": "Push-Ups",
 *     "description": "",
 *     "createdAt": "2023-11-06T19:46:37.633Z",
 *     "updatedAt": "2023-11-06T19:46:37.633Z"
 *   },
 *   ...
 * }
 */
function createExerciseRecordsObject(exerciseRecords: Exercise[]) {
  return exerciseRecords.reduce((acc: { [key: string]: Exercise }, curr: Exercise) => {
    acc[curr.exerciseName] = curr
    return acc
  }, {})
}

function createDBInsert(records: any, exerciseRecords: Exercise[]) {
  let result: StrengthStandardRecord[] = []
  let exerciseName: string, gender: string, ageRange: string, bodyWeight: string

  const exercisesMappedToName = createExerciseRecordsObject(exerciseRecords)

  records.forEach((record: string[]) => {
    const headerSection = record.find((r: any) => r.includes('STANDARD') || r.includes('STANDARDS'))
    const dataSection = record.every((r: any) => isNumeric(r))
    if (headerSection) {
      // find which exercise name, gender, and age range is in the header
      exerciseName = _.get(Object.keys(EXERCISE_NAME).filter((pattern) => new RegExp(pattern).test(headerSection)), '[0]')
      gender       = _.get(Object.keys(GENDER).filter((pattern)        => new RegExp(pattern).test(headerSection)), '[0]')
      ageRange     = _.get(Object.keys(AGE_RANGES).filter((pattern)    => new RegExp(pattern).test(headerSection)), '[0]')
    } else if (dataSection) {
      const bodyWeight = determineRange(BODYWEIGHT_RANGES, record.shift() as string) as any
      const fiveProficiencies: StrengthStandardRecord[] = record.map((r, i) => {
        const { startRepRange, endRepRange } = determineRepRange(r, record[i+1])
        const exerciseId = exercisesMappedToName[EXERCISE_NAME[exerciseName]]?.id
        return {
          exerciseId,
          gender: GENDER[gender],
          ageRange: AGE_RANGES[ageRange],
          bodyWeight: BODYWEIGHT_RANGES[bodyWeight],
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

export async function createStandardSeedValues(exerciseRecords: Exercise[]): Promise<StrengthStandardRecord[]> {
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
        resolve(createDBInsert(records, exerciseRecords))
      });
  });
}