import { convertHeightToInches } from '@/app/components/auth/auth-helpers'
import { UserStats } from '@/common/frontend-types-and-constants'
import { UserSavedExercise } from '@/common/shared-types-and-constants'
import { ExerciseActiveChange } from '@/app/api/exercises/choose/choose-active.validation'
import { ExercisePerformedChange } from '@/app/api/exercises-performed/exercises-performed.validation'
import { UpdateProfilePayload } from '@/app/api/profile/profile-me.validation'

export interface UpdateStatsSaveDeltas {
  profile?: UpdateProfilePayload
  activeChanges: ExerciseActiveChange[]
  performedChanges: ExercisePerformedChange[]
}

export function buildProfileDelta(
  baseline: UserStats,
  current: UserStats
): UpdateProfilePayload | undefined {
  const gender = current.gender.male ? 'MALE' : 'FEMALE'
  const baselineGender = baseline.gender.male ? 'MALE' : 'FEMALE'
  const height = convertHeightToInches(current.heightFeet, current.heightInches)
  const baselineHeight = convertHeightToInches(baseline.heightFeet, baseline.heightInches)

  if (
    gender === baselineGender &&
    current.bodyWeight === baseline.bodyWeight &&
    current.age === baseline.age &&
    height === baselineHeight
  ) {
    return undefined
  }

  return {
    gender,
    bodyWeight: current.bodyWeight,
    age: current.age,
    height,
  }
}

export function buildActiveChanges(
  baseline: UserSavedExercise[],
  current: UserSavedExercise[]
): ExerciseActiveChange[] {
  return current
    .filter((exercise) => {
      const baselineExercise = baseline.find((item) => item.exerciseId === exercise.exerciseId)
      return baselineExercise && baselineExercise.active !== exercise.active
    })
    .map((exercise) => ({
      exerciseId: exercise.exerciseId,
      active: exercise.active,
    }))
}

export function buildPerformedChanges(
  baseline: UserSavedExercise[],
  current: UserSavedExercise[],
  profileChanged: boolean
): ExercisePerformedChange[] {
  return current
    .filter((exercise) => {
      const quantity = exercise.loggedExercise?.quantity
      if (!Number.isFinite(quantity)) {
        return false
      }

      if (profileChanged) {
        return true
      }

      const baselineExercise = baseline.find((item) => item.exerciseId === exercise.exerciseId)
      return baselineExercise?.loggedExercise?.quantity !== quantity
    })
    .map((exercise) => ({
      exerciseId: exercise.exerciseId,
      quantity: exercise.loggedExercise?.quantity as number,
      performedId: exercise.loggedExercise?.id,
    }))
}

export function buildUpdateStatsSaveDeltas(
  baselineUserStats: UserStats,
  currentUserStats: UserStats,
  baselineExercises: UserSavedExercise[],
  currentExercises: UserSavedExercise[]
): UpdateStatsSaveDeltas {
  const profile = buildProfileDelta(baselineUserStats, currentUserStats)
  const profileChanged = profile !== undefined

  return {
    profile,
    activeChanges: buildActiveChanges(baselineExercises, currentExercises),
    performedChanges: buildPerformedChanges(baselineExercises, currentExercises, profileChanged),
  }
}

export function hasUpdateStatsSaveDeltas(deltas: UpdateStatsSaveDeltas): boolean {
  return Boolean(
    deltas.profile ||
    deltas.activeChanges.length > 0 ||
    deltas.performedChanges.length > 0
  )
}
