import { NextRequest, NextResponse } from 'next/server'
import { upsertProfile } from '@/app/api/profile/profile-helpers'
import { NextApiRequest } from 'next'

export async function POST(req: NextRequest) {
  try {
    // const { userId, gender, bodyWeight, age } = await req.json()

    // check incoming req.json() data for validity, prob use Joi()

    // const upsertedProfile = await upsertProfile({
    //   userId, gender, bodyWeight, age
    // })

    // return Response.json(upsertedProfile)

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