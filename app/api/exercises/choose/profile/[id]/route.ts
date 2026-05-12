import { NextRequest, NextResponse } from 'next/server'
import { validateIdParam } from '@/common/validation/constants/common_validation.constants'
import {
  fetchMostRecentLoggedExercises,
  profileHasChosenWorkouts,
} from '@/app/api/exercises/exercises-helpers'

export async function GET(req: NextRequest, { params }: { params: { id: number } }) {
  try {
    const { id } = params
    validateIdParam({ id })
    const profileId = +id

    if (req.nextUrl.searchParams.get('minimal') === 'true') {
      const hasWorkouts = await profileHasChosenWorkouts(profileId)
      return Response.json({ hasWorkouts })
    }

    const res = await fetchMostRecentLoggedExercises(profileId)

    return Response.json(res)
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