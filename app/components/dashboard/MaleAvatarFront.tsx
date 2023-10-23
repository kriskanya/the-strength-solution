'use client'

import Image from 'next/image'
import { AvatarColorsFront } from '@/common/types'
import AbsMale from '@/app/images/male-avatar/front/abs'
import BicepsMale from '@/app/images/male-avatar/front/biceps'
import CalvesMale from '@/app/images/male-avatar/front/calves'
import DeltsMale from '@/app/images/male-avatar/front/delts'
import ForearmsMale from '@/app/images/male-avatar/front/forearms'
import HandsMale from '@/app/images/male-avatar/front/hands'
import HeadMale from '@/app/images/male-avatar/front/head'
import HipAbductorsMale from '@/app/images/male-avatar/front/hip-abductors'
import NeckSternumMale from '@/app/images/male-avatar/front/neck-sternum'
import ObliquesMale from '@/app/images/male-avatar/front/obliques'
import PecsMale from '@/app/images/male-avatar/front/pecs'
import QuadsMale from '@/app/images/male-avatar/front/quads'
import TrapsMale from '@/app/images/male-avatar/front/traps'
import { useEffect, useState } from 'react'
import ExerciseDescription from '@/app/ui/ExerciseDescription'
import { get } from 'lodash-es'
import { maleAvatarFrontPositions } from '@/app/components/dashboard/dashboard-helpers'
import classes from './MaleAvatarFront.module.css'

export default function MaleAvatarFront({ colors } : AvatarColorsFront) {
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
      text: maleAvatarFrontPositions[bodyPart]?.text,
      position: maleAvatarFrontPositions[bodyPart]?.position,
      name: maleAvatarFrontPositions[bodyPart]?.name
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
      <HipAbductorsMale className="absolute top-[12.5em] left-[.30em]" fill={fillColors.quads} />
      <QuadsMale className="absolute top-[12.7em] -left-[1.4em]" fill={fillColors.quads} />
      <CalvesMale className="absolute top-[20.75em] -left-[1.9em]" fill={fillColors.calves} />
      <ObliquesMale className="absolute top-[7.2em] -left-[.9em]" fill={fillColors.obliques} />
      <TrapsMale className="absolute top-[3.3em] -left-[.6em]" fill={fillColors.traps} />
      <ForearmsMale className="absolute top-[9.4em] -left-[4.7em]" fill={fillColors.forearms} />
      <BicepsMale className="absolute top-[7em] -left-[3em]" fill={fillColors.biceps} />
      <AbsMale className="absolute top-[6.6em] left-[.1em]" fill={fillColors.abs} />
      <NeckSternumMale className="absolute top-[2.9em] -left-[.35em]" fill={fillColors.neck} />
      <PecsMale className="absolute top-[5.4em] -left-[1.4em]" fill={fillColors.pecs} />
      <HeadMale className="absolute -top-[.3em] left-2" fill={fillColors.head} />
      <DeltsMale className="absolute top-[5em] -left-[2.6em]" fill={fillColors.delts} />
      <HandsMale className="absolute top-[14em] -left-[4.2em]" fill={fillColors.hands} />

      {/*hover-over areas*/}
      <div className="w-[3em] h-[1.5em] absolute top-[4em] -left-[.6em]" data-name="traps" onMouseEnter={hoverOverDescription}></div>
      <div className={`${classes.shoulderLeft} w-[4.8em] h-[2.7em] absolute top-[5.2em] -left-[4.4em]`} data-name="delts" onMouseEnter={hoverOverDescription}></div>
      <div className={`${classes.shoulderRight} w-[4.8em] h-[2.7em] absolute top-[5.2em] left-[4em]`} data-name="delts" onMouseEnter={hoverOverDescription}></div>
      <div className="w-[5.2em] h-[2.3em] absolute top-[5.8em] -left-[.6em]" data-name="pecs" onMouseEnter={hoverOverDescription}></div>
      <div className="w-[2em] h-[3.2em] absolute top-[7.5em] -left-[3em]" data-name="biceps" onMouseEnter={hoverOverDescription}></div>
      <div className="w-[2em] h-[3.2em] absolute top-[7.5em] left-[5.4em]" data-name="biceps" onMouseEnter={hoverOverDescription}></div>
      <div className="w-[2em] h-[3.8em] absolute top-[10.5em] -left-[3.3em]" data-name="forearms" onMouseEnter={hoverOverDescription}></div>
      <div className="w-[2em] h-[4.1em] absolute top-[10.5em] left-[6.1em]" data-name="forearms" onMouseEnter={hoverOverDescription}></div>
      <div className="w-[3.3em] h-[6.5em] absolute top-[8.2em] left-[.5em]" data-name="abs" onMouseEnter={hoverOverDescription}></div>
      <div className="w-[1.5em] h-[5em] absolute top-[8.2em] -left-[1em]" data-name="obliques" onMouseEnter={hoverOverDescription}></div>
      <div className="w-[1.5em] h-[5em] absolute top-[8.2em] left-[3.7em]" data-name="obliques" onMouseEnter={hoverOverDescription}></div>
      <div className="w-[2em] h-[8em] absolute top-[14em] -left-[1.5em]" data-name="quads" onMouseEnter={hoverOverDescription}></div>
      <div className="w-[1.5em] h-[6.3em] absolute top-[15.7em] left-[.5em]" data-name="quads" onMouseEnter={hoverOverDescription}></div>
      <div className="w-[2em] h-[8em] absolute top-[14em] left-[3.8em]" data-name="quads" onMouseEnter={hoverOverDescription}></div>
      <div className="w-[2.5em] h-[6.3em] absolute top-[22em] -left-[1.2em]" data-name="calves" onMouseEnter={hoverOverDescription}></div>
      <div className="w-[2.5em] h-[6.3em] absolute top-[22em] left-[3.5em]" data-name="calves" onMouseEnter={hoverOverDescription}></div>
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