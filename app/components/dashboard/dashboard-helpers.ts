// todo: grab this from the db
// need to figure out how these are calculated for the first graph
import { AvatarColorsFront, AvatarColorsRear, AvatarDescription, Description } from '@/common/frontend-types-and-constants'
import { Dispatch, SetStateAction } from 'react'
import { UserSavedExercise } from '@/common/shared-types'

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

export const maleAvatarPositions: Description = {
  // front
  trapsFront: { position: 'left-11 top-10',    exercise: 'FARMER_CARRY', name: 'Upper Traps',       text: 'Small explanation. Lifter is weaker than the average untrained individual of the same sex and weight. Strength score <30' },
  deltsFront: { position: 'left-24 top-16',    exercise: 'DIP',          name: 'Anterior Deltoids', text: 'Small explanation. Lifter is weaker than the average untrained individual of the same sex and weight. Strength score <30' },
  pecs: { position: 'left-16 top-20',          exercise: 'PUSH_UP',      name: 'Pectorals',         text: 'Small explanation. Lifter is weaker than the average untrained individual of the same sex and weight. Strength score <30' },
  biceps: { position: 'left-24 top-28',        exercise: 'CHIN_UP',      name: 'Biceps',            text: 'Small explanation. Lifter is weaker than the average untrained individual of the same sex and weight. Strength score <30' },
  forearmsFront: { position: 'left-28 top-40', exercise: 'DEAD_HANG',    name: 'Forearms',          text: 'Small explanation. Lifter is weaker than the average untrained individual of the same sex and weight. Strength score <30' },
  absFront: { position: 'left-12 top-40',      exercise: 'GOBLET_SQUAT', name: 'Abs',               text: 'Small explanation. Lifter is weaker than the average untrained individual of the same sex and weight. Strength score <30' },
  obliquesFront: { position: 'left-16 top-36', exercise: 'GOBLET_SQUAT', name: 'Obliques',          text: 'Small explanation. Lifter is weaker than the average untrained individual of the same sex and weight. Strength score <30' },
  quads: { position: 'left-16 top-56',         exercise: 'GOBLET_SQUAT', name: 'Quadriceps',        text: 'Small explanation. Lifter is weaker than the average untrained individual of the same sex and weight. Strength score <30' },
  calvesFront: { position: 'left-20 top-96',   exercise: 'BROAD_JUMP',   name: 'Tibialis Interior', text: 'Small explanation. Lifter is weaker than the average untrained individual of the same sex and weight. Strength score <30' },
  // rear
  trapsRear: { position: 'left-24 top-14',     exercise: 'FARMER_CARRY',   name: 'Upper Traps',        text: 'Small explanation. Lifter is weaker than the average untrained individual of the same sex and weight. Strength score <30' },
  deltsRear: { position: 'left-32 top-20',     exercise: 'INVERTED_ROW',   name: 'Posterior Deltoids', text: 'Small explanation. Lifter is weaker than the average untrained individual of the same sex and weight. Strength score <30' },
  lats: { position: 'left-24 top-36',          exercise: 'PULL_UP',        name: 'Latissimus Dorsi',   text: 'Small explanation. Lifter is weaker than the average untrained individual of the same sex and weight. Strength score <30' },
  rhomboids: { position: 'left-20 top-20',     exercise: 'INVERTED_ROW',   name: 'Rhomboids/Mid-lower Traps', text: 'Small explanation. Lifter is weaker than the average untrained individual of the same sex and weight. Strength score <30' },
  erectors: { position: 'left-20 top-44',      exercise: 'BACK_EXTENSION', name: 'Erector Spinae',     text: 'Small explanation. Lifter is weaker than the average untrained individual of the same sex and weight. Strength score <30' },
  triceps: { position: 'left-36 top-36',       exercise: 'DIP',            name: 'Triceps',            text: 'Small explanation. Lifter is weaker than the average untrained individual of the same sex and weight. Strength score <30' },
  forearmsRear: { position: 'left-40 top-48',  exercise: 'DEAD_HANG',      name: 'Forearms',           text: 'Small explanation. Lifter is weaker than the average untrained individual of the same sex and weight. Strength score <30' },
  absRear: { position: 'right-0 top-40',       exercise: 'GOBLET_SQUAT',   name: 'Abs',                text: 'Small explanation. Lifter is weaker than the average untrained individual of the same sex and weight. Strength score <30' },
  obliquesRear: { position: 'left-28 top-48',  exercise: 'GOBLET_SQUAT',   name: 'Obliques',           text: 'Small explanation. Lifter is weaker than the average untrained individual of the same sex and weight. Strength score <30' },
  glutes: { position: 'left-24 top-56',        exercise: 'BACK_EXTENSION', name: 'Gluteal Muscles',    text: 'Small explanation. Lifter is weaker than the average untrained individual of the same sex and weight. Strength score <30' },
  hamstrings: { position: 'left-28 top-72',    exercise: 'BACK_EXTENSION', name: 'Hamstrings',         text: 'Small explanation. Lifter is weaker than the average untrained individual of the same sex and weight. Strength score <30' },
  adductors: { position: 'left-20 top-72',     exercise: 'GOBLET_SQUAT',   name: 'Adductors',          text: 'Small explanation. Lifter is weaker than the average untrained individual of the same sex and weight. Strength score <30' },
  calvesRear: { position: 'left-28 top-96',    exercise: 'BROAD_JUMP',     name: 'Tibialis Interior',  text: 'Small explanation. Lifter is weaker than the average untrained individual of the same sex and weight. Strength score <30' },
}

