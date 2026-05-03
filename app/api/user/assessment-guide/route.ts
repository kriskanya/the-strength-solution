import { getServerSession } from 'next-auth/next'
import { NextResponse } from 'next/server'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function POST() {
  try {
    const session = await getServerSession(authOptions)
    const email = session?.user?.email

    if (!email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    await prisma.user.update({
      where: { email },
      data: { hasSeenAssessmentGuide: true },
    })

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('assessment-guide POST', err)
    return NextResponse.json({ error: 'Failed to update' }, { status: 500 })
  }
}
