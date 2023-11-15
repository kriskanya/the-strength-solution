import { Schema, ValidationOptions } from 'joi'
import { IIdParam } from '@/common/validation/constants/app.constants'
import { Joi } from '@/common/validation/validation'

export const ANY                     = Joi.any()
// BOOL
export const BOOLEAN_DEFAULT_TRUE    = Joi.boolean().default(true)
export const BOOLEAN_DEFAULT_FALSE   = Joi.boolean().default(false)
export const BOOLEAN                 = Joi.boolean()

// STRINGS
export const NON_EMPTY_STR           = Joi.string().trim().options({ convert:true })
export const OPTIONAL_NULLABLE_STR   = NON_EMPTY_STR.allow(null, '')
export const OPTIONAL_STR            = NON_EMPTY_STR.allow('')
export const UUID_V4                 = Joi.string().uuid({ version:'uuidv4' })
export const BASE_URL                = Joi.string().uri({ allowRelative:false })

// EMAIL
export const EMAIL                   = Joi.string().email()
export const EMAIL_MULTI             = Joi.string().email({ multiple:true, separator:',' }).trim().options({ convert:true })
export const EMAIL_MULTI_TRIM        = EMAIL_MULTI.trim().options({ convert:true })


export const POSITIVE_NONZERO_INT    = Joi.number().min(1).integer().positive()
export const UI_DB_ID                = POSITIVE_NONZERO_INT.options({ convert:true })
export const ID_PARAM     = Joi.object({ id:UI_DB_ID }).label('id')

export function validateIdParam(param:IIdParam):IIdParam {
  return validate(param, ID_PARAM)
}

export function validate<T>(obj:T, schema:Schema, prefs: ValidationOptions = {}):T {
  const { error, value } = schema.prefs(prefs).validate(obj)

  if (error) throw error
  else
    return <T>value
}