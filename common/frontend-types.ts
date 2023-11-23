import { EXERCISE_ENUM_VALUE } from '@/common/shared-types'

export interface Description {
  [key: string]: { position: string, exercise: EXERCISE_ENUM_VALUE, name: string, text: string }
}

export interface AvatarColorsFront {
  colors: {
    trapsFront: string,
    deltsFront: string,
    pecs: string,
    biceps: string,
    forearmsFront: string,
    absFront: string,
    obliquesFront: string,
    quads: string,
    calvesFront: string,
    neck: string,
    hands: string,
    head: string,
    hair?: string
  }
}

export interface AvatarColorsRear {
  colors: {
    calvesRear: string,
    adductors: string,
    quads: string,
    hamstrings: string,
    glutes: string,
    obliquesRear: string,
    trapsRear: string,
    lats: string,
    rotatorCuff: string,
    forearmsRear: string,
    triceps: string,
    deltsRear: string,
    erectors: string,
    lowerTraps: string
    rhomboids: string,
    hands: string,
    head: string
  }
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