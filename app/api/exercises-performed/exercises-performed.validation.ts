import Joi, { ValidationOptions } from 'joi'
import {
  JSON_ARRAY,
  POSITIVE_NONZERO_INT,
  UI_DB_ID,
  validate
} from '@/common/validation/constants/common_validation.constants'
import { SAVED_EXERCISE_SOURCE_ENUM_VALUE } from '@/common/shared-types-and-constants'

const VALIDATION_OPTS: ValidationOptions = {
  abortEarly: true,
  allowUnknown: false,
  stripUnknown: false,
  skipFunctions: true,
  presence: 'required',
  noDefaults: true,
  convert: false,
}

export interface ExercisePerformedChange {
  exerciseId: number
  quantity: number
  performedId?: number
}

export interface SaveExercisePerformedChanges {
  source: SAVED_EXERCISE_SOURCE_ENUM_VALUE
  changes: ExercisePerformedChange[]
}

export const SAVE_EXERCISE_PERFORMED_CHANGES_PAYLOAD = Joi.object().keys({
  source: Joi.string().valid('UPDATE_STATS', 'LOG_EXERCISE'),
  changes: JSON_ARRAY.items(
    Joi.object().keys({
      exerciseId: UI_DB_ID,
      quantity: Joi.number().integer().min(0),
      performedId: POSITIVE_NONZERO_INT.optional(),
    })
  ).min(1),
}).label('saveExercisePerformedChangesPayload')

export function validateSaveExercisePerformedChangesPayload(params: SaveExercisePerformedChanges) {
  return validate(params, SAVE_EXERCISE_PERFORMED_CHANGES_PAYLOAD, VALIDATION_OPTS)
}