export const femaleAvatarPositions: Description = {
  // front
  trapsFront: { position: 'left-11 top-10',    exercise: 'FARMER_CARRY',   name: 'Upper Traps', text: 'Small explanation. Lifter is weaker than the average untrained individual of the same sex and weight. Strength score <30' },
  deltsFront: { position: 'left-24 top-16',    exercise: 'DIP',            name: 'Anterior Deltoids', text: 'Small explanation. Lifter is weaker than the average untrained individual of the same sex and weight. Strength score <30' },
  pecs: { position: 'left-16 top-20',          exercise: 'PUSH_UP',        name: 'Pectorals', text: 'Small explanation. Lifter is weaker than the average untrained individual of the same sex and weight. Strength score <30' },
  biceps: { position: 'left-24 top-28',        exercise: 'CHIN_UP',        name: 'Biceps', text: 'Small explanation. Lifter is weaker than the average untrained individual of the same sex and weight. Strength score <30' },
  forearmsFront: { position: 'left-28 top-40', exercise: 'DEAD_HANG',      name: 'Forearms', text: 'Small explanation. Lifter is weaker than the average untrained individual of the same sex and weight. Strength score <30' },
  absFront: { position: 'left-12 top-40',      exercise: 'GOBLET_SQUAT',   name: 'Abs', text: 'Small explanation. Lifter is weaker than the average untrained individual of the same sex and weight. Strength score <30' },
  obliquesFront: { position: 'left-16 top-36', exercise: 'GOBLET_SQUAT',   name: 'Obliques', text: 'Small explanation. Lifter is weaker than the average untrained individual of the same sex and weight. Strength score <30' },
  quads: { position: 'left-20 top-56',         exercise: 'GOBLET_SQUAT',   name: 'Quadriceps', text: 'Small explanation. Lifter is weaker than the average untrained individual of the same sex and weight. Strength score <30' },
  calvesFront: { position: 'left-20 top-96',   exercise: 'BROAD_JUMP',     name: 'Tibialis Interior', text: 'Small explanation. Lifter is weaker than the average untrained individual of the same sex and weight. Strength score <30' },
  // rear
  trapsRear: { position: 'left-20 top-14',     exercise: 'FARMER_CARRY',   name: 'Upper Traps', text: 'Small explanation. Lifter is weaker than the average untrained individual of the same sex and weight. Strength score <30' },
  deltsRear: { position: 'left-28 top-24',     exercise: 'INVERTED_ROW',   name: 'Posterior Deltoids', text: 'Small explanation. Lifter is weaker than the average untrained individual of the same sex and weight. Strength score <30' },
  lats: { position: 'left-24 top-36',          exercise: 'PULL_UP',        name: 'Latissimus Dorsi', text: 'Small explanation. Lifter is weaker than the average untrained individual of the same sex and weight. Strength score <30' },
  rhomboids: { position: 'left-20 top-20',     exercise: 'INVERTED_ROW',   name: 'Rhomboids/Mid-lower Traps', text: 'Small explanation. Lifter is weaker than the average untrained individual of the same sex and weight. Strength score <30' },
  erectors: { position: 'left-16 top-44',      exercise: 'BACK_EXTENSION', name: 'Erector Spinae', text: 'Small explanation. Lifter is weaker than the average untrained individual of the same sex and weight. Strength score <30' },
  triceps: { position: 'left-32 top-36',       exercise: 'DIP',            name: 'Triceps', text: 'Small explanation. Lifter is weaker than the average untrained individual of the same sex and weight. Strength score <30' },
  forearmsRear: { position: 'left-32 top-48',  exercise: 'DEAD_HANG',      name: 'Forearms', text: 'Small explanation. Lifter is weaker than the average untrained individual of the same sex and weight. Strength score <30' },
  absRear: { position: 'right-0 top-40',       exercise: 'GOBLET_SQUAT',   name: 'Abs', text: 'Small explanation. Lifter is weaker than the average untrained individual of the same sex and weight. Strength score <30' },
  obliquesRear: { position: 'left-24 top-48',  exercise: 'GOBLET_SQUAT',   name: 'Obliques', text: 'Small explanation. Lifter is weaker than the average untrained individual of the same sex and weight. Strength score <30' },
  glutes: { position: 'left-24 top-56',        exercise: 'BACK_EXTENSION', name: 'Gluteal Muscles', text: 'Small explanation. Lifter is weaker than the average untrained individual of the same sex and weight. Strength score <30' },
  hamstrings: { position: 'left-28 top-72',    exercise: 'BACK_EXTENSION', name: 'Hamstrings', text: 'Small explanation. Lifter is weaker than the average untrained individual of the same sex and weight. Strength score <30' },
  adductors: { position: 'left-20 top-72',     exercise: 'GOBLET_SQUAT',   name: 'Adductors', text: 'Small explanation. Lifter is weaker than the average untrained individual of the same sex and weight. Strength score <30' },
  calvesRear: { position: 'left-28 top-96',    exercise: 'BROAD_JUMP',     name: 'Tibialis Interior', text: 'Small explanation. Lifter is weaker than the average untrained individual of the same sex and weight. Strength score <30' },
}

