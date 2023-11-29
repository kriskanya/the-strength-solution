import Joi, { ValidationOptions } from 'joi'
import {
  JSON_ARRAY,
  POSITIVE_NONZERO_INT, UI_DB_ID,
  validate
} from '@/common/validation/constants/common_validation.constants'
import { SaveStats } from '@/app/api/stats/stats-helpers'

const VALIDATION_OPTS:ValidationOptions = {
  abortEarly    : true,
  allowUnknown  : false,
  stripUnknown  : false,
  skipFunctions : true,
  presence      : 'required',
  noDefaults    : true,
  convert       : false
}

export const SAVE_STATS_PAYLOAD = Joi.object().keys({
  gender     : Joi.string().valid('MALE', 'FEMALE'),
  bodyWeight : POSITIVE_NONZERO_INT,
  age        : POSITIVE_NONZERO_INT,
  exercises  : JSON_ARRAY,
  userId     : UI_DB_ID,
  source     : Joi.string().valid('UPDATE_STATS', 'LOG_EXERCISE'),
}).label('saveStatsPayload')

export function validateStatsPayload(params: SaveStats) {
  return validate(params, SAVE_STATS_PAYLOAD, VALIDATION_OPTS)
}