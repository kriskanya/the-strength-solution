'use client'

import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { FormEvent, useState } from 'react'

import classes from '@/app/components/auth/LogIn.module.css'
import { RESET_PASSWORD_ERROR } from '@/common/auth-messages'
import { Alert } from '@/app/ui/Alert'
import CustomButton from '@/app/ui/CustomButton'
import CustomInput from '@/app/ui/CustomInput'

export default function ResetPassword() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get('token') ?? ''

  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const passwordsMatch =
    newPassword.length > 0 &&
    confirmPassword.length > 0 &&
    newPassword === confirmPassword

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    setError(null)

    if (!token) {
      setError(RESET_PASSWORD_ERROR.INVALID_OR_EXPIRED)
      return
    }

    setIsSubmitting(true)

    try {
      const res = await fetch('/api/auth/reset-password', {
        method: 'POST',
        body: JSON.stringify({ token, newPassword, confirmPassword }),
        headers: { 'Content-Type': 'application/json' },
      })
      const data = await res.json()

      if (!res.ok) {
        setError(data.error ?? RESET_PASSWORD_ERROR.UNABLE_TO_RESET)
        return
      }

      router.push('/log-in')
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : RESET_PASSWORD_ERROR.UNABLE_TO_RESET)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className={`flex flex-col items-center justify-center bg-off-white ${classes.container}`}>
      <div className="sm:w-[26.5em] w-full">
        <h2 className="inter font-bold text-2xl">Reset your password</h2>
        <p className="inter text-sm text-gray-600 mt-3">
          Choose a new password for your account.
        </p>
        <div className="mt-6 flex flex-col gap-4">
          <CustomInput
            fieldName="newPassword"
            required={true}
            type="password"
            placeholder="Enter your new password"
            inputValue={newPassword}
            changeHandler={setNewPassword}
          />
          <CustomInput
            fieldName="confirmPassword"
            required={true}
            type="password"
            placeholder="Confirm your new password"
            inputValue={confirmPassword}
            changeHandler={setConfirmPassword}
            passwordMatches={passwordsMatch}
          />
        </div>
        <div className="mt-6">
          {error && <Alert>{error}</Alert>}
        </div>
        <CustomButton
          type="submit"
          label={isSubmitting ? 'Saving...' : 'Reset password'}
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
