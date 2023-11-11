import joi, { ObjectSchema, Root, ValidationOptions } from 'joi'

export const DEFAULT_VALIDATION_OPTS:ValidationOptions = {
  abortEarly    : true,
  allowUnknown  : false,
  stripUnknown  : false,
  skipFunctions : true,
  presence      : 'required',
  noDefaults    : true,
  convert       : false,
}
export const Joi: Root = joi.defaults(function(schema) {
  const SCHEMA = schema.options(DEFAULT_VALIDATION_OPTS)

  switch (SCHEMA.type) {
    case 'number':
    case 'boolean':
      return SCHEMA.strict()
    case 'object':
      return (<ObjectSchema>SCHEMA).min(1)
    default:
      return SCHEMA
  }
})

Joi.preferences(DEFAULT_VALIDATION_OPTS)

