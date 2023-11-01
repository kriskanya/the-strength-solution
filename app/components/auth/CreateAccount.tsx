'use client'
import { FormEvent, useState } from "react"
import Link from "next/link"
import { useRouter } from 'next/navigation'

import OAuthButton from "@/app/ui/OAuthButton"
import Divider from "@/app/ui/Divider"
import CustomInput from "@/app/ui/CustomInput"
import CustomButton from "@/app/ui/CustomButton"
import classes from './CreateAccount.module.css'
import { Alert } from '@/app/ui/Alert'
import { signIn } from 'next-auth/react'

export default function CreateAccount() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        body: JSON.stringify({
          email,
          password
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      if (res.ok) {
        signIn()
      } else {
        setError((await res.json()).error)
      }
    } catch (e: any) {
      setError(e?.message)
      console.error(e)
    }
  }

  return (
    <form onSubmit={handleSubmit} className={`flex flex-col items-center justify-center bg-off-white ${classes.container}`}>
      <div className="sm:w-[26.5em] w-full">
        <h2 className="inter font-bold text-2xl">Create an Account</h2>
        <div className="flex gap-4 mt-5">
          <div style={{width: '204px'}}>
            <OAuthButton label="Sign Up With Google" type="google" />
          </div>
          <div style={{width: '204px'}}>
            <OAuthButton label="Sign Up With Facebook" type="facebook" />
          </div>
        </div>
        <div className="flex justify-center mt-6">
          <Divider />
          <span className="mx-5">or</span>
          <Divider />
        </div>
        <div className="mt-4 flex flex-col gap-4">
          <CustomInput fieldName="email" required={true} type="text" placeholder="Enter your email" inputValue={email} changeHandler={setEmail} />
          <CustomInput fieldName="password" required={true} type="password" placeholder="Enter your password" inputValue={password} changeHandler={setPassword} />
        </div>
        <div className="mt-6">
          {error && <Alert>{error}</Alert>}
        </div>
        <CustomButton type="submit" label="Create Account" classes="bg-brand-blue h-12 mt-16" textClasses="text-white" />
        <div className="flex justify-center mt-5">
          <p className="inter font-normal text-sm">
            Already have an account? <Link className="underline text-brand-blue font-bold" href="log-in">Log in</Link>
          </p>
        </div>
      </div>
    </form>
  )
}