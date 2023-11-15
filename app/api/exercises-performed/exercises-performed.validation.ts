import {
  POSITIVE_NONZERO_INT,
  UI_DB_ID,
  validate
} from '@/common/validation/constants/common_validation.constants'
import { Joi } from '@/common/validation/validation'
import { CreateExercisesPerformed } from '@/app/api/exercises-performed/exercises-performed.constants'

export const CREATE_PARAMS     = Joi.object({
  userId  : UI_DB_ID,
  payload: Joi.object().keys({
    PUSH_UP:        Joi.object({ reps: POSITIVE_NONZERO_INT, exerciseId: POSITIVE_NONZERO_INT }),
    INVERTED_ROW:   Joi.object({ reps: POSITIVE_NONZERO_INT, exerciseId: POSITIVE_NONZERO_INT }),
    DIP:            Joi.object({ reps: POSITIVE_NONZERO_INT, exerciseId: POSITIVE_NONZERO_INT }),
    CHIN_UP:        Joi.object({ reps: POSITIVE_NONZERO_INT, exerciseId: POSITIVE_NONZERO_INT }),
    PULL_UP:        Joi.object({ reps: POSITIVE_NONZERO_INT, exerciseId: POSITIVE_NONZERO_INT }),
    GOBLET_SQUAT:   Joi.object({ reps: POSITIVE_NONZERO_INT, exerciseId: POSITIVE_NONZERO_INT }),
    BACK_EXTENSION: Joi.object({ reps: POSITIVE_NONZERO_INT, exerciseId: POSITIVE_NONZERO_INT })
  }).or('PUSH_UP', 'INVERTED_ROW', 'DIP', 'CHIN_UP', 'PULL_UP', 'GOBLET_SQUAT', 'BACK_EXTENSION')
}).label('createExercisePerformed')

export const PAYLOAD = Joi.object().keys({
  PUSH_UP:        Joi.any(),
  INVERTED_ROW:   Joi.any(),
  DIP:            Joi.any(),
  CHIN_UP:        Joi.any(),
  PULL_UP:        Joi.any(),
  GOBLET_SQUAT:   Joi.any(),
  BACK_EXTENSION: Joi.any()
}).or('PUSH_UP', 'INVERTED_ROW', 'DIP', 'CHIN_UP', 'PULL_UP', 'GOBLET_SQUAT', 'BACK_EXTENSION')

export function validateCreateParams(params: CreateExercisesPerformed) {
  return validate(params, CREATE_PARAMS)
}

export function validatePayload(params: CreateExercisesPerformed) {
  return validate(params, PAYLOAD)
}