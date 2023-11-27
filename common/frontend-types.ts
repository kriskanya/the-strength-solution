import { EXERCISE_ENUM_VALUE } from '@/common/shared-types'

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