const GREY = '#9396A3'
const GREEN = '#4CD964'
const ORANGE = '#F4B43B'
const YELLOW = '#FCFF4B'
const RED = '#F25B28'
const BLUE = '#2E8EEC'

export const LEGEND = {
  NOVICE       : RED,
  INTERMEDIATE : ORANGE,
  PROFICIENT   : YELLOW,
  ADVANCED     : GREEN,
  ELITE        : BLUE,
  NOT_SET      : GREY
}
export const colorsFront: AvatarColorsFront['colors'] = {
  trapsFront    : LEGEND.NOT_SET,
  deltsFront    : LEGEND.NOT_SET,
  pecs          : LEGEND.NOT_SET,
  biceps        : LEGEND.NOT_SET,
  forearmsFront : LEGEND.NOT_SET,
  absFront      : LEGEND.NOT_SET,
  obliquesFront : LEGEND.NOT_SET,
  quads         : LEGEND.NOT_SET,
  calvesFront   : LEGEND.NOT_SET,
  neck          : LEGEND.NOT_SET,
  hands         : LEGEND.NOT_SET,
  head          : LEGEND.NOT_SET,
  hair          : LEGEND.NOT_SET
}
export const colorsRear: AvatarColorsRear['colors'] = {
  calvesRear    : LEGEND.NOT_SET,
  adductors     : LEGEND.NOT_SET,
  quads         : LEGEND.NOT_SET,
  hamstrings    : LEGEND.NOT_SET,
  glutes        : LEGEND.NOT_SET,
  obliquesRear  : LEGEND.NOT_SET,
  trapsRear     : LEGEND.NOT_SET,
  lats          : LEGEND.NOT_SET,
  rotatorCuff   : LEGEND.NOT_SET,
  forearmsRear  : LEGEND.NOT_SET,
  triceps       : LEGEND.NOT_SET,
  deltsRear     : LEGEND.NOT_SET,
  erectors      : LEGEND.NOT_SET,
  lowerTraps    : LEGEND.NOT_SET,
  rhomboids     : LEGEND.NOT_SET,
  hands         : LEGEND.NOT_SET,
  head          : LEGEND.NOT_SET
}

