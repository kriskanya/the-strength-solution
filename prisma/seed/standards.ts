const _ = require('lodash')
const fs = require('fs')
const { parse } = require('csv-parse')
import {
  AGE_RANGES,
  BODYWEIGHT_RANGES,
  EXERCISE_NAME,
  GENDER,
  LEVEL,
  StrengthStandardRecord
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

function createDBInsert(records: any) {
  let result: StrengthStandardRecord[] = []
  let exerciseName: string, gender: string, ageRange: string, bodyWeight: string

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
        return {
          exercise: EXERCISE_NAME[exerciseName],
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