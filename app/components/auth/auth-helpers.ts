import { isNumber } from 'lodash-es'

/**
 * Converts height to inches e.g., 6'2" => 74
 * @param feet
 * @param inches
 * @return inches
 */
export const convertHeightToInches = (feet: number, inches: number) => {
  if (!isNumber(feet) || !isNumber(inches)) return 0

  return (feet * 12) + inches
}

/**
 * Converts inches to feet + inches
 * @param heightInInches
 * @return e.g., 74 => { heightFeet: 6, heightInches: 2 }
 */
export const convertHeightFromInches = (heightInInches: number) => {
  if (!isNumber(heightInInches)) return { heightFeet: 0, heightInches: 0 }

  const feet = Math.floor(heightInInches / 12)
  const inches = heightInInches % 12

  return { heightFeet: feet, heightInches: inches }
}