import {
  POSITIVE_NONZERO_INT,
  validate
} from '@/common/validation/constants/common_validation.constants'
import Joi, { ValidationOptions } from 'joi'
import { ExercisesPerformedPayload } from '@/common/shared-types'

/**
 * Need to set 'presence' to 'optional' here---the object CREATE_EXERCISE_PERFORMED_PAYLOAD
 * must have at least one of those key-value pairs, but not all of them
 */
const VALIDATION_OPTS:ValidationOptions = {
  abortEarly    : true,
  allowUnknown  : false,
  stripUnknown  : false,
  skipFunctions : true,
  presence      : 'optional',
  noDefaults    : true,
  convert       : false,
}

export const CREATE_EXERCISE_PERFORMED_PAYLOAD = Joi.object().keys({
  PUSH_UP:        Joi.object({ reps: POSITIVE_NONZERO_INT, exerciseId: POSITIVE_NONZERO_INT }),
  INVERTED_ROW:   Joi.object({ reps: POSITIVE_NONZERO_INT, exerciseId: POSITIVE_NONZERO_INT }),
  DIP:            Joi.object({ reps: POSITIVE_NONZERO_INT, exerciseId: POSITIVE_NONZERO_INT }),
  CHIN_UP:        Joi.object({ reps: POSITIVE_NONZERO_INT, exerciseId: POSITIVE_NONZERO_INT }),
  PULL_UP:        Joi.object({ reps: POSITIVE_NONZERO_INT, exerciseId: POSITIVE_NONZERO_INT }),
  GOBLET_SQUAT:   Joi.object({ reps: POSITIVE_NONZERO_INT, exerciseId: POSITIVE_NONZERO_INT }),
  BACK_EXTENSION: Joi.object({ reps: POSITIVE_NONZERO_INT, exerciseId: POSITIVE_NONZERO_INT })
}).or('PUSH_UP', 'INVERTED_ROW', 'DIP', 'CHIN_UP', 'PULL_UP', 'GOBLET_SQUAT', 'BACK_EXTENSION')
  .label('createExercisePerformedPayload')

export function validatePayload(params: ExercisesPerformedPayload) {
  return validate(params, CREATE_EXERCISE_PERFORMED_PAYLOAD, VALIDATION_OPTS)
}