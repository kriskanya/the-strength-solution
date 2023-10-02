import Image from 'next/image'
import google from '../icons/google.svg'
import facebook from '../icons/facebook.svg'

interface Props {
  label: string,
  type: 'facebook' | 'google'
}

export default function OAuthButton(props: Props) {
  return (
    <div className="border bg-[#FFFFFF] rounded px-2 py-2.5">
      {
        props.type === 'google'
          ? <Image src={google} alt="google" className="inline-block" />
          : <Image src={facebook} alt="facebook" className="inline-block" />
      }
      <span className="inter font-medium text-sm text-black ml-1">{props.label}</span>
    </div>
  )
}