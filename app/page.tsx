import LandingPageLeft from "@/app/components/LandingPageLeft";
import LandingPageRight from "@/app/components/LandingPageRight";
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

export default async function Home() {
  const session = await getServerSession(authOptions)
  console.log('session information', session)

  return (
    <main className="grid grid-cols-2">
      <LandingPageLeft />
      <LandingPageRight />
    </main>
  )
}
