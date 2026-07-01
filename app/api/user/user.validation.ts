import Joi, { ValidationOptions } from 'joi'
import { EMAIL, NON_EMPTY_STR, UI_USER_ID, validate } from '@/common/validation/constants/common_validation.constants'
import { UpdateUserPayload } from '@/app/api/user/user-helpers'

const PASSWORD = Joi.string().min(8).max(128)

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

const SET_PASSWORD_PAYLOAD = Joi.object({
  newPassword: PASSWORD,
  confirmPassword: Joi.valid(Joi.ref('newPassword')).required().messages({
    'any.only': 'Passwords do not match.',
  }),
}).label('setPasswordPayload')

const CHANGE_PASSWORD_PAYLOAD = Joi.object({
  currentPassword: NON_EMPTY_STR,
  newPassword: PASSWORD,
  confirmPassword: Joi.valid(Joi.ref('newPassword')).required().messages({
    'any.only': 'Passwords do not match.',
  }),
}).label('changePasswordPayload')

export function validateSetPasswordPayload(params: { newPassword: string; confirmPassword: string }) {
  return validate(params, SET_PASSWORD_PAYLOAD, VALIDATION_OPTS)
}

export function validateChangePasswordPayload(params: {
  currentPassword: string
  newPassword: string
  confirmPassword: string
}) {
  return validate(params, CHANGE_PASSWORD_PAYLOAD, VALIDATION_OPTS)
}