import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { saveChosenExercises } from '@/app/api/exercises/exercises-helpers'
import { upsertNewExercisesPerformed } from '@/app/api/exercises-performed/exercises-performed-helpers'
import { upsertProfile } from '@/app/api/profile/profile-helpers'
import { validateStatsPayload } from '@/app/api/stats/stats.validation'
import { SaveStats } from '@/app/api/stats/stats-helpers'
import { UserWithProfile } from '@/common/backend-types-and-constants'
import { ApiHttpError, requireAuthenticatedUser } from '@/lib/api-auth'
import _ from 'lodash'

export async function POST(req: NextRequest) {
  try {
    const user = await requireAuthenticatedUser()

    if (!user.profileId) {
      throw new ApiHttpError('Profile required', 400)
    }

    const profileId = user.profileId

    const { gender, bodyWeight, age, exercises, source, height }: SaveStats = await req.json()
    validateStatsPayload({ gender, bodyWeight, age, exercises, source, height })

    let upsertedProfile, updatedExercises

    const userWithProfile = user as UserWithProfile

    await prisma.$transaction(async (tx) => {
      upsertedProfile = await upsertProfile(tx, {
        userId: user.id,
        gender,
        bodyWeight,
        age,
        height,
      })
      await saveChosenExercises({ tx, exercises, profileId })
      const updatedUser: UserWithProfile = _.set(userWithProfile, 'profile', upsertedProfile)
      updatedExercises = await upsertNewExercisesPerformed({ tx, exercises, user: updatedUser, source })
    })

    return Response.json({ profile: upsertedProfile, updatedExercises })
  } catch (err: unknown) {
    if (err instanceof ApiHttpError) {
      return NextResponse.json({ error: err.message }, { status: err.status })
    }

    const message = err instanceof Error ? err.message : 'Internal server error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
