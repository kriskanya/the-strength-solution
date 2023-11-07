const _ = require('lodash')

import { Exercise, ExerciseName, Standard } from '@prisma/client'

/**
 * Determine which range the input value is in
 * @param ranges e.g., '14-17', '18-23', etc
 * @param inputValue e.g. '15'
 * @return '14-17'
 */
export const determineRange = (ranges: string[], inputValue: string) => {
 return Object.keys(ranges).find(range => {
    let [startRange, endRange] = range.split('-')

    if (+inputValue >= +startRange && +inputValue <= +endRange) {
      return range
    }
  })
}

export const formatStringsForQuery = (exerciseNames: string) =>  {
  const arr = exerciseNames.split(', ')
  return '\'' + arr.join(`','`) + '\''
}

/**
 * @param records Union of Standard and Exercise models due to INNER JOIN
 * @return { PUSH_UP: Standard[], PULL_UP: Standard[], ... }
 */
export const groupDataByExercise = (records: any) => {
  const obj: { [key: string]: Standard[] } = {}
  records.forEach((record: any) => {
    if (!obj[record.exerciseName]) obj[record.exerciseName] = []
    obj[record.exerciseName].push(record)
  })
  return obj
}