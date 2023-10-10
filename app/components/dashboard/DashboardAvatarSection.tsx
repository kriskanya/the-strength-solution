import Image from 'next/image'

import FemaleAvatar from '@/app/components/dashboard/FemaleAvatar'
import proficiencyLegend from '@/app/images/proficiency-legend.svg'

export default function DashboardAvatarSection() {
  return (
    <section className="bg-black-russian w-screen h-screen">
      <div className="">
        <div className="ml-40">
          <FemaleAvatar />
        </div>
        <Image src={proficiencyLegend} alt="legend" className="" />
      </div>
    </section>
  )
}