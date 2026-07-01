import Joi, { ValidationOptions } from 'joi'
import { EMAIL, validate } from '@/common/validation/constants/common_validation.constants'

const PASSWORD = Joi.string().min(8).max(128)

const VALIDATION_OPTS: ValidationOptions = {
  abortEarly: true,
  allowUnknown: false,
  stripUnknown: false,
  presence: 'required',
  convert: true,
}

const REGISTER_PAYLOAD = Joi.object({
  email: EMAIL,
  password: PASSWORD,
}).label('registerPayload')

export function validateRegisterPayload(params: { email: string; password: string }) {
  return validate(params, REGISTER_PAYLOAD, VALIDATION_OPTS)
}
