import { getServerSession } from 'next-auth/next'
import { Profile, User } from '@prisma/client'

import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export class ApiHttpError extends Error {
  status: number

  constructor(message: string, status: number) {
    super(message)
    this.status = status
  }
}

export type AuthenticatedUser = User & { profile: Profile | null }

export async function requireAuthenticatedUser(): Promise<AuthenticatedUser> {
  const session = await getServerSession(authOptions)
  const email = session?.user?.email

  if (!email) {
    throw new ApiHttpError('Unauthorized', 401)
  }

  const user = await prisma.user.findUnique({
    where: { email },
    include: { profile: true },
  })

  if (!user) {
    throw new ApiHttpError('User not found', 404)
  }

  return user
}
