import Image from 'next/image'
import face from '@/app/images/female-avatar/face.svg'
import hair from '@/app/images/female-avatar/hair.svg'
import neck from '@/app/images/female-avatar/neck-sternum.svg'
import hands from '@/app/images/female-avatar/hands.svg'
import quads from '@/app/images/female-avatar/quads.svg'
import CalvesFemale from '@/app/images/female-avatar/calves'
import AbsFemale from '@/app/images/female-avatar/abs'
import BicepsFemale from '@/app/images/female-avatar/biceps'
import DeltsFemale from '@/app/images/female-avatar/delts'
import ForearmsFemale from '@/app/images/female-avatar/forearms'
import ObliquesFemale from '@/app/images/female-avatar/obliques'
import PecsFemale from '@/app/images/female-avatar/pecs'
import QuadsFemale from '@/app/images/female-avatar/quads'
import TrapsFemale from '@/app/images/female-avatar/traps'

export default function FemaleAvatar() {
  const grey = '#9396A3'
  const green = '#4CD964'
  const orange = '#F4B43B'
  const colors = {
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

  return (
    <div className="relative">
      <CalvesFemale className="absolute top-[19em] -left-[2em]" fill={colors.calves} />
      <Image src={quads} alt="" className="absolute top-[13.3em] -left-[1.1em]" />
      <QuadsFemale className="absolute top-[13.3em] -left-[1.1em]" fill={colors.quads} />
      <ObliquesFemale className="absolute top-[3.5em] -left-[.9em]" fill={colors.obliques} />
      <Image src={hair} alt="" className="absolute" />
      <TrapsFemale className="absolute top-14 -left-[.55em]" fill={colors.traps} />
      <AbsFemale className="absolute top-[8.1em] left-[.6em]" fill={colors.abs} />
      <PecsFemale className="absolute top-[5.2em] -left-[1.3em]" fill={colors.pecs} />
      <Image src={neck} alt="" className="absolute top-[3.1em] -left-[.35em]" />
      <Image src={face} alt="" className="absolute top-5 left-3" />
      <DeltsFemale className="absolute top-[5.1em] -left-[2.2em]" fill={colors.delts} />
      <ForearmsFemale className="absolute top-[9.4em] -left-[4em]" fill={colors.forearms} />
      <BicepsFemale className="absolute top-[7em] -left-[2.45em]" fill={colors.biceps} />
      <Image src={hands} alt="" className="absolute top-[13.9em] -left-[5em]" />
    </div>
  )
}