import Joi, { ValidationOptions } from 'joi'
import {
  JSON_ARRAY,
  UI_DB_ID,
  validate
} from '@/common/validation/constants/common_validation.constants'
import { InitialChooseExercises } from '@/app/api/exercises/exercises-helpers'

const VALIDATION_OPTS:ValidationOptions = {
  abortEarly    : true,
  allowUnknown  : false,
  stripUnknown  : false,
  skipFunctions : true,
  presence      : 'required',
  noDefaults    : true,
  convert       : false
}

// choose exercises for the first time
export const CHOOSE_EXERCISES_PAYLOAD = Joi.object().keys({
  profileId  : UI_DB_ID,
  exercises  : JSON_ARRAY
}).label('initialChooseExercises')

export function validateChooseExercisesPayload(params: InitialChooseExercises) {
  return validate(params, CHOOSE_EXERCISES_PAYLOAD, VALIDATION_OPTS)
}