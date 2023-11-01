import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import DashboardNav from '@/app/components/dashboard/DashboardNav'
import DashboardAvatarSection from '@/app/components/dashboard/DashboardAvatarSection'
import DashboardGraphsSection from '@/app/components/dashboard/DashboardGraphsSection'

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)
  console.log('session info, dashboard', session)

  return (
    <>
      <DashboardNav />
      <DashboardAvatarSection />
      <DashboardGraphsSection />
    </>
  )
}