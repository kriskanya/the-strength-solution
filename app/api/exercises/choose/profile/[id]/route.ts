import { NextApiRequest } from 'next'
import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'
import { validateIdParam } from '@/common/validation/constants/common_validation.constants'

export async function GET(req: NextApiRequest, { params }: { params: { id: number } }) {
  try {
    const { id } = params
    const validatedParam = validateIdParam({ id })
    const exercisesOnProfiles = await prisma.exercisesOnProfiles.findMany({
      where: { profileId: validatedParam.id },
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