import { NextResponse } from 'next/server'

import { AGE_RANGES } from '@/common/backend-types-and-constants'
import { determineRange } from '@/common/standards-helpers'
import { ApiHttpError, requireAuthenticatedUser } from '@/lib/api-auth'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const user = await requireAuthenticatedUser()

    if (!user.profileId || !user.profile) {
      throw new ApiHttpError('Profile required', 400)
    }

    const ageRange = determineRange(Object.keys(AGE_RANGES), `${user.profile.age}`)

    if (!ageRange) {
      throw new ApiHttpError('Age range required', 400)
    }

    const activeExercises = await prisma.exercisesOnProfiles.findMany({
      where: {
        active: true,
        profileId: user.profileId,
      },
      select: {
        exerciseId: true,
      },
    })
    const exerciseIds = activeExercises.map(({ exerciseId }) => exerciseId)

    if (exerciseIds.length === 0) {
      return Response.json([])
    }

    const cohortProficiencies = await prisma.exerciseCohortProficiency.findMany({
      where: {
        ageRange: AGE_RANGES[ageRange],
        exerciseId: { in: exerciseIds },
        gender: user.profile.gender,
      },
    })

    return Response.json(cohortProficiencies)
  } catch (err: unknown) {
    if (err instanceof ApiHttpError) {
      return NextResponse.json({ error: err.message }, { status: err.status })
    }

    const message = err instanceof Error ? err.message : 'Internal server error'

    return NextResponse.json({ error: message }, { status: 500 })
  }
}
