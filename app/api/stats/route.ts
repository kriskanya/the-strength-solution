import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { fetchMostRecentLoggedExercises, saveChosenExercises } from '@/app/api/exercises/exercises-helpers'
import { upsertNewExercisesPerformed } from '@/app/api/exercises-performed/exercises-performed-helpers'
import { upsertProfile } from '@/app/api/profile/profile-helpers'
import { validateStatsPayload } from '@/app/api/stats/stats.validation'
import { SaveStats } from '@/app/api/stats/stats-helpers'
import { UserWithProfile } from '@/common/backend-types-and-constants'
import _ from 'lodash'

export async function POST(req: NextRequest) {
  try {
    const { gender, bodyWeight, age, exercises, userId, source, height }: SaveStats = await req.json()
    validateStatsPayload({ gender, bodyWeight, age, exercises, userId, source, height })
    let upsertedProfile, exercisesPerformed

    const user: UserWithProfile = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        profile: true
      }
    }) as UserWithProfile

    if (!user) {
      console.log(`Error in POST /stats: user record not found`)
    }

    await prisma.$transaction(async (tx) => {
      upsertedProfile = await upsertProfile(tx, {
        userId, gender, bodyWeight, age, height
      })
      await saveChosenExercises({tx, exercises, profileId: user.profileId as number})
      // need to update the age, weight, and gender to ensure correct standards are associated with exercisesPerformed
      const updatedUser: UserWithProfile  = _.set(user, 'profile', upsertedProfile)
      exercisesPerformed = await upsertNewExercisesPerformed({tx, exercises, user: updatedUser, source})
    })

    const activeExercises = await fetchMostRecentLoggedExercises(user.profileId as number)

    return Response.json({ profile: upsertedProfile, activeExercises, exercisesPerformed })
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