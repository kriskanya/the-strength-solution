import Image from 'next/image'
import head from '@/app/images/female-avatar/rear/head.svg'
import hands from '@/app/images/female-avatar/rear/hands.svg'
import { AvatarColorsRear } from '@/common/types'
import TrapsFemaleRear from '@/app/images/female-avatar/rear/traps'
import DeltsFemaleRear from '@/app/images/female-avatar/rear/delts'
import SpinalErectorsFemale from '@/app/images/female-avatar/rear/spinal-erectors'
import ForearmsFemaleRear from '@/app/images/female-avatar/rear/forearms'
import RotatorCuffFemale from '@/app/images/female-avatar/rear/rotator-cuff'
import QuadsFemaleRear from '@/app/images/female-avatar/rear/quads'
import HipAdductorsFemale from '@/app/images/female-avatar/rear/hip-adductors'
import HamstringsFemale from '@/app/images/female-avatar/rear/hamstrings'
import CalvesFemaleRear from '@/app/images/female-avatar/rear/calves'
import TricepsFemale from '@/app/images/female-avatar/rear/triceps'
import LatsFemale from '@/app/images/female-avatar/rear/lats'
import ObliquesFemaleRear from '@/app/images/female-avatar/rear/obliques'
import GlutesFemale from '@/app/images/female-avatar/rear/glutes'

export default function FemaleAvatarRear({ colors }: AvatarColorsRear) {
  return (
    <div className="relative">
      <CalvesFemaleRear className="absolute top-[22.7em] -left-[.1em]" fill={colors.calves} />
      <HipAdductorsFemale className="absolute top-[18.5em] left-[1.5em]" fill={colors.adductors} />
      <QuadsFemaleRear className="absolute top-[15.2em] -left-[.2em]" fill={colors.quads} />
      <HamstringsFemale className="absolute top-[19.3em] left-[.6em]" fill={colors.hamstrings} />
      <GlutesFemale className="absolute top-[15.2em] left-[.2em]" fill={colors.glutes} />
      <ObliquesFemaleRear className="absolute top-[5em] left-[.3em]" fill={colors.obliques} />
      <TrapsFemaleRear className="absolute top-[5.0em] left-[.5em]" fill={colors.traps} />
      <Image src={head} alt="" className="absolute top-[.9em] left-3" />
      <LatsFemale className="absolute top-[9.9em] left-[.72em]" fill={colors.lats} />
      <RotatorCuffFemale className="absolute top-[7.5em] left-[.3em]" fill={colors.rotatorCuff}  />
      <Image src={hands} alt="" className="absolute top-[16.1em] -left-[2.3em]" />
      <ForearmsFemaleRear className="absolute top-[11.2em] -left-[2.7em]" fill={colors.forearms}  />
      <TricepsFemale className="absolute top-[8.75em] -left-[1.25em]" fill={colors.triceps} />
      <DeltsFemaleRear className="absolute top-[6.8em] -left-[1em]" fill={colors.delts} />
      <SpinalErectorsFemale className="absolute top-[5.9em] left-4" fill={colors.erectors}  />
    </div>
  )
}