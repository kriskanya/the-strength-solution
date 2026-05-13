import Joi, { ValidationOptions } from 'joi'
import {
  BOOLEAN,
  JSON_ARRAY,
  UI_DB_ID,
  validate
} from '@/common/validation/constants/common_validation.constants'

const VALIDATION_OPTS: ValidationOptions = {
  abortEarly: true,
  allowUnknown: false,
  stripUnknown: false,
  skipFunctions: true,
  presence: 'required',
  noDefaults: true,
  convert: false,
}

export interface ExerciseActiveChange {
  exerciseId: number
  active: boolean
}

export interface SaveExerciseActiveChanges {
  changes: ExerciseActiveChange[]
}

export const SAVE_EXERCISE_ACTIVE_CHANGES_PAYLOAD = Joi.object().keys({
  changes: JSON_ARRAY.items(
    Joi.object().keys({
      exerciseId: UI_DB_ID,
      active: BOOLEAN,
    })
  ).min(1),
}).label('saveExerciseActiveChangesPayload')

export function validateSaveExerciseActiveChangesPayload(params: SaveExerciseActiveChanges) {
  return validate(params, SAVE_EXERCISE_ACTIVE_CHANGES_PAYLOAD, VALIDATION_OPTS)
}
