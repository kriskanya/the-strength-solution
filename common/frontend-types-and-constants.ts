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

export const MUSCLE_PROFICIENCIES = {
  // front
  absFront: {
    NOVICE: 'You have demonstrated insufficient muscular endurance in the abdominal muscle group. An emphasis on more isometric exercises such as the plank would improve this.',
    INTERMEDIATE: 'You have demonstrated less than average muscular endurance in the abdominal muscle group. An emphasis on more isometric exercises such as the plank would improve this.',
    PROFICIENT: 'You have demonstrated average muscular endurance in the abdominal muscle group. An emphasis on more isometric exercises such as the plank would improve this.',
    ADVANCED: 'You have demonstrated greater than average muscular endurance in the abdominal muscle group. An emphasis on more isometric exercises such as the plank would improve this.',
    ELITE: 'You have demonstrated ideal muscular endurance in the abdominal muscle group. Emphasis should be placed on bringing other muscle groups up to this level.'
  },
  biceps: {
    NOVICE: 'You have demonstrated insufficient muscular endurance in the biceps muscle group. An emphasis on more vertical pulling exercises such as the chin-up would improve this.',
    INTERMEDIATE: 'You have demonstrated less than average muscular endurance in the biceps muscle group. An emphasis on more vertical pulling exercises such as the chin-up would improve this.',
    PROFICIENT: 'You have demonstrated average muscular endurance in the biceps muscle group. An emphasis on more vertical pulling exercises such as the chin-up would improve this.',
    ADVANCED: 'You have demonstrated greater than average muscular endurance in the biceps muscle group. An emphasis on more vertical pulling exercises such as the chin-up would improve this.',
    ELITE: 'You have demonstrated ideal muscular endurance in the biceps muscle group. Emphasis should be placed on bringing other muscle groups up to this level.'
  },
  calvesFront: {
    NOVICE: 'You have demonstrated insufficient muscular endurance in the calf muscle group. An emphasis on more plyometric exercises such as jumps would improve this.',
    INTERMEDIATE: 'You have demonstrated less than average muscular endurance in the calf muscle group. An emphasis on more plyometric exercises such as jumps would improve this.',
    PROFICIENT: 'You have demonstrated average muscular endurance in the calf muscle group. An emphasis on more plyometric exercises such as jumps would improve this.',
    ADVANCED: 'You have demonstrated greater than average muscular endurance in the calf muscle group. An emphasis on more plyometric exercises such as jumps would improve this.',
    ELITE: 'You have demonstrated ideal muscular endurance in the calf muscle group. Emphasis should be placed on bringing other muscle groups up to this level.'
  },
  deltsFront: {
    NOVICE: 'You have demonstrated insufficient muscular endurance in the anterior deltoids. An emphasis on more horizontal pressing exercises such as the push-up would improve this.',
    INTERMEDIATE: 'You have demonstrated less than average muscular endurance in the anterior deltoids. An emphasis on more horizontal pressing exercises such as the push-up would improve this.',
    PROFICIENT: 'You have demonstrated average muscular endurance in the anterior deltoids. An emphasis on more horizontal pressing exercises such as the push-up would improve this.',
    ADVANCED: 'You have demonstrated greater than average muscular endurance in the anterior deltoids. An emphasis on more horizontal pressing exercises such as the push-up would improve this.',
    ELITE: 'You have demonstrated ideal muscular endurance in the anterior deltoids. Emphasis should be placed on bringing other muscle groups up to this level.'
  },
  forearmsFront: {
    NOVICE: 'You have demonstrated insufficient muscular endurance in the forearm muscle group. An emphasis on more grip-intensive exercises such as hanging would improve this.',
    INTERMEDIATE: 'You have demonstrated less than average muscular endurance in the forearm muscle group. An emphasis on more grip-intensive exercises such as hanging would improve this.',
    PROFICIENT: 'You have demonstrated average muscular endurance in the forearm muscle group. An emphasis on more grip-intensive exercises such as hanging would improve this.',
    ADVANCED: 'You have demonstrated greater than average muscular endurance in the forearm muscle group. An emphasis on more grip-intensive exercises such as hanging would improve this.',
    ELITE: 'You have demonstrated ideal muscular endurance in the forearm muscle group. Emphasis should be placed on bringing other muscle groups up to this level.'
  },
  obliquesFront: {
    NOVICE: 'You have demonstrated insufficient muscular endurance in the oblique muscle group. An emphasis on more isometric exercises such as the side plank would improve this.',
    INTERMEDIATE: 'You have demonstrated less than average muscular endurance in the oblique muscle group. An emphasis on more isometric exercises such as the side plank would improve this.',
    PROFICIENT: 'You have demonstrated average muscular endurance in the oblique muscle group. An emphasis on more isometric exercises such as the side plank would improve this.',
    ADVANCED: 'You have demonstrated greater than average muscular endurance in the oblique muscle group. An emphasis on more isometric exercises such as the side plank would improve this.',
    ELITE: 'You have demonstrated ideal muscular endurance in the oblique muscle group. Emphasis should be placed on bringing other muscle groups up to this level.'
  },
  pecs: {
    NOVICE: 'You have demonstrated insufficient muscular endurance in the pectoralis major muscle group. An emphasis on more horizontal pushing exercises such as the push-up would improve this.',
    INTERMEDIATE: 'You have demonstrated less than average muscular endurance in the pectoralis major muscle group. An emphasis on more horizontal pushing exercises such as the push-up would improve this.',
    PROFICIENT: 'You have demonstrated average muscular endurance in the pectoralis major muscle group. An emphasis on more horizontal pushing exercises such as the push-up would improve this.',
    ADVANCED: 'You have demonstrated greater than average muscular endurance in the pectoralis major muscle group. An emphasis on more horizontal pushing exercises such as the push-up would further improve this.',
    ELITE: 'You have demonstrated ideal muscular endurance in the pectoralis major muscle group. Emphasis should be placed on bringing other muscle groups up to this level.'
  },
  quads: {
    NOVICE: 'You have demonstrated insufficient muscular endurance in the anterior chain muscle group. An emphasis on more squatting exercises such as the goblet squat would improve this.',
    INTERMEDIATE: 'You have demonstrated less than average muscular endurance in the anterior chain muscle group. An emphasis on more squatting exercises such as the goblet squat would improve this.',
    PROFICIENT: 'You have demonstrated average muscular endurance in the anterior chain muscle group. An emphasis on more squatting exercises such as the goblet squat would improve this.',
    ADVANCED: 'You have demonstrated greater than average muscular endurance in the anterior chain muscle group. An emphasis on more squatting exercises such as the goblet squat would further improve this.',
    ELITE: 'You have demonstrated ideal muscular endurance in the anterior chain muscle group. Emphasis should be placed on bringing other muscle groups up to this level.'
  },
  trapsFront: {
    NOVICE: 'You have demonstrated insufficient muscular endurance in the trapezius muscle group. An emphasis on more loaded carries such as the farmer\'s walk would improve this.',
    INTERMEDIATE: 'You have demonstrated less than average muscular endurance in the trapezius muscle group. An emphasis on more loaded carries such as the farmer\'s walk would improve this.',
    PROFICIENT: 'You have demonstrated average muscular endurance in the trapezius muscle group. An emphasis on more loaded carries such as the farmer\'s walk would improve this.',
    ADVANCED: 'You have demonstrated greater than average muscular endurance in the trapezius muscle group. An emphasis on more loaded carries such as the farmer\'s walk would improve this.',
    ELITE: 'You have demonstrated ideal muscular endurance in the trapezius muscle group. Emphasis should be placed on bringing other muscle groups up to this level.'
  },
  // rear
  absRear: {
    NOVICE: 'You have demonstrated insufficient muscular endurance in the abdominal muscle group. An emphasis on more isometric exercises such as the plank would improve this.',
    INTERMEDIATE: 'You have demonstrated less than average muscular endurance in the abdominal muscle group. An emphasis on more isometric exercises such as the plank would improve this.',
    PROFICIENT: 'You have demonstrated average muscular endurance in the abdominal muscle group. An emphasis on more isometric exercises such as the plank would improve this.',
    ADVANCED: 'You have demonstrated greater than average muscular endurance in the abdominal muscle group. An emphasis on more isometric exercises such as the plank would improve this.',
    ELITE: 'You have demonstrated ideal muscular endurance in the abdominal muscle group. Emphasis should be placed on bringing other muscle groups up to this level.'
  },
  adductors: {
    NOVICE: 'You have demonstrated insufficient muscular endurance in the adductor muscle group. An emphasis on more isometric exercises such as the Copenhagen plank would improve this.',
    INTERMEDIATE: 'You have demonstrated less than average muscular endurance in the adductor muscle group. An emphasis on more isometric exercises such as the Copenhagen plank would improve this.',
    PROFICIENT: 'You have demonstrated average muscular endurance in the adductor muscle group. An emphasis on more isometric exercises such as the Copenhagen plank would improve this.',
    ADVANCED: 'You have demonstrated greater than average muscular endurance in the adductor muscle group. An emphasis on more isometric exercises such as the Copenhagen plank would improve this.',
    ELITE: 'You have demonstrated ideal muscular endurance in the adductor muscle group. Emphasis should be placed on bringing other muscle groups up to this level.'
  },
  calvesRear: {
    NOVICE: 'You have demonstrated insufficient muscular endurance in the calf muscle group. An emphasis on more plyometric exercises such as jumps would improve this.',
    INTERMEDIATE: 'You have demonstrated less than average muscular endurance in the calf muscle group. An emphasis on more plyometric exercises such as jumps would improve this.',
    PROFICIENT: 'You have demonstrated average muscular endurance in the calf muscle group. An emphasis on more plyometric exercises such as jumps would improve this.',
    ADVANCED: 'You have demonstrated greater than average muscular endurance in the calf muscle group. An emphasis on more plyometric exercises such as jumps would improve this.',
    ELITE: 'You have demonstrated ideal muscular endurance in the calf muscle group. Emphasis should be placed on bringing other muscle groups up to this level.'
  },
  deltsRear: {
    NOVICE: 'You have demonstrated insufficient muscular endurance in the posterior deltoids. An emphasis on more horizontal pulling exercises such as the inverted row would improve this.',
    INTERMEDIATE: 'You have demonstrated less than average muscular endurance in the posterior deltoids. An emphasis on more horizontal pulling exercises such as the inverted row would improve this.',
    PROFICIENT: 'You have demonstrated average muscular endurance in the posterior deltoids. An emphasis on more horizontal pulling exercises such as the inverted row would improve this.',
    ADVANCED: 'You have demonstrated greater than average muscular endurance in the posterior deltoids. An emphasis on more horizontal pulling exercises such as the inverted row would improve this.',
    ELITE: 'You have demonstrated ideal muscular endurance in the posterior deltoids. Emphasis should be placed on bringing other muscle groups up to this level.'
  },
  erectors: {
    NOVICE: 'You have demonstrated insufficient muscular endurance in the posterior chain muscle group. An emphasis on more hinging exercises such as the back extension would improve this.',
    INTERMEDIATE: 'You have demonstrated less than average muscular endurance in the posterior chain muscle group. An emphasis on more hinging exercises such as the back extension would improve this.',
    PROFICIENT: 'You have demonstrated average muscular endurance in the posterior chain muscle group. An emphasis on more hinging exercises such as the back extension would improve this.',
    ADVANCED: 'You have demonstrated greater than average muscular endurance in the posterior chain muscle group. An emphasis on more hinging exercises such as the back extension would further improve this.',
    ELITE: 'You have demonstrated greater than average muscular endurance in the anterior chain muscle group. An emphasis on more squatting exercises such as the goblet squat would further improve this.'
  },
  forearmsRear: {
    NOVICE: 'You have demonstrated insufficient muscular endurance in the forearm muscle group. An emphasis on more grip-intensive exercises such as hanging would improve this.',
    INTERMEDIATE: 'You have demonstrated less than average muscular endurance in the forearm muscle group. An emphasis on more grip-intensive exercises such as hanging would improve this.',
    PROFICIENT: 'You have demonstrated average muscular endurance in the forearm muscle group. An emphasis on more grip-intensive exercises such as hanging would improve this.',
    ADVANCED: 'You have demonstrated greater than average muscular endurance in the forearm muscle group. An emphasis on more grip-intensive exercises such as hanging would improve this.',
    ELITE: 'You have demonstrated ideal muscular endurance in the forearm muscle group. Emphasis should be placed on bringing other muscle groups up to this level.'
  },
  glutes: {
    NOVICE: 'You have demonstrated insufficient muscular endurance in the glute muscle group. An emphasis on more exercises such as the squat would improve this.',
    INTERMEDIATE: 'You have demonstrated less than average muscular endurance in the glute muscle group. An emphasis on more exercises such as the squat would improve this.',
    PROFICIENT: 'You have demonstrated average muscular endurance in the glute muscle group. An emphasis on more exercises such as the squat would improve this.',
    ADVANCED: 'You have demonstrated greater than average muscular endurance in the glute muscle group. An emphasis on more exercises such as the squat would improve this.',
    ELITE: 'You have demonstrated ideal muscular endurance in the glute muscle group. Emphasis should be placed on bringing other muscle groups up to this level.'
  },
  hamstrings: {
    NOVICE: 'You have demonstrated insufficient muscular endurance in the posterior chain muscle group. An emphasis on more hinging exercises such as the back extension would improve this.',
    INTERMEDIATE: 'You have demonstrated less than average muscular endurance in the posterior chain muscle group. An emphasis on more hinging exercises such as the back extension would improve this.',
    PROFICIENT: 'You have demonstrated average muscular endurance in the posterior chain muscle group. An emphasis on more hinging exercises such as the back extension would improve this.',
    ADVANCED: 'You have demonstrated greater than average muscular endurance in the posterior chain muscle group. An emphasis on more hinging exercises such as the back extension would further improve this.',
    ELITE: 'You have demonstrated greater than average muscular endurance in the anterior chain muscle group. An emphasis on more squatting exercises such as the goblet squat would further improve this.'
  },
  lats: {
    NOVICE: 'You have demonstrated insufficient muscular endurance in the latissimus dorsi muscle group. An emphasis on more vertical pulling exercises such as the chin-up and the pull-up would improve this.',
    INTERMEDIATE: 'You have demonstrated less than average muscular endurance in the latissimus dorsi muscle group. An emphasis on more vertical pulling exercises such as the chin-up and the pull-up would improve this.',
    PROFICIENT: 'You have demonstrated average muscular endurance in the latissimus dorsi muscle group. An emphasis on more vertical pulling exercises such as the chin-up and the pull-up would improve this.',
    ADVANCED: 'You have demonstrated greater than average muscular endurance in the latissimus dorsi muscle group. An emphasis on more vertical pulling exercises such as the chin-up and the pull-up would further improve this',
    ELITE: 'You have demonstrated ideal muscular endurance in the latissimus dorsi muscle group. Emphasis should be placed on bringing other muscle groups up to this level.'
  },
  obliquesRear: {
    NOVICE: 'You have demonstrated insufficient muscular endurance in the oblique muscle group. An emphasis on more isometric exercises such as the side plank would improve this.',
    INTERMEDIATE: 'You have demonstrated less than average muscular endurance in the oblique muscle group. An emphasis on more isometric exercises such as the side plank would improve this.',
    PROFICIENT: 'You have demonstrated average muscular endurance in the oblique muscle group. An emphasis on more isometric exercises such as the side plank would improve this.',
    ADVANCED: 'You have demonstrated greater than average muscular endurance in the oblique muscle group. An emphasis on more isometric exercises such as the side plank would improve this.',
    ELITE: 'You have demonstrated ideal muscular endurance in the oblique muscle group. Emphasis should be placed on bringing other muscle groups up to this level.'
  },
  rhomboids: {
    NOVICE: 'You have demonstrated insufficient muscular endurance in the rhomboid muscle group. An emphasis on more horizontal pulling exercises such as the inverted row would improve this.',
    INTERMEDIATE: 'You have demonstrated less than average muscular endurance in the rhomboid muscle group. An emphasis on more horizontal pulling exercises such as the inverted row would improve this.',
    PROFICIENT: 'You have demonstrated average muscular endurance in the rhomboid muscle group. An emphasis on more horizontal pulling exercises such as the inverted row would improve this.',
    ADVANCED: 'You have demonstrated greater than average muscular endurance in the rhomboid muscle group. An emphasis on more horizontal pulling exercises such as the inverted row would further improve this.',
    ELITE: 'You have demonstrated ideal muscular endurance in the rhomboid muscle group. Emphasis should be placed on bringing other muscle groups up to this level.'
  },
  trapsRear: {
    NOVICE: 'You have demonstrated insufficient muscular endurance in the trapezius muscle group. An emphasis on more loaded carries such as the farmer\'s walk would improve this.',
    INTERMEDIATE: 'You have demonstrated less than average muscular endurance in the trapezius muscle group. An emphasis on more loaded carries such as the farmer\'s walk would improve this.',
    PROFICIENT: 'You have demonstrated average muscular endurance in the trapezius muscle group. An emphasis on more loaded carries such as the farmer\'s walk would improve this.',
    ADVANCED: 'You have demonstrated greater than average muscular endurance in the trapezius muscle group. An emphasis on more loaded carries such as the farmer\'s walk would improve this.',
    ELITE: 'You have demonstrated ideal muscular endurance in the trapezius muscle group. Emphasis should be placed on bringing other muscle groups up to this level.'
  },
  triceps: {
    NOVICE: 'You have demonstrated insufficient muscular endurance in the triceps muscle group. An emphasis on more pressing exercises such as the triceps dip would improve this.',
    INTERMEDIATE: 'You have demonstrated less than average muscular endurance in the triceps muscle group. An emphasis on more pressing exercises such as the triceps dip would improve this.',
    PROFICIENT: 'You have demonstrated average muscular endurance in the triceps muscle group. An emphasis on more pressing exercises such as the triceps dip would improve this.',
    ADVANCED: 'You have demonstrated greater than average muscular endurance in the triceps muscle group. An emphasis on more pressing exercises such as the triceps dip would improve this.',
    ELITE: 'You have demonstrated ideal muscular endurance in the triceps muscle group. Emphasis should be placed on bringing other muscle groups up to this level.'
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