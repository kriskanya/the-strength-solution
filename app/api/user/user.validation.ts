import Joi, { ValidationOptions } from 'joi'
import { EMAIL, NON_EMPTY_STR, UI_USER_ID, validate } from '@/common/validation/constants/common_validation.constants'
import { UpdateUserPayload } from '@/app/api/user/user-helpers'

const VALIDATION_OPTS:ValidationOptions = {
  abortEarly    : true,
  allowUnknown  : false,
  stripUnknown  : false,
  skipFunctions : true,
  presence      : 'required',
  noDefaults    : true,
  convert       : false
}

export const UPDATE_USER_PAYLOAD = Joi.object().keys({
  id         : UI_USER_ID,
  email      : EMAIL,
  firstName  : NON_EMPTY_STR,
  lastName   : NON_EMPTY_STR
}).label('upsertUser')

export function validateUpdateUserPayload(params: UpdateUserPayload) {
  return validate(params, UPDATE_USER_PAYLOAD, VALIDATION_OPTS)
}