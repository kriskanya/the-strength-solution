import Image from 'next/image'

import FemaleAvatarFront from '@/app/components/dashboard/FemaleAvatarFront'
import proficiencyLegend from '@/app/images/proficiency-legend.svg'
import { AvatarColorsFront, AvatarColorsRear } from '@/common/types'
import FemaleAvatarRear from '@/app/components/dashboard/FemaleAvatarRear'

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
    <section className="bg-black-russian w-screen h-screen">
      <div className="">
        {/*<div className="ml-40">*/}
        {/*  <FemaleAvatarFront colors={colorsFront} />*/}
        {/*</div>*/}
        {/*<div className="mt-">*/}
        {/*  <Image src={proficiencyLegend} alt="legend"/>*/}
        {/*</div>*/}
        <div className="ml-40">
          <FemaleAvatarRear colors={colorsRear} />
        </div>
      </div>
    </section>
  )
}