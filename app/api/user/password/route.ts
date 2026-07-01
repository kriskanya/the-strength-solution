import { compare, hash } from 'bcrypt'
import { NextResponse } from 'next/server'

import { validateSetPasswordPayload, validateChangePasswordPayload } from '@/app/api/user/user.validation'
import { ApiHttpError, requireAuthenticatedUser } from '@/lib/api-auth'
import { prisma } from '@/lib/prisma'

export async function PATCH(req: Request) {
  try {
    const user = await requireAuthenticatedUser()
    const body = await req.json()

    if (!user.password) {
      const { newPassword } = validateSetPasswordPayload(body)
      const hashed = await hash(newPassword, 12)
      await prisma.user.update({
        where: { id: user.id },
        data: { password: hashed },
      })
      return NextResponse.json({ ok: true })
    }

    const { currentPassword, newPassword } = validateChangePasswordPayload(body)
    const isCurrentValid = await compare(currentPassword, user.password)
    if (!isCurrentValid) {
      throw new ApiHttpError('Current password is incorrect.', 400)
    }

    const hashed = await hash(newPassword, 12)
    await prisma.user.update({
      where: { id: user.id },
      data: { password: hashed },
    })
    return NextResponse.json({ ok: true })
  } catch (err: unknown) {
    if (err instanceof ApiHttpError) {
      return NextResponse.json({ error: err.message }, { status: err.status })
    }
    const message = err instanceof Error ? err.message : 'Unable to update password.'
    return NextResponse.json({ error: message }, { status: 400 })
  }
}
