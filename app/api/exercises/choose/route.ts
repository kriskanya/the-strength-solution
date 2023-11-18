import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { saveChosenExercises } from '@/app/api/exercises/exercises-helpers'
import { validateChooseExercisesPayload } from '@/app/api/exercises/exercises.validation'
import { Exercise, ExercisesOnProfiles } from '@prisma/client'

// todo: consider moving this also under profile/[id], since we
// do have the profileId here
export async function POST(req: NextRequest) {
  try {
    const { profileId, exercises } = await req.json()
    validateChooseExercisesPayload({ profileId, exercises })

    await prisma.$transaction(async (tx) => {
      await saveChosenExercises({tx, exercises, profileId})
    })

    const exercisesOnProfiles = await prisma.exercisesOnProfiles.findMany({
      where: { profileId },
      include: {
        exercise: true
      }
    })

    const sortedData = exercisesOnProfiles.sort((a: ExercisesOnProfiles & {exercise: Exercise}, b: ExercisesOnProfiles & {exercise: Exercise}) => {
      return a.exercise.displayName.localeCompare(b.exercise.displayName)
    })

    return Response.json(sortedData)
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