// todo: grab this from the db
// need to figure out how these are calculated for the first graph
import { Description } from '@/common/types'

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

export const maleAvatarFrontPositions: Description = {
  traps: { position: 'left-11 top-10', text: 'Small explanation. Lifter is weaker than the average untrained individual of the same sex and weight. Strength score <30' },
  delts: { position: 'left-24 top-16', text: 'Small explanation. Lifter is weaker than the average untrained individual of the same sex and weight. Strength score <30' },
  pecs: { position: 'left-16 top-20', text: 'Small explanation. Lifter is weaker than the average untrained individual of the same sex and weight. Strength score <30' },
  biceps: { position: 'left-24 top-28', text: 'Small explanation. Lifter is weaker than the average untrained individual of the same sex and weight. Strength score <30' },
  forearms: { position: 'left-28 top-40', text: 'Small explanation. Lifter is weaker than the average untrained individual of the same sex and weight. Strength score <30' },
  abs: { position: 'left-12 top-40', text: 'Small explanation. Lifter is weaker than the average untrained individual of the same sex and weight. Strength score <30' },
  obliques: { position: 'left-16 top-36', text: 'Small explanation. Lifter is weaker than the average untrained individual of the same sex and weight. Strength score <30' },
  quads: { position: 'left-16 top-56', text: 'Small explanation. Lifter is weaker than the average untrained individual of the same sex and weight. Strength score <30' },
  calves: { position: 'left-20 top-96', text: 'Small explanation. Lifter is weaker than the average untrained individual of the same sex and weight. Strength score <30' },
}

export const femaleAvatarFrontPositions: Description = {
  traps: { position: 'left-11 top-10', text: 'Small explanation. Lifter is weaker than the average untrained individual of the same sex and weight. Strength score <30' },
  delts: { position: 'left-24 top-16', text: 'Small explanation. Lifter is weaker than the average untrained individual of the same sex and weight. Strength score <30' },
  pecs: { position: 'left-16 top-20', text: 'Small explanation. Lifter is weaker than the average untrained individual of the same sex and weight. Strength score <30' },
  biceps: { position: 'left-24 top-28', text: 'Small explanation. Lifter is weaker than the average untrained individual of the same sex and weight. Strength score <30' },
  forearms: { position: 'left-28 top-40', text: 'Small explanation. Lifter is weaker than the average untrained individual of the same sex and weight. Strength score <30' },
  abs: { position: 'left-12 top-40', text: 'Small explanation. Lifter is weaker than the average untrained individual of the same sex and weight. Strength score <30' },
  obliques: { position: 'left-16 top-36', text: 'Small explanation. Lifter is weaker than the average untrained individual of the same sex and weight. Strength score <30' },
  quads: { position: 'left-16 top-56', text: 'Small explanation. Lifter is weaker than the average untrained individual of the same sex and weight. Strength score <30' },
  calves: { position: 'left-20 top-96', text: 'Small explanation. Lifter is weaker than the average untrained individual of the same sex and weight. Strength score <30' },
}

export const maleAvatarRearPositions: Description = {
  traps: { position: 'left-24 top-14', text: 'Small explanation. Lifter is weaker than the average untrained individual of the same sex and weight. Strength score <30' },
  delts: { position: 'left-32 top-20', text: 'Small explanation. Lifter is weaker than the average untrained individual of the same sex and weight. Strength score <30' },
  rotatorCuff: { position: 'left-28 top-28', text: 'Small explanation. Lifter is weaker than the average untrained individual of the same sex and weight. Strength score <30' },
  lats: { position: 'left-24 top-36', text: 'Small explanation. Lifter is weaker than the average untrained individual of the same sex and weight. Strength score <30' },
  erectors: { position: 'left-20 top-20', text: 'Small explanation. Lifter is weaker than the average untrained individual of the same sex and weight. Strength score <30' },
  triceps: { position: 'left-36 top-36', text: 'Small explanation. Lifter is weaker than the average untrained individual of the same sex and weight. Strength score <30' },
  forearms: { position: 'left-40 top-48', text: 'Small explanation. Lifter is weaker than the average untrained individual of the same sex and weight. Strength score <30' },
  abs: { position: 'right-0 top-40', text: 'Small explanation. Lifter is weaker than the average untrained individual of the same sex and weight. Strength score <30' },
  obliques: { position: 'left-28 top-48', text: 'Small explanation. Lifter is weaker than the average untrained individual of the same sex and weight. Strength score <30' },
  glutes: { position: 'left-24 top-56', text: 'Small explanation. Lifter is weaker than the average untrained individual of the same sex and weight. Strength score <30' },
  quads: { position: 'left-28 top-60', text: 'Small explanation. Lifter is weaker than the average untrained individual of the same sex and weight. Strength score <30' },
  hamstrings: { position: 'left-28 top-72', text: 'Small explanation. Lifter is weaker than the average untrained individual of the same sex and weight. Strength score <30' },
  adductors: { position: 'left-20 top-72', text: 'Small explanation. Lifter is weaker than the average untrained individual of the same sex and weight. Strength score <30' },
  calves: { position: 'left-28 top-96', text: 'Small explanation. Lifter is weaker than the average untrained individual of the same sex and weight. Strength score <30' },
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