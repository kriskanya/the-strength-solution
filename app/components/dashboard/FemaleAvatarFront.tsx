import Image from 'next/image'
import head from '@/app/images/female-avatar/front/head.svg'
import hair from '@/app/images/female-avatar/front/hair.svg'
import neck from '@/app/images/female-avatar/front/neck-sternum.svg'
import hands from '@/app/images/female-avatar/front/hands.svg'
import CalvesFemale from '@/app/images/female-avatar/front/calves'
import AbsFemale from '@/app/images/female-avatar/front/abs'
import BicepsFemale from '@/app/images/female-avatar/front/biceps'
import DeltsFemale from '@/app/images/female-avatar/front/delts'
import ForearmsFemale from '@/app/images/female-avatar/front/forearms'
import ObliquesFemale from '@/app/images/female-avatar/front/obliques'
import PecsFemale from '@/app/images/female-avatar/front/pecs'
import QuadsFemale from '@/app/images/female-avatar/front/quads'
import TrapsFemale from '@/app/images/female-avatar/front/traps'
import { AvatarColorsFront } from '@/common/types'

export default function FemaleAvatarFront({ colors } : AvatarColorsFront) {
  return (
    <div className="relative">
      <CalvesFemale className="absolute top-[19em] -left-[2em]" fill={colors.calves} />
      <QuadsFemale className="absolute top-[13.3em] -left-[1.1em]" fill={colors.quads} />
      <ObliquesFemale className="absolute top-[3.5em] -left-[.9em]" fill={colors.obliques} />
      <Image src={hair} alt="" className="absolute" />
      <TrapsFemale className="absolute top-14 -left-[.55em]" fill={colors.traps} />
      <AbsFemale className="absolute top-[8.1em] left-[.6em]" fill={colors.abs} />
      <PecsFemale className="absolute top-[5.2em] -left-[1.3em]" fill={colors.pecs} />
      <Image src={neck} alt="" className="absolute top-[3.1em] -left-[.35em]" />
      <Image src={head} alt="" className="absolute top-5 left-3" />
      <DeltsFemale className="absolute top-[5.1em] -left-[2.2em]" fill={colors.delts} />
      <ForearmsFemale className="absolute top-[9.4em] -left-[4em]" fill={colors.forearms} />
      <BicepsFemale className="absolute top-[7em] -left-[2.45em]" fill={colors.biceps} />
      <Image src={hands} alt="" className="absolute top-[13.9em] -left-[5em]" />
    </div>
  )
}