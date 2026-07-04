type Bucket = {
  count: number
  resetAt: number
}

const buckets = new Map<string, Bucket>()

export function isRateLimited(key: string, limit: number, windowMs: number): boolean {
  const now = Date.now()
  const bucket = buckets.get(key)

  if (!bucket || bucket.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs })
    return false
  }

  if (bucket.count >= limit) {
    return true
  }

  bucket.count += 1
  return false
}

export function getClientIp(req: Request): string {
  const forwarded = req.headers.get('x-forwarded-for')

  if (forwarded) {
    return forwarded.split(',')[0]?.trim() || 'unknown'
  }

  return req.headers.get('x-real-ip')?.trim() || 'unknown'
}
