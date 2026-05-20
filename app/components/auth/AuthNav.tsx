'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useTransition } from 'react'
import backArrow from '../../icons/back-arrow.svg'

interface Props {
  path?: string
}

function BackNavSpinner() {
  return (
    <span
      className="block h-6 w-6 animate-spin rounded-full border-2 border-light-grey border-t-[#111111]"
      role="status"
      aria-label="Loading"
    />
  )
}

export default function AuthNav({ path }: Props) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  function navigate() {
    startTransition(() => {
      if (typeof window !== 'undefined' && window.history.length > 1) {
        router.back()
        return
      }
      path ? router.push(path) : router.push('create-account')
    })
  }

  return (
    <div className="grid grid-cols-3 p-5 border-b border-light-grey bg-off-white">
      <button
        type="button"
        onClick={navigate}
        disabled={isPending}
        aria-label="Go back"
        aria-busy={isPending}
        className="ml-6 flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-full transition-colors hover:bg-light-grey disabled:cursor-wait"
      >
        {isPending ? (
          <BackNavSpinner />
        ) : (
          <Image src={backArrow} alt="" width={24} height={24} aria-hidden />
        )}
      </button>
      <h2
        className="inter font-extrabold text-lg uppercase mx-auto cursor-pointer"
        onClick={() => router.push('/')}
      >
        The Strength Solution
      </h2>
    </div>
  )
}
