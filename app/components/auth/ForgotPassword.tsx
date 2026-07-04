'use client'

import Link from 'next/link'
import { FormEvent, useState } from 'react'

import classes from '@/app/components/auth/LogIn.module.css'
import { FORGOT_PASSWORD_MESSAGE } from '@/common/auth-messages'
import { Alert } from '@/app/ui/Alert'
import CustomButton from '@/app/ui/CustomButton'
import CustomInput from '@/app/ui/CustomInput'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    setMessage(null)
    setError(null)
    setIsSubmitting(true)

    try {
      const res = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        body: JSON.stringify({ email }),
        headers: { 'Content-Type': 'application/json' },
      })
      const data = await res.json()

      if (!res.ok) {
        setError(data.error ?? 'Unable to process request.')
        return
      }

      setMessage(data.message ?? FORGOT_PASSWORD_MESSAGE.SUCCESS)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Unable to process request.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className={`flex flex-col items-center justify-center bg-off-white ${classes.container}`}>
      <div className="sm:w-[26.5em] w-full">
        <h2 className="inter font-bold text-2xl">Forgot your password?</h2>
        <p className="inter text-sm text-gray-600 mt-3">
          Enter your email and we&apos;ll send you a reset link if an account exists.
        </p>
        <div className="mt-6 flex flex-col gap-4">
          <CustomInput
            fieldName="email"
            required={true}
            type="text"
            placeholder="Enter your email"
            inputValue={email}
            changeHandler={setEmail}
          />
        </div>
        <div className="mt-6">
          {message && (
            <div
              className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3"
              role="status"
              aria-live="polite"
            >
              <p className="inter font-semibold text-sm text-emerald-950">
                {FORGOT_PASSWORD_MESSAGE.SUCCESS_TITLE}
              </p>
              <p className="inter mt-1.5 text-sm leading-relaxed text-emerald-900">
                If an account exists for{' '}
                {email ? (
                  <span className="font-medium text-emerald-950">{email}</span>
                ) : (
                  'that address'
                )}
                , we sent a password reset link.
              </p>
              <p className="inter mt-2 text-xs leading-relaxed text-emerald-800/90">
                {FORGOT_PASSWORD_MESSAGE.SUCCESS_HINT}
              </p>
            </div>
          )}
          {error && <Alert>{error}</Alert>}
        </div>
        <CustomButton
          type="submit"
          label={isSubmitting ? 'Sending...' : 'Send reset link'}
          classes="bg-brand-blue h-12 mt-10"
          textClasses="text-white"
        />
        <p className="inter text-sm text-center mt-6">
          <Link href="/log-in" className="text-brand-blue font-medium">Back to log in</Link>
        </p>
      </div>
    </form>
  )
}
