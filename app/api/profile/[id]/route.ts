import { NextApiRequest } from 'next'
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(req: NextApiRequest, { params }: { params: { id: number } }) {
  try {
    const { id } = params
    const profile = await prisma.profile.findUnique({ where: { id } })

    return Response.json(profile)

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