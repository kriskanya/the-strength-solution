'use client'
import { useEffect } from 'react'
import { get, isArray, toInteger } from 'lodash-es'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import DashboardNav from '@/app/components/dashboard/DashboardNav'
import DashboardAvatarSection from '@/app/components/dashboard/avatars/DashboardAvatarSection'
import DashboardGraphsSection from '@/app/components/dashboard/graphs/DashboardGraphsSection'
import ActiveExerciseContextProvider from '@/app/store/exercises-context'

function DashboardGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const { data: session, status } = useSession()

  useEffect(() => {
    if (status !== 'authenticated' || !session?.userData) return

    const profileId = toInteger(get(session, 'userData.profileId'))
    if (!profileId) return

    if (get(session, 'userData.hasSeenAssessmentGuide')) return

    ;(async () => {
      try {
        const res = await fetch(`/api/exercises/choose/profile/${profileId}`)
        const chosen = await res.json()
        if (isArray(chosen) && chosen.length) {
          router.replace('/assessment-guide')
        }
      } catch (e) {
        console.error('DashboardGuard', e)
      }
    })()
  }, [session, status, router])

  return <>{children}</>
}

export default function DashboardPage() {
  return (
    <ActiveExerciseContextProvider>
      <DashboardGuard>
        <DashboardNav />
        <DashboardAvatarSection />
        <DashboardGraphsSection />
      </DashboardGuard>
    </ActiveExerciseContextProvider>
  )
}