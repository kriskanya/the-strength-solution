import { prisma } from '@/lib/prisma'
import { type NextRequest, NextResponse } from 'next/server'
import { AGE_RANGES, BODYWEIGHT_RANGES } from '@/common/backend-types'
import { determineRange, groupDataByExercise } from '@/common/standards-helpers'
const _ = require('lodash')

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const gender: string     = searchParams.get('gender') as string
    const age: string        = searchParams.get('age') as string
    const ageRange = determineRange(AGE_RANGES, age)
    const bodyWeight: string = searchParams.get('bodyWeight') as string
    const bodyWeightRange = determineRange(BODYWEIGHT_RANGES, bodyWeight)
    const exerciseNames      = searchParams.get('exerciseNames')

    const sql = `SELECT * FROM "Standard" WHERE "ageRange"='${ageRange}' AND "bodyWeight"='${bodyWeightRange}' AND gender='${_.upperCase(gender)}' AND exercise = ANY('{${exerciseNames}}');`
    const standards = await prisma.$queryRawUnsafe(sql)

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