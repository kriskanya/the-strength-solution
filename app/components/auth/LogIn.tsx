'use client'
import { FormEvent, useState } from "react"
import { useSession } from "next-auth/react";

import OAuthButton from "@/app/ui/OAuthButton"
import Divider from "@/app/ui/Divider"
import CustomInput from "@/app/ui/CustomInput"
import CustomButton from "@/app/ui/CustomButton"
import classes from './LogIn.module.css'
import { Alert } from '@/app/ui/Alert'
import { signIn } from 'next-auth/react'
import { redirect, useRouter, useSearchParams } from 'next/navigation'
import { get, isEmpty, isPlainObject } from 'lodash-es'

export default function LogIn() {
  const router = useRouter()
  const session = useSession()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') || '/dashboard'
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)

  // if (isPlainObject(session) && !isEmpty(get(session, 'data.user'))) {
  //   redirect('/dashboard')
  // }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    try {
      const res = await signIn('credentials', {
        redirect: false,
        email,
        password,
        callbackUrl
      })
      if (!res?.error) {
        router.push(callbackUrl)
      } else {
        setError('Invalid email or password')
      }
    } catch (err: any) {}
  }

  return (
    <form onSubmit={handleSubmit} className={`flex flex-col items-center justify-center bg-off-white ${classes.container}`}>
      <div className="sm:w-[26.5em] w-full">
        <h2 className="inter font-bold text-2xl">Log In to Your Account</h2>
        <div className="flex gap-4 mt-5">
          <div style={{width: '204px'}}>
            <OAuthButton label="Log In With Google" type="google" />
          </div>
          <div style={{width: '204px'}}>
            <OAuthButton label="Log In With Facebook" type="facebook" />
          </div>
        </div>
        <div className="flex justify-center mt-6">
          <Divider />
          <span className="mx-5">or</span>
          <Divider />
        </div>
        <div className="mt-4 flex flex-col gap-4">
          <CustomInput fieldName="email" required={true} type="text" placeholder="Enter your email" inputValue={email} changeHandler={setEmail} />
          <CustomInput fieldName="password" required={true} type="password" placeholder="Enter your password" inputValue={password} changeHandler={setPassword} showForgotPassword={true} />
        </div>
        <div className="mt-6">
          {error && <Alert>{error}</Alert>}
        </div>
        <CustomButton type="submit" label="Log In" classes="bg-brand-blue h-12 mt-16" textClasses="text-white" />
      </div>
    </form>
  )
}