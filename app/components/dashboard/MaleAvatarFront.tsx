import Image from 'next/image'

import { AvatarColorsFront } from '@/common/types'
import AbsMale from '@/app/images/male-avatar/front/abs'
import BicepsMale from '@/app/images/male-avatar/front/biceps'
import CalvesMale from '@/app/images/male-avatar/front/calves'
import DeltsMale from '@/app/images/male-avatar/front/delts'
import ForearmsMale from '@/app/images/male-avatar/front/forearms'
import hands from '@/app/images/male-avatar/front/hands.svg'
import head from '@/app/images/male-avatar/front/head.svg'
import HipAbductorsMale from '@/app/images/male-avatar/front/hip-abductors'
import neck from '@/app/images/male-avatar/front/neck-sternum.svg'
import ObliquesMale from '@/app/images/male-avatar/front/obliques'
import PecsMale from '@/app/images/male-avatar/front/pecs'
import QuadsMale from '@/app/images/male-avatar/front/quads'
import TrapsMale from '@/app/images/male-avatar/front/traps'

export default function MaleAvatarFront({ colors } : AvatarColorsFront) {
  return (
    <div className="relative">
      <HipAbductorsMale className="absolute top-[12.5em] left-[.30em]" fill={colors.quads} />
      <QuadsMale className="absolute top-[12.7em] -left-[1.4em]" fill={colors.quads} />
      <CalvesMale className="absolute top-[20.75em] -left-[1.9em]" fill={colors.calves} />
      <ObliquesMale className="absolute top-[7.2em] -left-[.9em]" fill={colors.obliques} />
      <TrapsMale className="absolute top-[3.3em] -left-[.6em]" fill={colors.traps} />
      <ForearmsMale className="absolute top-[9.4em] -left-[4.7em]" fill={colors.forearms} />
      <BicepsMale className="absolute top-[7em] -left-[3em]" fill={colors.biceps} />
      <AbsMale className="absolute top-[6.6em] left-[.1em]" fill={colors.abs} />
      <Image src={neck} alt="" className="absolute top-[2.9em] -left-[.35em]" />
      <PecsMale className="absolute top-[5.4em] -left-[1.4em]" fill={colors.pecs} />
      <Image src={head} alt="" className="absolute -top-[.3em] left-2" />
      <DeltsMale className="absolute top-[5em] -left-[2.6em]" fill={colors.delts} />
      <Image src={hands} alt="" className="absolute top-[13.9em] -left-[4.2em]" />
    </div>
  )
}