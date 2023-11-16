'use client'
import DashboardNav from '@/app/components/dashboard/DashboardNav'
import DashboardAvatarSection from '@/app/components/dashboard/avatars/DashboardAvatarSection'
import DashboardGraphsSection from '@/app/components/dashboard/graphs/DashboardGraphsSection'
import ActiveExerciseContextProvider from '@/app/store/exercises-context'

export default function DashboardPage() {
  return (
    <ActiveExerciseContextProvider>
      <DashboardNav />
      <DashboardAvatarSection />
      <DashboardGraphsSection />
    </ActiveExerciseContextProvider>
  )
}