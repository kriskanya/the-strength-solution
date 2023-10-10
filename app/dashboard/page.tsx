import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import DashboardNav from '@/app/components/dashboard/DashboardNav'
import FemaleAvatar from '@/app/components/dashboard/FemaleAvatar'
import DashboardAvatarSection from '@/app/components/dashboard/DashboardAvatarSection'

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)
  console.log('session info, dashboard', session)

  return (
    <div>
      <DashboardNav />
      <DashboardAvatarSection />
    </div>
  )
}