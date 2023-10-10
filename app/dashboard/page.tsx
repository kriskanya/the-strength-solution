import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)
  console.log('session info, dashboard', session)

  return (
    <h1>this is the dashboard</h1>
  )
}