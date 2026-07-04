import { createHash, randomBytes } from 'crypto'

import { prisma } from '@/lib/prisma'

const TOKEN_BYTES = 32
const TOKEN_TTL_MS = 60 * 60 * 1000

export function normalizeEmail(email: string): string {
  return email.trim().toLowerCase()
}

export function hashResetToken(token: string): string {
  return createHash('sha256').update(token).digest('hex')
}

function createResetToken(): string {
  return randomBytes(TOKEN_BYTES).toString('hex')
}

export async function issuePasswordResetToken(userId: string): Promise<string> {
  const rawToken = createResetToken()
  const tokenHash = hashResetToken(rawToken)
  const expiresAt = new Date(Date.now() + TOKEN_TTL_MS)

  await prisma.$transaction([
    prisma.passwordResetToken.deleteMany({ where: { userId } }),
    prisma.passwordResetToken.create({
      data: {
        userId,
        tokenHash,
        expiresAt,
      },
    }),
  ])

  return rawToken
}

export async function findValidPasswordResetUserId(rawToken: string): Promise<string | null> {
  const tokenHash = hashResetToken(rawToken)
  const record = await prisma.passwordResetToken.findUnique({
    where: { tokenHash },
    select: {
      id: true,
      userId: true,
      expiresAt: true,
    },
  })

  if (!record || record.expiresAt <= new Date()) {
    if (record) {
      await prisma.passwordResetToken.delete({ where: { id: record.id } })
    }
    return null
  }

  return record.userId
}

export async function clearPasswordResetTokensForUser(userId: string): Promise<void> {
  await prisma.passwordResetToken.deleteMany({ where: { userId } })
}

export function buildPasswordResetUrl(rawToken: string): string {
  const baseUrl = process.env.NEXTAUTH_URL?.replace(/\/$/, '')

  if (!baseUrl) {
    throw new Error('NEXTAUTH_URL is not configured')
  }

  return `${baseUrl}/reset-password?token=${encodeURIComponent(rawToken)}`
}
