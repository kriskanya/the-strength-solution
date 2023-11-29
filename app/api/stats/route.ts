import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { fetchMostRecentLoggedExercises, saveChosenExercises } from '@/app/api/exercises/exercises-helpers'
import { createNewExercisesPerformed } from '@/app/api/exercises-performed/exercises-performed-helpers'
import { upsertProfile } from '@/app/api/profile/profile-helpers'
import { validateStatsPayload } from '@/app/api/stats/stats.validation'
import { SaveStats } from '@/app/api/stats/stats-helpers'

export async function POST(req: NextRequest) {
  try {
    const { gender, bodyWeight, age, exercises, userId, source }: SaveStats = await req.json()
    validateStatsPayload({ gender, bodyWeight, age, exercises, userId, source })
    let upsertedProfile, exercisesPerformed, nonStandardExercisesPerformed

    const user: any = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        profile: true
      }
    })

    await prisma.$transaction(async (tx) => {
      upsertedProfile = await upsertProfile(tx, {
        userId, gender, bodyWeight, age
      })
      await saveChosenExercises({tx, exercises, profileId: user.profileId})
      exercisesPerformed = await createNewExercisesPerformed({tx, exercises, user, source})
    })

    const mostRecentLoggedExercises = await fetchMostRecentLoggedExercises(user?.profileId)

    return Response.json({ profile: upsertedProfile, mostRecentLoggedExercises, exercisesPerformed })
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