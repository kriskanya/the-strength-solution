import Image from 'next/image'
import google from '../icons/google.svg'
import facebook from '../icons/facebook.svg'
import { signIn } from 'next-auth/react'

interface Props {
  label: string,
  type: 'facebook' | 'google'
}

export default function OAuthButton({ label, type }: Props) {
  function handleClick() {
    signIn(type, { callbackUrl: '/dashboard/#' })
  }

  return (
    <div
      className="flex justify-center items-center border rounded px-2 py-2.5 cursor-pointer bg-white"
      onClick={handleClick}
    >
      {
        type === 'google'
          ? <Image src={google} alt="google" className="inline-block" />
          : <Image src={facebook} alt="facebook" className="inline-block" />
      }
      <span className="inter font-medium text-sm text-black ml-1">{label}</span>
    </div>
  )
}