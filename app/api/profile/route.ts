import { NextRequest, NextResponse } from 'next/server'
import { upsertProfile } from '@/app/api/profile/profile-helpers'
import { prisma } from '@/lib/prisma'
import { validateCreateProfilePayload } from '@/app/api/profile/profile.validation'

export async function POST(req: NextRequest) {
  try {
    const { userId, gender, bodyWeight, age, height } = await req.json()
    validateCreateProfilePayload({ userId, gender, bodyWeight, age, height })

    return prisma.$transaction(async (tx) => {
      const upsertedProfile = await upsertProfile(tx, {
        userId, gender, bodyWeight, age, height
      })

      return Response.json(upsertedProfile)
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