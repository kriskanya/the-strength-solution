import { PrismaClient } from '@prisma/client'
import { hash } from 'bcrypt'
import { standardsMale1417 } from './seed/pushups-male[14-17]'
import { standardSeedValues } from './seed/standards'

const prisma = new PrismaClient()

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

  await prisma.standard.createMany({
    data: standardSeedValues()
  })
}
main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })