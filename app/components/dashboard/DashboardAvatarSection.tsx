import Image from 'next/image'

import FemaleAvatarFront from '@/app/components/dashboard/FemaleAvatarFront'
import proficiencyLegend from '@/app/images/proficiency-legend.svg'
import bgBlur from '@/app/images/blue-bg-blur-dashboard.svg'
import { AvatarColorsFront, AvatarColorsRear } from '@/common/types'
import FemaleAvatarRear from '@/app/components/dashboard/FemaleAvatarRear'
import DashboardSidePanel from '@/app/components/dashboard/DashboardSidePanel'
import classes from './DashboardAvatarSection.module.css'
import MaleAvatarFront from '@/app/components/dashboard/MaleAvatarFront'
import MaleAvatarRear from '@/app/components/dashboard/MaleAvatarRear'

export default function DashboardAvatarSection() {
  const grey = '#9396A3'
  const green = '#4CD964'
  const orange = '#F4B43B'
  const yellow = '#FCFF4B'
  const red = '#F25B28'
  const blue = '#2E8EEC'
  const colorsFront: AvatarColorsFront['colors'] = {
    traps: yellow,
    delts: green,
    pecs: red,
    biceps: orange,
    forearms: yellow,
    abs: orange,
    obliques: orange,
    quads: red,
    calves: orange,
    neck: grey,
    hands: grey,
    head: grey
  }
  const colorsRear: AvatarColorsRear['colors'] = {
    calves: orange,
    adductors: orange,
    quads: orange,
    hamstrings: yellow,
    glutes: yellow,
    obliques: orange,
    traps: yellow,
    lats: red,
    rotatorCuff: red,
    forearms: yellow,
    triceps: orange,
    delts: green,
    erectors: orange,
    hands: grey,
    head: grey
  }

  return (
    <>
      <section className="bg-black-russian h-100 pb-10">
        <div className={`hidden h-[522px] xl:grid ${classes.container}`}>
          <Image src={bgBlur} alt="legend" className="absolute left-0 top-8" />
          <div className="w-220px relative ml-28 mt-6">
            {/*<FemaleAvatarFront colors={colorsFront} />*/}
            <MaleAvatarFront colors={colorsFront} />
            <div className="absolute bottom-6 right-20 z-0">
              <Image src={proficiencyLegend} alt="legend"/>
            </div>
          </div>
          <div className="">
            {/*<FemaleAvatarRear colors={colorsRear} />*/}
            <MaleAvatarRear colors={colorsRear} />
          </div>
          <DashboardSidePanel />
        </div>
        <div className="xl:hidden">
          <DashboardSidePanel />
        </div>
      </section>
    </>
  )
}