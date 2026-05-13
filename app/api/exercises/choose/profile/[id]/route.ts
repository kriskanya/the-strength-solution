import { NextRequest, NextResponse } from 'next/server'
import { validateIdParam } from '@/common/validation/constants/common_validation.constants'
import {
  fetchMostRecentLoggedExercises,
  profileHasChosenWorkouts,
} from '@/app/api/exercises/exercises-helpers'
import { ApiHttpError, requireAuthenticatedUser } from '@/lib/api-auth'

export async function GET(req: NextRequest, { params }: { params: { id: number } }) {
  try {
    const { id } = params
    validateIdParam({ id })
    const profileId = +id

    if (req.nextUrl.searchParams.get('minimal') === 'true') {
      const hasWorkouts = await profileHasChosenWorkouts(profileId)
      return Response.json({ hasWorkouts })
    }

    const user = await requireAuthenticatedUser()

    if (!user.profileId || user.profileId !== profileId) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const res = await fetchMostRecentLoggedExercises(profileId, user.id)

    return Response.json(res)
  } catch (err: unknown) {
    if (err instanceof ApiHttpError) {
      return NextResponse.json({ error: err.message }, { status: err.status })
    }

    const message = err instanceof Error ? err.message : 'Internal server error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
