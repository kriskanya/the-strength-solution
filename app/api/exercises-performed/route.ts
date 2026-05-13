import { NextRequest, NextResponse } from 'next/server'
import { upsertPerformedExerciseChanges } from '@/app/api/exercises-performed/exercises-performed-helpers'
import { validateSaveExercisePerformedChangesPayload } from '@/app/api/exercises-performed/exercises-performed.validation'
import { UserWithProfile } from '@/common/backend-types-and-constants'
import { ApiHttpError, requireAuthenticatedUser } from '@/lib/api-auth'
import { prisma } from '@/lib/prisma'

export async function POST(req: NextRequest) {
  try {
    const user = await requireAuthenticatedUser()

    if (!user.profileId) {
      throw new ApiHttpError('Profile required', 400)
    }

    const payload = await req.json()
    validateSaveExercisePerformedChangesPayload(payload)

    const userWithProfile = await prisma.user.findUnique({
      where: { id: user.id },
      include: { profile: true },
    })

    if (!userWithProfile?.profile) {
      throw new ApiHttpError('Profile required', 400)
    }

    const updatedExercises = await prisma.$transaction((tx) =>
      upsertPerformedExerciseChanges({
        tx,
        profileId: user.profileId as number,
        user: userWithProfile as UserWithProfile,
        source: payload.source,
        changes: payload.changes,
      })
    )

    return Response.json({ updatedExercises })
  } catch (err: unknown) {
    if (err instanceof ApiHttpError) {
      return NextResponse.json({ error: err.message }, { status: err.status })
    }

    const message = err instanceof Error ? err.message : 'Internal server error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
