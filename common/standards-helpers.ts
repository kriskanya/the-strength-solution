const _ = require('lodash')

import { Standard } from '@prisma/client'

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

/**
 * @param records
 * @return { PUSH_UP: Standard[], PULL_UP: Standard[], ... }
 */
export const groupDataByExercise = (records: Standard[]) => {
  // const obj: { [key: string]: Standard[] } = {}
  // records.forEach(record => {
  //   if (!obj[record.exercise]) obj[record.exercise] = []
  //   obj[record.exercise].push(record)
  // })
  // return obj

  return {}
}