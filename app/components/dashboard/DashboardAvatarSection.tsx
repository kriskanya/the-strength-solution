import Image from 'next/image'

import FemaleAvatarFront from '@/app/components/dashboard/FemaleAvatarFront'
import proficiencyLegend from '@/app/images/proficiency-legend.svg'
import bgBlur from '@/app/images/blue-bg-blur-dashboard.svg'
import { AvatarColorsFront, AvatarColorsRear } from '@/common/types'
import FemaleAvatarRear from '@/app/components/dashboard/FemaleAvatarRear'
import DashboardSidePanel from '@/app/components/dashboard/DashboardSidePanel'
import classes from './DashboardAvatarSection.module.css'
import RelativeStrengthBarGraph from '@/app/components/dashboard/RelativeStrengthBarGraph'

export default function DashboardAvatarSection() {
  const grey = '#9396A3'
  const green = '#4CD964'
  const orange = '#F4B43B'
  const yellow = '#FCFF4B'
  const red = '#F25B28'
  const colorsFront: AvatarColorsFront['colors'] = {
    traps: grey,
    delts: green,
    pecs: green,
    biceps: orange,
    forearms: orange,
    abs: orange,
    obliques: orange,
    quads: orange,
    calves: grey
  }
  const colorsRear: AvatarColorsRear['colors'] = {
    calves: grey,
    adductors: yellow,
    quads: orange,
    hamstrings: yellow,
    glutes: yellow,
    obliques: orange,
    traps: red,
    lats: red,
    rotatorCuff: red,
    forearms: red,
    triceps: yellow,
    delts: green,
    erectors: orange
  }

  return (
    <>
      <section className="bg-black-russian h-100 pb-2">
        <div className={`grid ${classes.container}`}>
          <Image src={bgBlur} alt="legend" className="absolute left-0 top-8" />
          <div className="h-[522px] w-220px relative ml-28 mt-6">
            <FemaleAvatarFront colors={colorsFront} />
            <div className="absolute bottom-6 right-8">
              <Image src={proficiencyLegend} alt="legend"/>
            </div>
          </div>
          <div className="">
            <FemaleAvatarRear colors={colorsRear} />
          </div>
          <DashboardSidePanel />
        </div>
      </section>
      <section>
        <RelativeStrengthBarGraph />
      </section>
    </>
  )
}