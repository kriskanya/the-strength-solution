'use client'

import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import CustomButton from '@/app/ui/CustomButton'
import { useState } from 'react'

const sections = [
  {
    title: 'Conducting your assessment',
    description:
      'Learn how to perform each movement with consistent form so your results are comparable over time. Follow the same setup, range of motion, and effort level each session.',
  },
  {
    title: 'Recording your values',
    description:
      'Enter reps, time, or distance exactly as specified for each exercise. Use Update My Stats on the dashboard when you complete a test session.',
  },
  {
    title: 'Understanding your results',
    description:
      'Your scores are compared to strength standards for your profile. Charts show where you sit relative to typical performance—use them to track progress, not as medical advice.',
  },
] as const

export default function AssessmentGuide() {
  const router = useRouter()
  const { status, update } = useSession()
  const [pending, setPending] = useState(false)

  const finish = async () => {
    if (status !== 'authenticated') {
      router.push('/dashboard')
      return
    }

    setPending(true)
    try {
      const res = await fetch('/api/user/assessment-guide', { method: 'POST' })
      if (!res.ok) throw new Error('Failed to save progress')
      await update()
      router.push('/dashboard')
    } catch (e) {
      console.error('AssessmentGuide finish', e)
      setPending(false)
    }
  }

  return (
    <div className="relative min-h-[calc(100vh-73px)] overflow-hidden bg-off-white">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[min(42vh,28rem)] bg-gradient-to-b from-brand-blue/[0.12] via-light-blue/50 to-transparent"
        aria-hidden
      />
      <div className="pointer-events-none absolute -right-24 top-32 h-72 w-72 rounded-full bg-brand-blue/5 blur-3xl" aria-hidden />
      <div className="pointer-events-none absolute -left-16 top-48 h-56 w-56 rounded-full bg-light-blue/60 blur-3xl" aria-hidden />

      <div className="relative w-10/12 max-w-3xl mx-auto pt-10 pb-24 md:pt-16">
        <div className="mb-10 flex flex-col gap-3">
          <p className="inter text-xs font-semibold uppercase tracking-[0.2em] text-brand-blue">
            Assessment guide
          </p>
          <h1 className="inter text-2xl font-bold tracking-tight text-black-russian md:text-3xl">
            Welcome to{' '}
            <span className="text-brand-blue">The Strength Solution</span>
          </h1>
          <div className="h-1 w-16 rounded-full bg-gradient-to-r from-brand-blue to-light-blue" aria-hidden />
          <p className="inter max-w-2xl text-base font-normal leading-relaxed text-dark-grey">
            These walkthroughs explain how to run your assessment, log your results in the app, and
            understand what your numbers mean.
          </p>
        </div>

        <div
          className="mb-10 flex h-1.5 max-w-md overflow-hidden rounded-full shadow-sm ring-1 ring-black/5"
          aria-hidden
        >
          <div className="w-1/5 bg-red-novice" />
          <div className="w-1/5 bg-orange-intermediate" />
          <div className="w-1/5 bg-yellow-proficient" />
          <div className="w-1/5 bg-green-advanced" />
          <div className="w-1/5 bg-blue-elite" />
        </div>

        <div className="flex flex-col gap-8">
          {sections.map(({ title, description }, i) => (
            <section
              key={title}
              className="group overflow-hidden rounded-xl border border-brand-blue/15 bg-bright-white shadow-md shadow-brand-blue/[0.07] ring-1 ring-black/[0.04] transition hover:border-brand-blue/30 hover:shadow-lg hover:shadow-brand-blue/10"
            >
              <div className="relative border-b border-brand-blue/10 bg-gradient-to-r from-light-blue/40 to-bright-white px-5 pb-4 pt-5 md:px-6 md:pb-5 md:pt-6">
                <div
                  className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-brand-blue via-green-advanced to-orange-intermediate opacity-90"
                  aria-hidden
                />
                <div className="flex gap-4 pl-3 md:gap-5 md:pl-4">
                  <span className="inter flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-blue text-base font-bold text-white shadow-md ring-2 ring-brand-blue/35">
                    {i + 1}
                  </span>
                  <div className="min-w-0 flex-1">
                    <h2 className="inter text-lg font-semibold leading-snug text-black-russian">
                      {title}
                    </h2>
                    <p className="inter mt-2 text-sm leading-relaxed text-dark-grey">{description}</p>
                  </div>
                </div>
              </div>
              <div className="relative flex aspect-video items-center justify-center bg-gradient-to-br from-black-russian/[0.04] via-light-blue/25 to-brand-blue/[0.08] px-4">
                <div
                  className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-brand-blue/25 to-transparent"
                  aria-hidden
                />
                <p className="inter relative text-center text-sm font-medium text-dark-grey">
                  <span className="text-brand-blue">Video walkthrough</span>
                  {' — '}
                  embed player or link here when ready
                </p>
              </div>
            </section>
          ))}
        </div>

        <div className="mt-14 flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="w-full sm:w-auto sm:min-w-[200px]">
            <CustomButton
              type="button"
              label={pending ? 'Saving…' : 'Continue to dashboard'}
              classes={`bg-brand-blue h-10 shadow-md shadow-brand-blue/25 ring-1 ring-brand-blue/40 ${
                pending ? 'opacity-70 pointer-events-none' : ''
              }`}
              textClasses="font-semibold text-sm text-white"
              onClick={finish}
            />
          </div>
          <button
            type="button"
            className="inter text-sm font-semibold text-brand-blue underline-offset-4 transition hover:text-black-russian hover:underline disabled:opacity-50"
            disabled={pending}
            onClick={finish}
          >
            Skip for now
          </button>
        </div>
      </div>
    </div>
  )
}
