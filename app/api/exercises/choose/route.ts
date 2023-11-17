import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { saveChosenExercises } from '@/app/api/exercises/exercises-helpers'

export async function POST(req: NextRequest) {
  // check incoming req.json() data for validity, prob use Joi()
  try {
    const { profileId, exercises } = await req.json()

    return prisma.$transaction(async (tx) => {
      await saveChosenExercises({tx, exercises, profileId})

      const exercisesOnProfiles = await prisma.exercisesOnProfiles.findMany({
        where: { profileId },
        include: {
          exercise: true
        }
      })

      const sortedData = exercisesOnProfiles.sort((a: any, b: any) => {
        return a.exercise.displayName.localeCompare(b.exercise.displayName)
      })

      return Response.json(sortedData)
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