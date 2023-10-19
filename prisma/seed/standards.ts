import { standardsMale14To17 } from './pushups-male[14-17]'

export function standardSeedValues() {
  const AGES = [14,15,6,17]
  const result = AGES.map(age => {
    const standardsWithAges = standardsMale14To17.map(standard => {
      standard.age = age
      return standard
    })
    return standardsWithAges
  }).flat()

  return result
}