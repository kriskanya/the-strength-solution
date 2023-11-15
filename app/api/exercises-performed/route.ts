import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import {
  createNewExercisesPerformed,
} from '@/app/api/exercises-performed/exercises-performed-helpers'
import { ExercisesPerformedPayload } from '@/app/api/exercises-performed/exercises-performed.constants'
import { validatePayload } from '@/app/api/exercises-performed/exercises-performed.validation'
import { validateIdParam } from '@/common/validation/constants/common_validation.constants'

export async function POST(req: NextRequest) {
  try {
    const { userId, payload }: { userId: number, payload: ExercisesPerformedPayload } = await req.json()

    validateIdParam({ id: userId })
    const a = validatePayload(payload)

    return prisma.$transaction(async (tx) => {
      const user: any = await tx.user.findUnique({
        where: { id: userId },
        include: {
          profile: true
        }
      })
      const res = await createNewExercisesPerformed({tx, payload, user})

      return Response.json(res)
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