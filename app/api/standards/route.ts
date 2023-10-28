import { prisma } from '@/lib/prisma'
import { type NextRequest, NextResponse } from 'next/server'
import { AGE_RANGES, BODYWEIGHT_RANGES } from '@/common/backend-types'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const gender: string     = searchParams.get('gender') as string
    const age: string        = searchParams.get('age') as string
    const ageRange = Object.keys(AGE_RANGES).find(r => r.includes(age))
    const bodyWeight: string = searchParams.get('bodyWeight') as string
    const bodyWeightRange: string  = Object.keys(BODYWEIGHT_RANGES).find(r => r.includes(bodyWeight)) as string

    const sql = `SELECT * FROM "Standard" WHERE "ageRange"='${ageRange}' AND weight='${bodyWeightRange}' AND gender='${gender}';`
    const standards = await prisma.$queryRawUnsafe(sql)

    return Response.json(standards)
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