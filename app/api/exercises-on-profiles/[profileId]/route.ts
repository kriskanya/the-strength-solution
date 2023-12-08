import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'
import { validateIdParam } from '@/common/validation/constants/common_validation.constants'

/**
 * Get active ExercisesOnProfiles
 * @param req
 * @param { profileId }
 */
export async function GET(req: NextRequest, { params }: { params: { profileId: number } }) {
  try {
    const { profileId } = params
    validateIdParam({ id: profileId })

    const exercisesOnProfiles = await prisma.exercisesOnProfiles.findMany({
      where: { profileId: +profileId, active: true },
      include: {
        exercise: true
      }
    })

    return Response.json(exercisesOnProfiles)

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