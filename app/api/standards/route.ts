const _ = require('lodash')
import { type NextRequest, NextResponse } from 'next/server'

import { prisma } from '@/lib/prisma'
import { AGE_RANGES, BODYWEIGHT_RANGES, StrengthStandardRecord } from '@/common/backend-types'
import { determineRange, formatStringsForQuery, groupDataByExercise } from '@/common/standards-helpers'
import { Standard } from '@prisma/client'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const gender: string     = searchParams.get('gender') as string
    const age: string        = searchParams.get('age') as string
    const ageRange = determineRange(AGE_RANGES, age)
    const bodyWeight: string = searchParams.get('bodyWeight') as string
    const bodyWeightRange = determineRange(BODYWEIGHT_RANGES, bodyWeight)
    const exerciseNames: string      = searchParams.get('exerciseNames') as string

    const sqlGetExercises = `SELECT * FROM "Exercise" WHERE "exerciseName" IN (${ formatStringsForQuery(exerciseNames) })`
    const exerciseRecords = await prisma.$queryRawUnsafe(sqlGetExercises)
    const exerciseIds = _.map(exerciseRecords, 'id')

    const sql = `SELECT * FROM "Standard" INNER JOIN "Exercise" ON "Standard"."exerciseId" = "Exercise".id WHERE "ageRange"='${ageRange}' AND "bodyWeight"='${bodyWeightRange}' AND gender='${_.upperCase(gender)}' AND "exerciseId" IN (` + exerciseIds + `);`
    const standards: Standard[] = await prisma.$queryRawUnsafe(sql)

    const standardsGroupedByExercise = groupDataByExercise(standards)

    return Response.json(standardsGroupedByExercise)
  } catch (err: any) {
    return new NextResponse(
      JSON.stringify({
        error: err?.message
      }),
      {
        status: 500
      }
    )
  }
}