import {
  AgeRange,
  ExerciseName,
  Gender,
  Level,
  Prisma,
} from '@prisma/client'

import { AGE_RANGES } from '../common/backend-types-and-constants'
import { determineRange, determineNonStandardExerciseLevel } from '../common/standards-helpers'
import { prisma } from './prisma'

type LatestPerformedForCohortRow = {
  exerciseId: number
  exerciseName: ExerciseName
  quantity: number
  standardLevel: Level | null
  gender: Gender
  age: number
  bodyWeight: number
  height: number
}

type CohortCounts = {
  exerciseId: number
  gender: Gender
  ageRange: AgeRange
  noviceCount: number
  intermediateCount: number
  proficientCount: number
  advancedCount: number
  eliteCount: number
}

const countKeyByLevel: Record<Level, keyof Pick<CohortCounts, 'noviceCount' | 'intermediateCount' | 'proficientCount' | 'advancedCount' | 'eliteCount'>> = {
  NOVICE: 'noviceCount',
  INTERMEDIATE: 'intermediateCount',
  PROFICIENT: 'proficientCount',
  ADVANCED: 'advancedCount',
  ELITE: 'eliteCount',
}

function resolveAgeRange(age: number): AgeRange | undefined {
  const ageRange = determineRange(Object.keys(AGE_RANGES), `${age}`)

  return ageRange ? AGE_RANGES[ageRange] : undefined
}

function resolveLevel(row: LatestPerformedForCohortRow): Level | undefined {
  if (row.standardLevel) {
    return row.standardLevel
  }

  return determineNonStandardExerciseLevel({
    bodyWeight: row.bodyWeight,
    exerciseName: row.exerciseName,
    height: row.height,
    quantity: row.quantity,
  })
}

function emptyCounts(row: LatestPerformedForCohortRow, ageRange: AgeRange): CohortCounts {
  return {
    exerciseId: row.exerciseId,
    gender: row.gender,
    ageRange,
    noviceCount: 0,
    intermediateCount: 0,
    proficientCount: 0,
    advancedCount: 0,
    eliteCount: 0,
  }
}

function sampleSize(counts: CohortCounts): number {
  return counts.noviceCount +
    counts.intermediateCount +
    counts.proficientCount +
    counts.advancedCount +
    counts.eliteCount
}

async function fetchLatestPerformedRows(): Promise<LatestPerformedForCohortRow[]> {
  return prisma.$queryRaw<LatestPerformedForCohortRow[]>(Prisma.sql`
    SELECT DISTINCT ON (ep."userId", ep."exerciseId")
      ep."exerciseId" AS "exerciseId",
      e."exerciseName"::text AS "exerciseName",
      ep."quantity" AS "quantity",
      st."level"::text AS "standardLevel",
      p."gender"::text AS "gender",
      p."age" AS "age",
      p."bodyWeight" AS "bodyWeight",
      p."height" AS "height"
    FROM "ExercisePerformed" ep
    INNER JOIN "User" u ON u."id" = ep."userId"
    INNER JOIN "Profile" p ON p."id" = u."profileId"
    INNER JOIN "Exercise" e ON e."id" = ep."exerciseId"
    LEFT JOIN "Standard" st ON st."id" = ep."standardId"
    WHERE ep."source" = 'UPDATE_STATS'::"ExercisePerformedSource"
    ORDER BY ep."userId", ep."exerciseId", ep."datePerformed" DESC, ep."id" DESC
  `)
}

export async function rebuildExerciseCohortProficiencies() {
  const latestRows = await fetchLatestPerformedRows()
  const cohortsByKey = new Map<string, CohortCounts>()

  latestRows.forEach((row) => {
    const ageRange = resolveAgeRange(row.age)
    const level = resolveLevel(row)

    if (!ageRange || !level) {
      return
    }

    const key = `${row.exerciseId}:${row.gender}:${ageRange}`
    const counts = cohortsByKey.get(key) || emptyCounts(row, ageRange)
    const countKey = countKeyByLevel[level]

    counts[countKey] += 1
    cohortsByKey.set(key, counts)
  })

  const cohorts = Array.from(cohortsByKey.values())
  const computedAt = new Date()

  await prisma.$transaction(async (tx) => {
    await Promise.all(cohorts.map((cohort) => {
      const size = sampleSize(cohort)

      return tx.exerciseCohortProficiency.upsert({
        where: {
          exerciseId_gender_ageRange: {
            exerciseId: cohort.exerciseId,
            gender: cohort.gender,
            ageRange: cohort.ageRange,
          },
        },
        update: {
          sampleSize: size,
          noviceCount: cohort.noviceCount,
          intermediateCount: cohort.intermediateCount,
          proficientCount: cohort.proficientCount,
          advancedCount: cohort.advancedCount,
          eliteCount: cohort.eliteCount,
          computedAt,
        },
        create: {
          exerciseId: cohort.exerciseId,
          gender: cohort.gender,
          ageRange: cohort.ageRange,
          sampleSize: size,
          noviceCount: cohort.noviceCount,
          intermediateCount: cohort.intermediateCount,
          proficientCount: cohort.proficientCount,
          advancedCount: cohort.advancedCount,
          eliteCount: cohort.eliteCount,
          computedAt,
        },
      })
    }))
  })

  return {
    cohortCount: cohorts.length,
    computedAt,
    sourceRowCount: latestRows.length,
  }
}
