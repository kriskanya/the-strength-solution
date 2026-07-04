import { hash } from 'bcrypt'
import { NextResponse } from 'next/server'

import { validateResetPasswordPayload } from '@/app/api/auth/password-reset.validation'
import { RESET_PASSWORD_ERROR } from '@/common/auth-messages'
import {
  findValidPasswordResetUserId,
} from '@/lib/password-reset'
import { prisma } from '@/lib/prisma'

export const runtime = 'nodejs'

export async function POST(req: Request) {
  try {
    const { token, newPassword } = validateResetPasswordPayload(await req.json())
    const userId = await findValidPasswordResetUserId(token)

    if (!userId) {
      return NextResponse.json({ error: RESET_PASSWORD_ERROR.INVALID_OR_EXPIRED }, { status: 400 })
    }

    const hashed = await hash(newPassword, 12)

    await prisma.$transaction([
      prisma.user.update({
        where: { id: userId },
        data: { password: hashed },
      }),
      prisma.passwordResetToken.deleteMany({ where: { userId } }),
    ])

    return NextResponse.json({ ok: true })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : RESET_PASSWORD_ERROR.UNABLE_TO_RESET
    return NextResponse.json({ error: message }, { status: 400 })
  }
}
