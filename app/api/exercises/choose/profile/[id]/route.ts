import { NextApiRequest } from 'next'
import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET(req: NextApiRequest, { params }: { params: { profileId: number } }) {
  try {
    const { profileId } = params
    const exercisesOnProfiles = await prisma.exercisesOnProfiles.findMany({
      where: { profileId },
      include: {
        exercise: true
      }
    })

    const sortedData = exercisesOnProfiles.sort((a: any, b: any) => {
      return a.exercise.displayName.localeCompare(b.exercise.displayName);
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