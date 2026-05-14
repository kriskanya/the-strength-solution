import 'dotenv/config'

import { rebuildExerciseCohortProficiencies } from '../lib/cohort-proficiencies'
import { prisma } from '../lib/prisma'

async function main() {
  const result = await rebuildExerciseCohortProficiencies()

  console.log(`Rebuilt ${result.cohortCount} cohort proficiency rows from ${result.sourceRowCount} latest performed rows at ${result.computedAt.toISOString()}`)
}

main()
  .catch((err) => {
    console.error(err)
    process.exitCode = 1
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
