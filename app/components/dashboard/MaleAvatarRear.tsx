'use client'

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
import ExerciseDescription from '@/app/ui/ExerciseDescription'
import { useEffect, useState } from 'react'
import { get } from 'lodash-es'
import { maleAvatarRearDescriptions } from '@/app/components/dashboard/dashboard-helpers'
import classes from '@/app/components/dashboard/MaleAvatarFront.module.css'

export default function MaleAvatarRear({ colors }: AvatarColorsRear) {
  const [fillColors, setFillColors] = useState(colors)
  const [description, setDescription] = useState({
    bodyPart: '',
    text: '',
    position: ''
  })
  const [showDescription, setShowDescription] = useState(false)
  const darkGrey = '#444751'

  function hoverOverDescription(event: any) {
    const res: any = {}
    const bodyPart = get(event, 'target.dataset.name')

    if (!bodyPart) return

    const obj = {
      bodyPart,
      text: maleAvatarRearDescriptions[bodyPart]?.text,
      position: maleAvatarRearDescriptions[bodyPart]?.position
    }
    setDescription(obj)
    for (const key in fillColors) {
      res[key] = darkGrey
    }
    setShowDescription(true)
    setFillColors(res)
  }

  function handleLeave() {
    setShowDescription(false)
  }

  function resetAvatar() {
    const res: any = {}
    for (const key in colors) {
      res[key] = colors[key as keyof AvatarColorsRear['colors']]
    }
    setFillColors(res)
  }

  // listener for resetting the avatar if user's mouse leaves the area
  useEffect(() => {
    // only add the event listener when the description is shown
    if (showDescription) return;
    resetAvatar()
  }, [showDescription]);

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

      {/*hover-over areas*/}
      <div className="w-[4.3em] h-[1.5em] absolute bg-white top-[5.5em] left-[2.2em]" data-name="traps" onMouseEnter={hoverOverDescription}></div>

      {/*<div className={`${classes.shoulderLeft} w-[4.8em] h-[2.7em] absolute top-[5.2em] -left-[4.4em]`} data-name="delts" onMouseEnter={hoverOverDescription}></div>*/}
      {/*<div className={`${classes.shoulderRight} w-[4.8em] h-[2.7em] absolute top-[5.2em] left-[4em]`} data-name="delts" onMouseEnter={hoverOverDescription}></div>*/}
      {/*<div className="w-[5.2em] h-[2.3em] absolute top-[5.8em] -left-[.6em]" data-name="pecs" onMouseEnter={hoverOverDescription}></div>*/}
      {/*<div className="w-[2em] h-[3.2em] absolute top-[7.5em] -left-[3em]" data-name="biceps" onMouseEnter={hoverOverDescription}></div>*/}
      {/*<div className="w-[2em] h-[3.2em] absolute top-[7.5em] left-[5.4em]" data-name="biceps" onMouseEnter={hoverOverDescription}></div>*/}
      {/*<div className="w-[2em] h-[3.8em] absolute top-[10.5em] -left-[3.3em]" data-name="forearms" onMouseEnter={hoverOverDescription}></div>*/}
      {/*<div className="w-[2em] h-[4.1em] absolute top-[10.5em] left-[6.1em]" data-name="forearms" onMouseEnter={hoverOverDescription}></div>*/}
      {/*<div className="w-[3.3em] h-[6.5em] absolute top-[8.2em] left-[.5em]" data-name="abs" onMouseEnter={hoverOverDescription}></div>*/}
      {/*<div className="w-[1.5em] h-[5em] absolute top-[8.2em] -left-[1em]" data-name="obliques" onMouseEnter={hoverOverDescription}></div>*/}
      {/*<div className="w-[1.5em] h-[5em] absolute top-[8.2em] left-[3.7em]" data-name="obliques" onMouseEnter={hoverOverDescription}></div>*/}
      {/*<div className="w-[2em] h-[8em] absolute top-[14em] -left-[1.5em]" data-name="quads" onMouseEnter={hoverOverDescription}></div>*/}
      {/*<div className="w-[1.5em] h-[6.3em] absolute top-[15.7em] left-[.5em]" data-name="quads" onMouseEnter={hoverOverDescription}></div>*/}
      {/*<div className="w-[2em] h-[8em] absolute top-[14em] left-[3.8em]" data-name="quads" onMouseEnter={hoverOverDescription}></div>*/}
      {/*<div className="w-[2.5em] h-[6.3em] absolute top-[22em] -left-[1.2em]" data-name="calves" onMouseEnter={hoverOverDescription}></div>*/}
      {/*<div className="w-[2.5em] h-[6.3em] absolute top-[22em] left-[3.5em]" data-name="calves" onMouseEnter={hoverOverDescription}></div>*/}
      {
        showDescription
          ? (
            <div className={`absolute ${ description?.position } z-10`}>
              <ExerciseDescription description={description?.text} bodyPart={description?.bodyPart} />
            </div>
          )
          : ''
      }
    </div>
  )
}