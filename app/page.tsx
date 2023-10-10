import LandingPageLeft from "@/app/components/home/LandingPageLeft";
import LandingPageRight from "@/app/components/home/LandingPageRight";
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

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