export type AvatarColors = AvatarColorsFront['colors'] & AvatarColorsRear['colors']

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

/**
 * Return the relevant information when user hovers over a certain muscle group
 * @param bodyPart
 * @param setDescription
 * @param fillColors
 * @param originalFillColors
 * @param setShowDescription
 * @param setFillColors
 * @param uiPositioning
 */
export const getMuscleGroupInfo = (bodyPart: string, setDescription: Dispatch<SetStateAction<AvatarDescription>>, fillColors: AvatarColorsFront['colors'] & AvatarColorsRear['colors'], originalFillColors: AvatarColorsFront['colors'] & AvatarColorsRear['colors'], setShowDescription: Dispatch<SetStateAction<boolean>>, setFillColors: (input: AvatarColorsFront['colors'] & AvatarColorsRear['colors']) => void, uiPositioning: Description) => {
  const DARK_GREY = '#444751'
  const newFillColors: any = {}

  const obj = {
    bodyPart,
    text: '',
    position: uiPositioning[bodyPart]?.position,
    name: uiPositioning[bodyPart]?.name,
    exerciseName: uiPositioning[bodyPart]?.exercise
  }
  setDescription(obj)
  for (const key in fillColors) {
    newFillColors[key] = DARK_GREY
  }
  newFillColors[bodyPart] = originalFillColors[bodyPart as keyof AvatarColorsRear['colors']]
  setShowDescription(true)
  setFillColors(newFillColors)
}

/**
 * Search through activeExercises and find the relevant exercises for the provided body part
 * @param bodyPart
 * @param setActiveExercise
 * @param activeExercises
 * @param uiPositioning
 */
export const getActiveExercise = (bodyPart: string, setActiveExercise: Dispatch<SetStateAction<UserSavedExercise | undefined>>, activeExercises: UserSavedExercise[] | undefined, uiPositioning: Description) => {
  setActiveExercise(undefined)

  const exerciseName = uiPositioning[bodyPart]?.exercise

  if (!activeExercises) return

  const currentActiveExercise = activeExercises.find(ex => {
    return ex?.exercise?.exerciseName === exerciseName
  })

  if (currentActiveExercise) setActiveExercise(currentActiveExercise)
}

/**
 * Reset avatar to non-hovered-over state
 * @param originalFillColors
 * @param setFillColors
 */
export const resetAvatar = (originalFillColors: AvatarColorsFront['colors'] & AvatarColorsRear['colors'], setFillColors: (input: AvatarColorsFront['colors'] & AvatarColorsRear['colors']) => void) => {
  const newFillColors: any = {}
  for (const key in originalFillColors) {
    newFillColors[key] = originalFillColors[key as keyof AvatarColorsRear['colors']]
  }
  setFillColors(newFillColors)
}

export const STRENGTH_CLASSIFICATIONS = [
  { level: 'novice', color: 'red', description: 'Individual has demonstrated insufficient muscular endurance in these particular muscle groups' },
  { level: 'intermediate', color: 'orange', description: 'Individual has demonstrated less than average muscular endurance in these particular muscle groups.' },
  { level: 'proficient', color: 'yellow', description: 'Individual has demonstrated average muscular endurance in these particular muscle groups.' },
  { level: 'advanced', color: 'green', description: 'Individual has demonstrated greater than average muscular endurance in these particular muscle groups.' },
  { level: 'elite', color: 'blue', description: 'Individual has demonstrated ideal muscular endurance in these particular muscle groups.' },
]