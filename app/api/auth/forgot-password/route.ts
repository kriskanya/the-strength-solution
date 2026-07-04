import { NextResponse } from 'next/server'

import { validateForgotPasswordPayload } from '@/app/api/auth/password-reset.validation'
import { FORGOT_PASSWORD_MESSAGE } from '@/common/auth-messages'
import {
  buildPasswordResetUrl,
  issuePasswordResetToken,
  normalizeEmail,
} from '@/lib/password-reset'
import { getClientIp, isRateLimited } from '@/lib/rate-limit'
import { prisma } from '@/lib/prisma'
import { sendPasswordResetEmail } from '@/lib/resend'

export const runtime = 'nodejs'

const IP_LIMIT = 5
const IP_WINDOW_MS = 15 * 60 * 1000
const EMAIL_LIMIT = 3
const EMAIL_WINDOW_MS = 60 * 60 * 1000

export async function POST(req: Request) {
  try {
    const { email } = validateForgotPasswordPayload(await req.json())
    const normalizedEmail = normalizeEmail(email)
    const ip = getClientIp(req)
    const ipLimited = isRateLimited(`forgot-password:ip:${ip}`, IP_LIMIT, IP_WINDOW_MS)
    const emailLimited = isRateLimited(`forgot-password:email:${normalizedEmail}`, EMAIL_LIMIT, EMAIL_WINDOW_MS)

    if (!ipLimited && !emailLimited) {
      const user = await prisma.user.findFirst({
        where: { email: { equals: normalizedEmail, mode: 'insensitive' } },
        select: {
          id: true,
          email: true,
          password: true,
        },
      })

      if (user?.password) {
        try {
          const rawToken = await issuePasswordResetToken(user.id)
          const resetUrl = buildPasswordResetUrl(rawToken)
          await sendPasswordResetEmail({ to: user.email, resetUrl })
        } catch (err) {
          console.error('forgot-password send failed', err)
        }
      }
    }

    return NextResponse.json({ message: FORGOT_PASSWORD_MESSAGE.SUCCESS })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unable to process request.'
    return NextResponse.json({ error: message }, { status: 400 })
  }
}
