import Joi, { ValidationOptions } from 'joi'
import {
  POSITIVE_NONZERO_INT, UI_DB_ID,
  validate
} from '@/common/validation/constants/common_validation.constants'
import { CreateProfilePayload } from '@/app/api/profile/profile-helpers'

const VALIDATION_OPTS:ValidationOptions = {
  abortEarly    : true,
  allowUnknown  : false,
  stripUnknown  : false,
  skipFunctions : true,
  presence      : 'required',
  noDefaults    : true,
  convert       : false
}

export const CREATE_PROFILE_PAYLOAD = Joi.object().keys({
  gender     : Joi.string().valid('MALE', 'FEMALE'),
  bodyWeight : POSITIVE_NONZERO_INT,
  age        : POSITIVE_NONZERO_INT,
  height     : POSITIVE_NONZERO_INT,
  userId     : UI_DB_ID
}).label('createProfilePayload')

export function validateCreateProfilePayload(params: CreateProfilePayload) {
  return validate(params, CREATE_PROFILE_PAYLOAD, VALIDATION_OPTS)
}