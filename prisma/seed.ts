import { PrismaClient } from '@prisma/client'
const _ = require('lodash')
import { hash } from 'bcrypt'
import { standardSeedValues } from './seed/standards'
import { StrengthStandardRecord } from '@/common/backend-types'

const prisma = new PrismaClient()

function checkIfEmpty(seedValues: StrengthStandardRecord[]) {
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

  const seedValues: StrengthStandardRecord[] = await standardSeedValues() as StrengthStandardRecord[]
  const seedValuesInvalid = checkIfEmpty(seedValues)

  if (_.isArray(seedValuesInvalid) && seedValuesInvalid.length > 0) {
    console.error('Issues with seed data', seedValuesInvalid)
    return
  }

  console.log('Seeding DB')
  await prisma.standard.createMany({
    data: seedValues
  })
}
main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })