'use client'

import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import CustomButton from '@/app/ui/CustomButton'
import { get } from 'lodash-es'
import { useEffect, useState } from 'react'

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
  const { data: session, status, update } = useSession()
  const [pending, setPending] = useState(false)

  useEffect(() => {
    if (status === 'loading') return
    if (status === 'unauthenticated') {
      router.replace('/log-in')
      return
    }
    if (!get(session, 'userData.profileId')) {
      router.replace('/about-you')
      return
    }
    if (get(session, 'userData.hasSeenAssessmentGuide')) {
      router.replace('/dashboard')
    }
  }, [session, status, router])

  const finish = async () => {
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
    <div className="bg-off-white min-h-[calc(100vh-73px)]">
      <div className="w-10/12 max-w-3xl mx-auto pt-10 pb-24 md:pt-16">
        <div className="flex flex-col gap-2 mb-10">
          <h1 className="inter font-bold text-2xl text-black-russian">
            Welcome to The Strength Solution
          </h1>
          <p className="inter font-normal text-light-grey text-base max-w-2xl">
            These walkthroughs explain how to run your assessment, log your results in the app, and
            understand what your numbers mean.
          </p>
        </div>

        <div className="flex flex-col gap-8">
          {sections.map(({ title, description }, i) => (
            <section
              key={title}
              className="rounded-lg border border-light-grey bg-bright-white overflow-hidden shadow-sm"
            >
              <div className="px-5 pt-5 pb-3 border-b border-lighter-grey bg-off-white">
                <h2 className="inter font-semibold text-lg text-black-russian">
                  {i + 1}. {title}
                </h2>
                <p className="inter text-sm text-dark-grey mt-2 leading-relaxed">{description}</p>
              </div>
              <div className="aspect-video bg-light-grey flex items-center justify-center px-4">
                <p className="inter text-sm text-medium-grey text-center">
                  Video walkthrough — embed player or link here when ready
                </p>
              </div>
            </section>
          ))}
        </div>

        <div className="mt-14 flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="w-full sm:w-auto sm:min-w-[200px]">
            <CustomButton
              type="button"
              label={pending ? 'Saving…' : 'Continue to dashboard'}
              classes={`bg-brand-blue h-10 ${pending ? 'opacity-70 pointer-events-none' : ''}`}
              textClasses="font-semibold text-sm text-white"
              onClick={finish}
            />
          </div>
          <button
            type="button"
            className="inter text-sm font-medium text-brand-blue hover:underline disabled:opacity-50"
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
