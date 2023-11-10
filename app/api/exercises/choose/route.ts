import { NextRequest, NextResponse } from 'next/server'
import { FlattenedChosenExercise } from '@/common/shared-types'
import { prisma } from '@/lib/prisma'

export async function POST(req: NextRequest) {
  // check incoming req.json() data for validity, prob use Joi()
  try {
    const { profileId, exercises } = await req.json()

    return prisma.$transaction(async (tx) => {
      const promises = exercises.map((exercise: FlattenedChosenExercise) => {
        const active = exercise.active

        return prisma.exercisesOnProfiles.upsert({
          where: { profileId_exerciseId: { profileId, exerciseId: exercise.id } },
          update: {
            active
          },
          create: ({
            profileId,
            exerciseId: exercise.id,
            active
          })
        })
      })

      await Promise.all(promises)

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