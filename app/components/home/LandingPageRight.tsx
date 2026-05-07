import Image from 'next/image'

import dashboardScreenshot from '@/app/images/dashboard-screenshot.jpg'

import classes from './LandingPageRight.module.css'

export default function LandingPageRight() {
  return (
    <div className={`${classes.container} relative min-h-screen w-full`}>
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
