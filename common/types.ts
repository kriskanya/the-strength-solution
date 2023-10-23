export interface Description {
  [key: string]: { position: string, name: string, text: string }
}

export interface AvatarColorsFront {
  colors: {
    traps: string,
    delts: string,
    pecs: string,
    biceps: string,
    forearms: string,
    abs: string,
    obliques: string,
    quads: string,
    calves: string,
    neck: string,
    hands: string,
    head: string,
    hair?: string
  }
}

export interface AvatarColorsRear {
  colors: {
    calves: string,
    adductors: string,
    quads: string,
    hamstrings: string,
    glutes: string,
    obliques: string,
    traps: string,
    lats: string,
    rotatorCuff: string,
    forearms: string,
    triceps: string,
    delts: string,
    erectors: string,
    lowerTraps: string
    rhomboids: string,
    hands: string,
    head: string
  }
}