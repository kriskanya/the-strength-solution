// todo: grab this from the db
// need to figure out how these are calculated for the first graph
import { Description, GenericObject } from '@/common/types'

export const exercises = [
  { name: 'Push-Ups', proficiency: 15 },
  { name: 'Goblet Squat', proficiency: 30 },
  { name: 'Dips', proficiency: 45 },
  { name: 'Chin-Ups', proficiency: 7 },
  { name: 'Goblet Squat', proficiency: 35 }
]

// todo: grab this from the db
const exercisesAverage = [
  { name: 'Push-Ups', proficiency: 10 },
  { name: 'Goblet Squat', proficiency: 40 },
  { name: 'Dips', proficiency: 20 },
  { name: 'Chin-Ups', proficiency: 10 },
  { name: 'Goblet Squat', proficiency: 50 }
]

export const maleAvatarFrontDescriptions: Description = {
  traps: {},
  delts: {},
  pecs: { position: 'left-10 top-20', text: 'Small explanation. Lifter is weaker than the average untrained individual of the same sex and weight. Strength score <30' },
  biceps: {},
  forearms: {},
  abs: {},
  obliques: {},
  quads: {},
  calves: {},
  neck: {},
  hands: {},
  head: {}
}

const highestProficiency = exercises.reduce((accumulator, current) => {
  const currentProficiency = Math.abs(current.proficiency)
  if (currentProficiency > accumulator) accumulator = currentProficiency
  return accumulator
}, 0)

export function calculateWidth(input: number, MAX_BAR_WIDTH: number) {
  const minWidth = 35
  const calculatedWidth = (Math.abs(input) / highestProficiency) * MAX_BAR_WIDTH
  const result = calculatedWidth + minWidth
  return `${result}px`
}

export function getAverage(name: string) {
  return exercisesAverage.find(exercise => exercise.name === name)?.proficiency || 0
}