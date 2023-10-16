import Image from 'next/image'
import { AvatarColorsRear } from '@/common/types'
import CalvesMaleRear from '@/app/images/male-avatar/rear/calves'
import DeltsMaleRear from '@/app/images/male-avatar/rear/delts'
import ForearmsMaleRear from '@/app/images/male-avatar/rear/forearms'
import GlutesMale from '@/app/images/male-avatar/rear/glutes'
import hands from '@/app/images/male-avatar/rear/hands.svg'
import head from '@/app/images/male-avatar/rear/head.svg'
import HipAdductorsMaleRear from '@/app/images/male-avatar/rear/hip-adductors'
import LatsMaleRear from '@/app/images/male-avatar/rear/lats'
import ObliquesMaleRear from '@/app/images/male-avatar/rear/obliques'
import QuadsMaleRear from '@/app/images/male-avatar/rear/quads'
import RotatorCuffMaleRear from '@/app/images/male-avatar/rear/rotator-cuff'
import TrapsMaleRear from '@/app/images/male-avatar/rear/traps'
import SpinalErectorsMaleRear from '@/app/images/male-avatar/rear/spinal-erectors'
import HamstringsMale from '@/app/images/male-avatar/rear/hamstrings'
import TricepsMale from '@/app/images/male-avatar/rear/triceps'

export default function MaleAvatarRear({ colors }: AvatarColorsRear) {
  return (
    <div className="relative">
      <CalvesMaleRear className="absolute top-[21.5em] -left-[1.2em]" fill={colors.calves} />
      <HipAdductorsMaleRear className="absolute top-[16.3em] left-[2.9em]" fill={colors.adductors} />
      <HamstringsMale className="absolute top-[17em] left-[.8em]" fill={colors.hamstrings} />
      <GlutesMale className="absolute top-[14.7em] left-[1.3em]" fill={colors.glutes} />
      <QuadsMaleRear className="absolute top-[15.3em] left-[.85em]" fill={colors.quads} />
      <ObliquesMaleRear className="absolute top-[11em] left-[1.4em]" fill={colors.obliques} />
      <Image src={hands} alt="" className="absolute top-[16.1em] -left-[.8em]" />
      <ForearmsMaleRear className="absolute top-[11.2em] -left-[1em]" fill={colors.forearms}  />
      <TricepsMale className="absolute top-[8.8em] -left-[.8em]" fill={colors.triceps} />
      <LatsMaleRear className="absolute top-[9.2em] left-[1em]" fill={colors.lats} />
      <RotatorCuffMaleRear className="absolute top-[7.7em] left-[.9em]" fill={colors.rotatorCuff}  />
      <SpinalErectorsMaleRear className="absolute top-[5.0em] left-[1em]" fill={colors.erectors}  />
      <TrapsMaleRear className="absolute top-[4.9em] left-[.6em]" fill={colors.traps} />
      <Image src={head} alt="" className="absolute top-[1em] left-11" />
      <DeltsMaleRear className="absolute top-[6em] -left-[.5em]" fill={colors.delts} />
    </div>
  )
}