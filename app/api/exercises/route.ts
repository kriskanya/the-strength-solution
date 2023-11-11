import { type NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { Exercise } from '@prisma/client'

export async function GET(request: NextRequest) {
  try {
    const exercises = await prisma.exercise.findMany({})

    const sortedData = exercises.sort((a: Exercise, b: Exercise) => {
      return a.displayName.localeCompare(b.displayName)
    })

    return Response.json(sortedData)
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