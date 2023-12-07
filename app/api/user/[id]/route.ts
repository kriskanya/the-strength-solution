import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { updateUser } from '@/app/api/user/user-helpers'
import { validateUpdateUserPayload } from '@/app/api/user/user.validation'

export async function PUT(req: NextRequest, { params }: { params: { id: number }}) {
  try {
    const { email, firstName, lastName } = await req.json()
    const { id } = params
    validateUpdateUserPayload({ id, email, firstName, lastName })

    return prisma.$transaction(async (tx) => {
      const updatedUser = await updateUser(tx, {
        id: +id, email, firstName, lastName
      })

      return Response.json(updatedUser)
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