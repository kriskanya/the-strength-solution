import { NextResponse } from 'next/server'
import Joi from 'joi'

import { SIGN_IN_ERROR } from '@/common/auth-messages'
import { EMAIL, validate } from '@/common/validation/constants/common_validation.constants'
import { prisma } from '@/lib/prisma'

export async function POST(req: Request) {
  try {
    const { email } = validate(
      await req.json(),
      Joi.object({ email: EMAIL }),
      { abortEarly: true, presence: 'required', convert: true }
    )

    const user = await prisma.user.findUnique({ where: { email } })

    if (!user || !user.password) {
      const hasOAuth = Boolean(user?.google || user?.facebook)
      if (user && hasOAuth) {
        return NextResponse.json({ message: SIGN_IN_ERROR.OAUTH_ONLY })
      }
    }

    return NextResponse.json({ message: SIGN_IN_ERROR.INVALID_CREDENTIALS })
  } catch {
    return NextResponse.json({ message: SIGN_IN_ERROR.INVALID_CREDENTIALS })
  }
}
