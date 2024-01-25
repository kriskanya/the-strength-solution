'use client'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import backArrow from '../../icons/back-arrow.svg'

interface Props {
  path?: string
}

export default function AuthNav({ path }: Props ) {
  const router = useRouter()
  function navigate() {
    path ? router.push(path) : router.push('create-account')
  }

  return (
    <div className="grid grid-cols-3 p-5 border-b border-light-grey bg-off-white">
      <div onClick={navigate} className="ml-6 cursor-pointer">
        <Image src={backArrow} alt="back-arrow" />
      </div>
      <h2 className="inter font-extrabold text-lg uppercase mx-auto cursor-pointer" onClick={() => router.push('/')}>
        The Strength Solution
      </h2>
    </div>
  )
}