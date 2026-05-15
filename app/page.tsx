import LandingPageLeft from "@/app/components/home/LandingPageLeft";
import LandingPageRight from "@/app/components/home/LandingPageRight";
import LandingMarketingSections from "@/app/components/home/LandingMarketingSections";
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'

export default async function Home() {
  const session = await getServerSession(authOptions)
  if (session?.user) {
    redirect('/dashboard')
  }

  return (
    <main>
      <div className="grid min-h-screen grid-cols-2">
        <LandingPageLeft />
        <LandingPageRight />
      </div>
      <LandingMarketingSections />
    </main>
  )
}
