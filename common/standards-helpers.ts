import { NON_STANDARD_EXERCISES, UserSavedExercise } from '../common/shared-types-and-constants'

const _ = require('lodash')

import { Level, Profile, Standard } from '@prisma/client'

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

const determineDeadHangProficiency = (time: number): Level | undefined => {
  if (!_.isNumber(time) || !time) return

  const proficiency = {
    ELITE: 180,
    ADVANCED: 120,
    PROFICIENT: 90,
    INTERMEDIATE: 60,
    NOVICE: 0
  }
  for (const [key, value] of Object.entries(proficiency)) {
    if (time >= value) return key as Level
  }
}

/**
 *
 * @param jumpDistance in inches
 * @param userHeight in inches
 */
const determineBroadJumpProficiency = (jumpDistance: number, userHeight: number): Level | undefined => {
  if (!_.isNumber(jumpDistance) || !jumpDistance || !_.isNumber(userHeight) || !userHeight) return

  const proficiency = {
    ELITE        : userHeight + 2,
    ADVANCED     : userHeight + 1,
    PROFICIENT   : userHeight,
    INTERMEDIATE : userHeight - 1,
    NOVICE       : 0
  }
  for (const [key, value] of Object.entries(proficiency)) {
    if (jumpDistance >= value) return key as Level
  }
}

/**
 * @param weightCarried lbs per hand
 * @param userBodyWeight lbs
 */
const determineFarmerCarryProficiency = (weightCarried: number, userBodyWeight: number): Level | undefined => {
  if (!_.isNumber(weightCarried) || !weightCarried || !_.isNumber(userBodyWeight) || !userBodyWeight) return

  const proficiency = {
    ELITE        : userBodyWeight,
    ADVANCED     : userBodyWeight * 0.75,
    PROFICIENT   : userBodyWeight * 0.5,
    INTERMEDIATE : userBodyWeight * 0.25,
    NOVICE       : 0
  }
  for (const [key, value] of Object.entries(proficiency)) {
    if (weightCarried >= value) return key as Level
  }
}

export const setProficienciesForNonStandardExercises = (input: UserSavedExercise[], userProfile: Profile) => {
  if (!input || _.isEmpty(input) || !userProfile || _.isEmpty(userProfile)) return

  const activeExercises = _.cloneDeep(input)
  const nonStandardExercises = activeExercises.filter((activeExercise: UserSavedExercise) => {
    return NON_STANDARD_EXERCISES.includes(_.get(activeExercise, 'exercise.exerciseName'))
  })
  nonStandardExercises.forEach((activeExercise: UserSavedExercise) => {
    const exerciseName = _.get(activeExercise, 'exercise.exerciseName')
    const quantityPerformed = _.get(activeExercise, 'loggedExercise.quantity')
    let level

    if (quantityPerformed) {
      switch(exerciseName) {
        case 'DEAD_HANG':
          level = determineDeadHangProficiency(quantityPerformed)
          break
        case 'BROAD_JUMP':
          level = determineBroadJumpProficiency(quantityPerformed, userProfile.height)
          break
        case 'FARMER_CARRY':
          level = determineFarmerCarryProficiency(quantityPerformed, userProfile.bodyWeight)
          break
      }
    }

    if (level) {
      _.set(activeExercise, 'loggedExercise.level', level)
    }
  })
  return activeExercises
}