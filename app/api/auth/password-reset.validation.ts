import Joi, { ValidationOptions } from 'joi'

import { EMAIL, NON_EMPTY_STR, validate } from '@/common/validation/constants/common_validation.constants'

const PASSWORD = Joi.string().min(8).max(128)

const VALIDATION_OPTS: ValidationOptions = {
  abortEarly: true,
  allowUnknown: false,
  stripUnknown: false,
  presence: 'required',
  convert: true,
}

const FORGOT_PASSWORD_PAYLOAD = Joi.object({
  email: EMAIL,
}).label('forgotPasswordPayload')

const RESET_PASSWORD_PAYLOAD = Joi.object({
  token: NON_EMPTY_STR.min(32).max(128),
  newPassword: PASSWORD,
  confirmPassword: Joi.valid(Joi.ref('newPassword')).required().messages({
    'any.only': 'Passwords do not match.',
  }),
}).label('resetPasswordPayload')

export function validateForgotPasswordPayload(params: { email: string }) {
  return validate(params, FORGOT_PASSWORD_PAYLOAD, VALIDATION_OPTS)
}

export function validateResetPasswordPayload(params: {
  token: string
  newPassword: string
  confirmPassword: string
}) {
  return validate(params, RESET_PASSWORD_PAYLOAD, VALIDATION_OPTS)
}
