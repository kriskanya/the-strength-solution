import LandingPageLeft from "@/app/components/home/LandingPageLeft";
import LandingPageRight from "@/app/components/home/LandingPageRight";
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'

export default async function Home() {
  const session = await getServerSession(authOptions)
  if (session?.user) {
    redirect('/dashboard')
  }

  return (
    <main className="grid grid-cols-2">
      <LandingPageLeft />
      <LandingPageRight />
    </main>
  )
}
