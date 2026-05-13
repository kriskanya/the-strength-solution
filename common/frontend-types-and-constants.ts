import { EXERCISE_ENUM_VALUE } from '@/common/shared-types-and-constants'

export interface Description {
  [key: string]: { position: string, exercise: EXERCISE_ENUM_VALUE, name: string, text: string }
}

export interface AvatarColorsFront {
  colors: {
    absFront: string,
    biceps: string,
    calvesFront: string,
    deltsFront: string,
    forearmsFront: string,
    hair?: string
    hands: string,
    head: string,
    neck: string,
    obliquesFront: string,
    pecs: string,
    quads: string,
    trapsFront: string,
  }
}

export interface AvatarColorsRear {
  colors: {
    adductors: string,
    calvesRear: string,
    deltsRear: string,
    erectors: string,
    forearmsRear: string,
    glutes: string,
    hamstrings: string,
    hands: string,
    head: string
    lowerTraps: string
    lats: string,
    obliquesRear: string,
    quads: string,
    rhomboids: string,
    rotatorCuff: string,
    trapsRear: string,
    triceps: string,
  }
}

type MovementPattern =
  | 'hinging'
  | 'horizontal pushing'
  | 'horizontal rowing'
  | 'loaded carrying'
  | 'squatting'
  | 'vertical pressing'
  | 'vertical pulling'

type ProficiencyDescription = {
  NOVICE: string
  INTERMEDIATE: string
  PROFICIENT: string
  ADVANCED: string
  ELITE: string
}

const getMovementPatternCopy = (movementPattern: MovementPattern): ProficiencyDescription => ({
  NOVICE: `You demonstrate limited control, strength, stability, and muscular endurance in ${movementPattern}.`,
  INTERMEDIATE: `You display average movement competency and body control, but you still present endurance limitations in ${movementPattern}.`,
  PROFICIENT: `You demonstrate well-balanced strength, stability, mobility, and coordination in ${movementPattern}, representing the target standard for overall functional performance.`,
  ADVANCED: `You exhibit above-average movement efficiency, control, and muscular endurance with strong performance consistency and the ability to execute ${movementPattern} in a state of muscular fatigue.`,
  ELITE: `You demonstrate exceptional mastery of ${movementPattern} through refined movement mechanics, and superior muscular endurance.`
})

const MUSCLE_GROUP_MOVEMENT_PATTERNS: { [key: string]: MovementPattern } = {
  // front
  absFront: 'squatting',
  biceps: 'vertical pulling',
  calvesFront: 'hinging',
  deltsFront: 'vertical pressing',
  forearmsFront: 'vertical pulling',
  obliquesFront: 'squatting',
  pecs: 'horizontal pushing',
  quads: 'squatting',
  trapsFront: 'loaded carrying',
  // rear
  absRear: 'squatting',
  adductors: 'squatting',
  calvesRear: 'hinging',
  deltsRear: 'horizontal rowing',
  erectors: 'hinging',
  forearmsRear: 'vertical pulling',
  glutes: 'hinging',
  hamstrings: 'hinging',
  lats: 'vertical pulling',
  obliquesRear: 'squatting',
  rhomboids: 'horizontal rowing',
  trapsRear: 'loaded carrying',
  triceps: 'vertical pressing'
}

export const MUSCLE_PROFICIENCIES = Object.fromEntries(
  Object.entries(MUSCLE_GROUP_MOVEMENT_PATTERNS).map(([muscleGroup, movementPattern]) => {
    return [muscleGroup, getMovementPatternCopy(movementPattern)]
  })
)

export interface AvatarDescription {
  bodyPart: string,
  text: string,
  position: string,
  name: string,
  exerciseName: EXERCISE_ENUM_VALUE
}

export interface UserStats {
  gender: { male: boolean, female: boolean },
  bodyWeight: number,
  age: number
  heightFeet: number,
  heightInches: number
}

export const MUSCLE_GROUPINGS = {
  CHIN_UP: ['biceps', 'lats'],
  INVERTED_ROW: ['posteriorDeltoids', 'rhomboids', 'lowerTraps'],
  DIP: ['triceps', 'anteriorDeltoids'],
  PUSH_UP: ['pecs'],
  GOBLET_SQUAT: ['abs, obliques', 'quads'],
  BACK_EXTENSION: ['hamstrings', 'glutes', 'erectors'],
  BROAD_JUMP: ['calves'],
  DEAD_HANG: ['forearms']
}

export interface StandardsDropdownSelection {
  gender: 'MALE' | 'FEMALE',
  weight: number,
  age: number
}