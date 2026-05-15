'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import dashboardScreenshot from '@/app/images/dashboard-screenshot.jpg'

import classes from './LandingPageRight.module.css'

function navLinkClass(isActive: boolean) {
  return `inter rounded-lg px-4 py-2 text-sm font-semibold transition ${
    isActive
      ? 'bg-white/25 text-white shadow-sm'
      : 'text-white hover:bg-white/15 hover:text-light-blue'
  }`
}

export default function LandingPageRight() {
  const pathname = usePathname()

  return (
    <div className={`${classes.container} relative min-h-screen w-full`}>
      <nav
        className="absolute right-6 top-6 z-10 flex items-center gap-1 rounded-xl bg-gradient-to-r from-brand-blue to-blue-elite p-1.5 shadow-[0_4px_28px_rgba(0,125,217,0.55)] ring-2 ring-white/25 md:right-12 md:top-8"
        aria-label="Main"
      >
        <Link href="/shop" className={navLinkClass(pathname === '/shop')}>
          Shop
        </Link>
        <Link href="/log-in" className={navLinkClass(pathname === '/log-in')}>
          Log in
        </Link>
      </nav>
      <Image
        src={dashboardScreenshot}
        alt="The Strength Solution dashboard with strength assessments, muscle map, and progress charts."
        className={`${classes.image} object-cover object-left-top`}
        fill
        priority
        sizes="50vw"
      />
    </div>
  )
}
