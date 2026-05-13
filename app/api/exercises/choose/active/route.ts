import { NextRequest, NextResponse } from 'next/server'
import { saveActiveExerciseChanges } from '@/app/api/exercises/exercises-helpers'
import { validateSaveExerciseActiveChangesPayload } from '@/app/api/exercises/choose/choose-active.validation'
import { ApiHttpError, requireAuthenticatedUser } from '@/lib/api-auth'
import { prisma } from '@/lib/prisma'

export async function POST(req: NextRequest) {
  try {
    const user = await requireAuthenticatedUser()

    if (!user.profileId) {
      throw new ApiHttpError('Profile required', 400)
    }

    const payload = await req.json()
    validateSaveExerciseActiveChangesPayload(payload)

    await prisma.$transaction(async (tx) => {
      await saveActiveExerciseChanges({
        tx,
        profileId: user.profileId as number,
        changes: payload.changes,
      })
    })

    return Response.json({ changes: payload.changes })
  } catch (err: unknown) {
    if (err instanceof ApiHttpError) {
      return NextResponse.json({ error: err.message }, { status: err.status })
    }

    const message = err instanceof Error ? err.message : 'Internal server error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
