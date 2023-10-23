'use client'

import Image from 'next/image'
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
import { useEffect, useState } from 'react'
import { get } from 'lodash-es'
import { femaleAvatarFrontPositions } from '@/app/components/dashboard/dashboard-helpers'
import classes from '@/app/components/dashboard/FemaleAvatarFront.module.css'
import ExerciseDescription from '@/app/ui/ExerciseDescription'
import NeckSternumFemale from '@/app/images/female-avatar/front/neck-sternum'
import HeadFemale from '@/app/images/female-avatar/front/head'
import HairFemale from '@/app/images/female-avatar/front/hair'
import HandsFemale from '@/app/images/female-avatar/front/hands'

export default function FemaleAvatarFront({ colors } : AvatarColorsFront) {
  const [fillColors, setFillColors] = useState(colors)
  const [description, setDescription] = useState({
    bodyPart: '',
    text: '',
    position: '',
    name: ''
  })
  const [showDescription, setShowDescription] = useState(false)
  const DARK_GREY = '#444751'

  function hoverOverDescription(event: any) {
    const newFillColors: any = {}
    const bodyPart = get(event, 'target.dataset.name')

    if (!bodyPart) return

    const obj = {
      bodyPart,
      text: femaleAvatarFrontPositions[bodyPart]?.text,
      position: femaleAvatarFrontPositions[bodyPart]?.position,
      name: femaleAvatarFrontPositions[bodyPart]?.name
    }
    setDescription(obj)
    for (const key in fillColors) {
      newFillColors[key] = DARK_GREY
    }
    setShowDescription(true)
    newFillColors[bodyPart] = colors[bodyPart as keyof AvatarColorsFront['colors']]
    setShowDescription(true)
    setFillColors(newFillColors)
  }

  function handleLeave() {
    setShowDescription(false)
  }

  function resetAvatar() {
    const newFillColors: any = {}
    for (const key in colors) {
      newFillColors[key] = colors[key as keyof AvatarColorsFront['colors']]
    }
    setFillColors(newFillColors)
  }

  // listener for resetting the avatar if user's mouse leaves the area
  useEffect(() => {
    // only add the event listener when the description is shown
    if (showDescription) return;
    resetAvatar()
  }, [showDescription]);
  
  return (
    <div className="relative" onMouseLeave={handleLeave}>
      <CalvesFemale className="absolute top-[19em] -left-[2em]" fill={fillColors.calves} />
      <QuadsFemale className="absolute top-[13.3em] -left-[1.1em]" fill={fillColors.quads} />
      <ObliquesFemale className="absolute top-[3.5em] -left-[.9em]" fill={fillColors.obliques} />
      <HairFemale className="absolute" fill={fillColors.hair} />
      <TrapsFemale className="absolute top-14 -left-[.55em]" fill={fillColors.traps} />
      <AbsFemale className="absolute top-[8.1em] left-[.6em]" fill={fillColors.abs} />
      <PecsFemale className="absolute top-[5.2em] -left-[1.3em]" fill={fillColors.pecs} />
      <NeckSternumFemale className="absolute top-[3.1em] -left-[.35em]" fill={fillColors.neck} />
      <HeadFemale className="absolute top-5 left-3" fill={fillColors.head} />
      <DeltsFemale className="absolute top-[5.1em] -left-[2.2em]" fill={fillColors.delts} />
      <ForearmsFemale className="absolute top-[9.4em] -left-[4em]" fill={fillColors.forearms} />
      <BicepsFemale className="absolute top-[7em] -left-[2.45em]" fill={fillColors.biceps} />
      <HandsFemale className="absolute top-[13.9em] -left-[5em]" fill={fillColors.hands} />

      {/*hover-over areas*/}
      <div className="w-[3em] h-[1.5em] absolute top-[4em] left-[.5em]" data-name="traps" onMouseEnter={hoverOverDescription}></div>
      <div className={`${classes.shoulderLeft} w-[4.8em] h-[2.7em] absolute top-[5.2em] -left-[4.4em]`} data-name="delts" onMouseEnter={hoverOverDescription}></div>
      <div className={`${classes.shoulderRight} w-[4.8em] h-[2.7em] absolute top-[5.2em] left-[3.9em]`} data-name="delts" onMouseEnter={hoverOverDescription}></div>
      <div className="w-[5.2em] h-[2.3em] absolute top-[5.8em] -left-[.6em]" data-name="pecs" onMouseEnter={hoverOverDescription}></div>
      <div className="w-[2em] h-[2.9em] absolute top-[7.3em] -left-[2.7em]" data-name="biceps" onMouseEnter={hoverOverDescription}></div>
      <div className="w-[2em] h-[2.9em] absolute top-[7.3em] left-[4.5em]" data-name="biceps" onMouseEnter={hoverOverDescription}></div>
      <div className="w-[2em] h-[3.8em] absolute top-[10.3em] -left-[3.7em]" data-name="forearms" onMouseEnter={hoverOverDescription}></div>
      <div className="w-[2em] h-[4.1em] absolute top-[10.3em] left-[5.7em]" data-name="forearms" onMouseEnter={hoverOverDescription}></div>
      <div className="w-[3.1em] h-[6.5em] absolute top-[8.2em] left-[.5em]" data-name="abs" onMouseEnter={hoverOverDescription}></div>
      <div className="w-[1.5em] h-[5.5em] absolute top-[8.2em] -left-[1em]" data-name="obliques" onMouseEnter={hoverOverDescription}></div>
      <div className="w-[1.3em] h-[5.5em] absolute top-[8.2em] left-[3.5em]" data-name="obliques" onMouseEnter={hoverOverDescription}></div>
      <div className={`${classes.quadLeft} w-[6.9em] h-[11em] absolute top-[12em] -left-[2.8em]`} data-name="quads" onMouseEnter={hoverOverDescription}></div>
      <div className={`${classes.quadRight} w-[6.9em] h-[11em] absolute top-[11.9em] left-[.2em]`} data-name="quads" onMouseEnter={hoverOverDescription}></div>
      <div className={`${classes.calvesLeft} w-[8em] h-[12em] absolute top-[18.5em] -left-[3.9em]`} data-name="calves" onMouseEnter={hoverOverDescription}></div>
      <div className={`${classes.calvesRight} w-[8em] h-[12em] absolute top-[17.5em] left-[.5em]`} data-name="calves" onMouseEnter={hoverOverDescription}></div>
      {
        showDescription
          ? (
            <div className={`absolute ${ description?.position } z-10`}>
              <ExerciseDescription description={description?.text} bodyPart={description?.bodyPart} name={description?.name} />
            </div>
          )
          : ''
      }
    </div>
  )
}