'use client'
import { FormEvent, useState } from "react"
import Link from "next/link"

import OAuthButton from "@/app/ui/OAuthButton"
import Divider from "@/app/ui/Divider"
import CustomInput from "@/app/ui/CustomInput"
import CustomButton from "@/app/ui/CustomButton"
import classes from './CreateAccount.module.css'

export default function CreateAccount() {
  const [emailValue, setEmailValue] = useState('')
  const [passwordValue, setPasswordValue] = useState('')
  function handleSubmit(event: FormEvent) {
    event.preventDefault()

    console.log('submit', event)
    console.log('email', emailValue)
    console.log('pw', passwordValue)
  }

  return (
    <form onSubmit={handleSubmit} className={`flex flex-col items-center justify-center bg-off-white ${classes.container}`}>
      <div>
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
          <CustomInput fieldName="email" type="text" placeholder="Enter your email" inputValue={emailValue} changeHandler={setEmailValue} />
          <CustomInput fieldName="password" type="password" placeholder="Enter your password" inputValue={passwordValue} changeHandler={setPasswordValue} />
        </div>
        <CustomButton type="submit" label="Create Account" classes="bg-brand-blue h-12 mt-16" />
        <div className="flex justify-center mt-5">
          <p className="inter font-normal text-sm">
            Already have an account? <Link className="underline text-brand-blue font-bold" href="log-in">Log in</Link>
          </p>
        </div>
      </div>
    </form>
  )
}