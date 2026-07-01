import { hash } from 'bcrypt'
import { NextResponse } from 'next/server'

import { validateRegisterPayload } from '@/app/api/register/register.validation'
import { REGISTER_ERROR } from '@/common/auth-messages'
import { prisma } from '@/lib/prisma'

export async function POST(req: Request) {
  try {
    const { email, password } = validateRegisterPayload(await req.json())
    const existing = await prisma.user.findUnique({ where: { email } })

    if (existing) {
      if (!existing.password) {
        return NextResponse.json(
          { error: REGISTER_ERROR.EMAIL_LINKED_TO_OAUTH, code: 'EMAIL_LINKED_TO_OAUTH' },
          { status: 409 }
        )
      }
      return NextResponse.json(
        { error: REGISTER_ERROR.EMAIL_ALREADY_EXISTS, code: 'EMAIL_ALREADY_EXISTS' },
        { status: 409 }
      )
    }

    const hashed = await hash(password, 12)
    const user = await prisma.user.create({
      data: { email, password: hashed },
    })

    return NextResponse.json({ user: { email: user.email } })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unable to create account.'
    return NextResponse.json({ error: message }, { status: 400 })
  }
}
