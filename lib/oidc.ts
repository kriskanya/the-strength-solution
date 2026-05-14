import { createVerify } from 'crypto'
import { NextRequest } from 'next/server'

type GoogleCerts = Record<string, string>

type JwtHeader = {
  alg: string
  kid: string
  typ?: string
}

type JwtPayload = {
  aud?: string
  email?: string
  exp?: number
  iss?: string
}

function base64UrlDecode(input: string): string {
  const padded = input.replace(/-/g, '+').replace(/_/g, '/')
  const paddingLength = (4 - (padded.length % 4)) % 4

  return Buffer.from(`${padded}${'='.repeat(paddingLength)}`, 'base64').toString('utf8')
}

function parseJwt(token: string): { header: JwtHeader, payload: JwtPayload, signedContent: string, signature: string } {
  const [encodedHeader, encodedPayload, signature] = token.split('.')

  if (!encodedHeader || !encodedPayload || !signature) {
    throw new Error('Invalid OIDC token')
  }

  return {
    header: JSON.parse(base64UrlDecode(encodedHeader)),
    payload: JSON.parse(base64UrlDecode(encodedPayload)),
    signedContent: `${encodedHeader}.${encodedPayload}`,
    signature,
  }
}

async function fetchGoogleCerts(): Promise<GoogleCerts> {
  const res = await fetch('https://www.googleapis.com/oauth2/v1/certs')

  if (!res.ok) {
    throw new Error(`Unable to fetch Google OIDC certs: ${res.status}`)
  }

  return res.json()
}

function verifySignature({ cert, signedContent, signature }: { cert: string, signedContent: string, signature: string }) {
  const verifier = createVerify('RSA-SHA256')
  verifier.update(signedContent)
  verifier.end()

  return verifier.verify(cert, Buffer.from(signature.replace(/-/g, '+').replace(/_/g, '/'), 'base64'))
}

export async function verifySchedulerOidcRequest(req: NextRequest): Promise<boolean> {
  const expectedAudience = process.env.CRON_OIDC_AUDIENCE
  const expectedEmail = process.env.CRON_SERVICE_ACCOUNT_EMAIL
  const authorization = req.headers.get('authorization')

  if (!expectedAudience || !expectedEmail || !authorization?.startsWith('Bearer ')) {
    return false
  }

  try {
    const token = authorization.replace('Bearer ', '')
    const parsed = parseJwt(token)

    if (parsed.header.alg !== 'RS256') {
      return false
    }

    if (!['accounts.google.com', 'https://accounts.google.com'].includes(parsed.payload.iss || '')) {
      return false
    }

    if (parsed.payload.aud !== expectedAudience || parsed.payload.email !== expectedEmail) {
      return false
    }

    if (!parsed.payload.exp || parsed.payload.exp * 1000 <= Date.now()) {
      return false
    }

    const certs = await fetchGoogleCerts()
    const cert = certs[parsed.header.kid]

    if (!cert) {
      return false
    }

    return verifySignature({ cert, signedContent: parsed.signedContent, signature: parsed.signature })
  } catch (err) {
    console.error('verifySchedulerOidcRequest', err)
    return false
  }
}
