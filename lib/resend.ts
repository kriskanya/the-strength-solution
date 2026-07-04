import { Resend } from 'resend'

let resendClient: Resend | null = null

function getResendClient(): Resend | null {
  const apiKey = process.env.RESEND_API_KEY

  if (!apiKey) {
    return null
  }

  if (!resendClient) {
    resendClient = new Resend(apiKey)
  }

  return resendClient
}

export async function sendPasswordResetEmail({
  to,
  resetUrl,
}: {
  to: string
  resetUrl: string
}): Promise<void> {
  const client = getResendClient()
  const from = process.env.RESEND_FROM_EMAIL

  if (!client || !from) {
    throw new Error('Resend is not configured')
  }

  const { error } = await client.emails.send({
    from,
    to,
    subject: 'Reset your password',
    html: `
      <p>You requested a password reset for The Strength Solution.</p>
      <p><a href="${resetUrl}">Reset your password</a></p>
      <p>This link expires in 1 hour. If you did not request this, you can ignore this email.</p>
    `,
  })

  if (error) {
    throw new Error(error.message)
  }
}
