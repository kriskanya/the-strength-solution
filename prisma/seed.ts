/**
 * @/` paths don't seem to work when importing into this file, likely because
 * of the --compiler-options {"module":"CommonJS"} flag
 */

const _ = require('lodash')
import { hash } from 'bcrypt'
import { createExerciseSeedValues, createStandardSeedValues } from './seed/standards'
import { ExerciseRecordPayload, StrengthStandardRecord } from '@/common/backend-types-and-constants'

import { prisma } from '../lib/prisma'

function checkIfSomeFieldsEmpty(seedValues: StrengthStandardRecord[]) {
  if (_.isEmpty(seedValues)) return

  let emptyFields: any = []

  seedValues.forEach((obj: StrengthStandardRecord) => {
    for (const [key, value] of Object.entries(obj)) {
      if (_.isString(value) && value.length === 0) {
        emptyFields = [...emptyFields, { hasEmptyFields: obj }]
      } else if (_.isNull(value) || _.isUndefined(value)) {
        emptyFields = [...emptyFields, { hasEmptyFields: obj }]
      }
    }
  })
  return emptyFields
}

async function main() {
  const password = await hash('password', 12)
  const user = await prisma.user.upsert({
    where: { email: 'test@test.com' },
    update: {},
    create: {
      email: 'test@test.com',
      firstName: 'Test',
      lastName: 'User',
      password
    }
  })

  const migrationAlreadyRun = await prisma.standard.findFirst()

  if (migrationAlreadyRun) return

  return prisma.$transaction(async (tx) => {
    const exerciseSeedValues: ExerciseRecordPayload[] = createExerciseSeedValues()
    await tx.exercise.createMany({
      data: exerciseSeedValues
    })
    const exerciseRecords = await tx.exercise.findMany()

    const seedValues: StrengthStandardRecord[] = await createStandardSeedValues(exerciseRecords)
    const seedValuesInvalid = checkIfSomeFieldsEmpty(seedValues)

    if (_.isArray(seedValuesInvalid) && seedValuesInvalid.length > 0) {
      console.error('Issues with seed data', seedValuesInvalid)
      return
    }

    console.log('Seeding DB')
    await tx.standard.createMany({
      data: seedValues
    })
  })
}
main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })