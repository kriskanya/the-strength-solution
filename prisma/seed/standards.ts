import { pushupsMale14To17 } from '@/prisma/seed/push-ups/pushups-male[14-17]'

export function standardSeedValues() {
  const AGES = [14,15,16,17]
  const result = AGES.map(age => {
    const standardsWithAges = pushupsMale14To17.map(standard => {
      standard.age = age
      return standard
    })
    return standardsWithAges
  }).flat()

  return result
}