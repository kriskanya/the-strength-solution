import Joi, { ValidationOptions } from 'joi'
import {
  POSITIVE_NONZERO_INT,
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

export interface UpdateProfilePayload {
  gender: 'MALE' | 'FEMALE'
  bodyWeight: number
  age: number
  height: number
}

export const UPDATE_PROFILE_PAYLOAD = Joi.object().keys({
  gender: Joi.string().valid('MALE', 'FEMALE'),
  bodyWeight: POSITIVE_NONZERO_INT,
  age: POSITIVE_NONZERO_INT,
  height: POSITIVE_NONZERO_INT,
}).label('updateProfilePayload')

export function validateUpdateProfilePayload(params: UpdateProfilePayload) {
  return validate(params, UPDATE_PROFILE_PAYLOAD, VALIDATION_OPTS)
}
