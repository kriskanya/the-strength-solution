import { NextRequest, NextResponse } from 'next/server'

import { rebuildExerciseCohortProficiencies } from '@/lib/cohort-proficiencies'
import { verifySchedulerOidcRequest } from '@/lib/oidc'

export const runtime = 'nodejs'

export async function POST(req: NextRequest) {
  const isAuthorized = await verifySchedulerOidcRequest(req)

  if (!isAuthorized) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const result = await rebuildExerciseCohortProficiencies()

    return Response.json(result)
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Internal server error'

    return NextResponse.json({ error: message }, { status: 500 })
  }
}
