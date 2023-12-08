import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { updateUser } from '@/app/api/user/user-helpers'
import { validateUpdateUserPayload } from '@/app/api/user/user.validation'
import { writeFile } from 'fs/promises'


export async function POST(req: NextRequest) {
  try {
    const data = await req.formData()
    const file: File | null = data.get('file') as unknown as File

    if (!file) {
      return NextResponse.json({ success: false })
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // write file to vercel or s3
    // set file url to user's imageUrl

    // With the file data in the buffer, you can do whatever you want with it.
    // For this, we'll just write it to the filesystem in a new location
    // const path = `/tmp/${file.name}`
    // await writeFile(path, buffer)
    // console.log(`open ${path} to see the uploaded file`)

    return NextResponse.json({ success: true })

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