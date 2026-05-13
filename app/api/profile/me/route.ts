import { NextRequest, NextResponse } from 'next/server'
import { upsertProfile } from '@/app/api/profile/profile-helpers'
import { validateUpdateProfilePayload } from '@/app/api/profile/profile-me.validation'
import { ApiHttpError, requireAuthenticatedUser } from '@/lib/api-auth'
import { prisma } from '@/lib/prisma'

export async function POST(req: NextRequest) {
  try {
    const user = await requireAuthenticatedUser()

    if (!user.profileId) {
      throw new ApiHttpError('Profile required', 400)
    }

    const payload = await req.json()
    validateUpdateProfilePayload(payload)

    const profile = await prisma.$transaction((tx) =>
      upsertProfile(tx, {
        userId: user.id,
        ...payload,
      })
    )

    return Response.json({ profile })
  } catch (err: unknown) {
    if (err instanceof ApiHttpError) {
      return NextResponse.json({ error: err.message }, { status: err.status })
    }

    const message = err instanceof Error ? err.message : 'Internal server error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
