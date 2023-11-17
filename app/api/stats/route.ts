import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { saveChosenExercises } from '@/app/api/exercises/exercises-helpers'
import { createNewExercisesPerformed } from '@/app/api/exercises-performed/exercises-performed-helpers'
import { upsertProfile } from '@/app/api/profile/profile-helpers'
import { validateStatsPayload } from '@/app/api/stats/stats.validation'
import { SaveStats } from '@/app/api/stats/stats-helpers'
import { Exercise } from '@prisma/client'

export async function POST(req: NextRequest) {
  try {
    const { gender, bodyWeight, age, exercises, userId }: SaveStats = await req.json()
    validateStatsPayload({ gender, bodyWeight, age, exercises, userId })

    return prisma.$transaction(async (tx) => {
      const user: any = await tx.user.findUnique({
        where: { id: userId },
        include: {
          profile: true
        }
      })
      const upsertedProfile = await upsertProfile(tx, {
        userId, gender, bodyWeight, age
      })
      const chosenExercises = await saveChosenExercises({tx, exercises, profileId: user.profileId})
      const exercisesPerformed = await createNewExercisesPerformed({tx, exercises, user})

      return Response.json({ profile: upsertedProfile, chosenExercises, exercisesPerformed })
    })
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