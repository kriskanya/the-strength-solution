import { NextApiRequest } from 'next'
import { NextResponse } from 'next/server'
import { validateIdParam } from '@/common/validation/constants/common_validation.constants'
import { fetchMostRecentLoggedExercises } from '@/app/api/exercises/exercises-helpers'

export async function GET(req: NextApiRequest, { params }: { params: { id: number } }) {
  try {
    const { id } = params
    validateIdParam({ id })

    const res = await fetchMostRecentLoggedExercises(+id)

    return Response.json(res)
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