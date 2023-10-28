'use client'

import Image from 'next/image'
import { AvatarColorsRear } from '@/common/frontend-types'
import CalvesMaleRear from '@/app/images/male-avatar/rear/calves'
import DeltsMaleRear from '@/app/images/male-avatar/rear/delts'
import ForearmsMaleRear from '@/app/images/male-avatar/rear/forearms'
import GlutesMale from '@/app/images/male-avatar/rear/glutes'
import HipAdductorsMaleRear from '@/app/images/male-avatar/rear/hip-adductors'
import LatsMaleRear from '@/app/images/male-avatar/rear/lats'
import ObliquesMaleRear from '@/app/images/male-avatar/rear/obliques'
import QuadsMaleRear from '@/app/images/male-avatar/rear/quads'
import RotatorCuffMaleRear from '@/app/images/male-avatar/rear/rotator-cuff'
import TrapsMaleRear from '@/app/images/male-avatar/rear/traps'
import SpinalErectorsMale from '@/app/images/male-avatar/rear/spinal-erectors'
import HamstringsMale from '@/app/images/male-avatar/rear/hamstrings'
import TricepsMale from '@/app/images/male-avatar/rear/triceps'
import ExerciseDescription from '@/app/ui/ExerciseDescription'
import { useEffect, useState } from 'react'
import { get } from 'lodash-es'
import { maleAvatarRearPositions } from '@/app/components/dashboard/dashboard-helpers'
import classes from '@/app/components/dashboard/MaleAvatarRear.module.css'
import HeadMaleRear from '@/app/images/male-avatar/rear/head'
import HandsMaleRear from '@/app/images/male-avatar/rear/hands'
import RhomboidsMale from '@/app/images/male-avatar/rear/rhomboids'

export default function MaleAvatarRear({ colors }: AvatarColorsRear) {
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
      text: maleAvatarRearPositions[bodyPart]?.text,
      position: maleAvatarRearPositions[bodyPart]?.position,
      name: maleAvatarRearPositions[bodyPart]?.name
    }
    setDescription(obj)
    for (const key in fillColors) {
      newFillColors[key] = DARK_GREY
    }
    newFillColors[bodyPart] = colors[bodyPart as keyof AvatarColorsRear['colors']]
    setShowDescription(true)
    setFillColors(newFillColors)
  }

  function handleLeave() {
    setShowDescription(false)
  }

  function resetAvatar() {
    const newFillColors: any = {}
    for (const key in colors) {
      newFillColors[key] = colors[key as keyof AvatarColorsRear['colors']]
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
      <CalvesMaleRear className="absolute top-[21.5em] -left-[1.2em]" fill={fillColors.calves} />
      <HipAdductorsMaleRear className="absolute top-[16.3em] left-[2.9em]" fill={fillColors.adductors} />
      <HamstringsMale className="absolute top-[17em] left-[.8em]" fill={fillColors.hamstrings} />
      <GlutesMale className="absolute top-[14.7em] left-[1.3em]" fill={fillColors.glutes} />
      <QuadsMaleRear className="absolute top-[15.3em] left-[.85em]" fill={fillColors.glutes} />
      <ObliquesMaleRear className="absolute top-[11em] left-[1.4em]" fill={fillColors.obliques} />
      <HandsMaleRear alt="" className="absolute top-[16.1em] -left-[.8em]" fill={fillColors.hands} />
      <ForearmsMaleRear className="absolute top-[11.2em] -left-[1em]" fill={fillColors.forearms}  />
      <TricepsMale className="absolute top-[8.8em] -left-[.8em]" fill={fillColors.triceps} />
      <LatsMaleRear className="absolute top-[9.2em] left-[1em]" fill={fillColors.lats} />
      <RotatorCuffMaleRear className="absolute top-[7.7em] left-[.9em]" fill={fillColors.lats}  />
      <SpinalErectorsMale className="absolute top-[11.4em] left-[2.4em]" fill={fillColors.erectors}  />
      <RhomboidsMale className="absolute top-[5.0em] left-[1.1em]" fill={fillColors.rhomboids}  />
      <TrapsMaleRear className="absolute top-[4.9em] left-[.6em]" fill={fillColors.traps} />
      <HeadMaleRear className="absolute top-[1em] left-11" fill={fillColors.head} />
      <DeltsMaleRear className="absolute top-[6em] -left-[.5em]" fill={fillColors.delts} />

      {/*hover-over areas*/}
      <div className="w-[4.3em] h-[1.5em] absolute top-[5.5em] left-[2.0em]" data-name="traps" onMouseEnter={hoverOverDescription}></div>
      <div className={`${classes.rhomboids} w-[5.4em] h-[7em] absolute top-[4.9em] left-[1.6em]`} data-name="rhomboids" onMouseEnter={hoverOverDescription}></div>
      <div className={`${classes.erectorsBottom} w-[5.8em] h-[7em] absolute top-[11.1em] left-[1.5em]`} data-name="erectors" onMouseEnter={hoverOverDescription}></div>
      <div className={`${classes.shoulderLeft} w-[6.2em] h-[4.3em] absolute top-[5.5em] -left-[1.3em]`} data-name="delts" onMouseEnter={hoverOverDescription}></div>
      <div className={`${classes.shoulderRight} w-[6.5em] h-[4.5em] absolute top-[5.3em] left-[6em]`} data-name="delts" onMouseEnter={hoverOverDescription}></div>
      <div className={`${classes.rotatorCuffLeft} w-[5.2em] h-[2.5em] absolute top-[8em] left-[.6em]`} data-name="lats" onMouseEnter={hoverOverDescription}></div>
      <div className={`${classes.rotatorCuffRight} w-[5.4em] h-[2.6em] absolute top-[7.9em] left-[2.8em]`} data-name="lats" onMouseEnter={hoverOverDescription}></div>
      <div className={`${classes.latLeft} w-[5.6em] h-[6em] absolute top-[8.4em] -left-[.1em]`} data-name="lats" onMouseEnter={hoverOverDescription}></div>
      <div className={`${classes.latRight} w-[5.6em] h-[6em] absolute top-[8.4em] left-[3.2em]`} data-name="lats" onMouseEnter={hoverOverDescription}></div>
      <div className="w-[2em] h-[3.2em] absolute top-[9.5em] -left-[.8em]" data-name="triceps" onMouseEnter={hoverOverDescription}></div>
      <div className="w-[2em] h-[3.2em] absolute top-[9.5em] left-[7.3em]" data-name="triceps" onMouseEnter={hoverOverDescription}></div>
      <div className="w-[2em] h-[4.3em] absolute top-[12.5em] -left-[1em]" data-name="forearms" onMouseEnter={hoverOverDescription}></div>
      <div className="w-[2em] h-[4.1em] absolute top-[12.5em] left-[7.9em]" data-name="forearms" onMouseEnter={hoverOverDescription}></div>
      <div className={`${classes.obliquesLeft} w-[4.7em] h-[5.1em] absolute top-[12em] -left-[.2em]`} data-name="obliques" onMouseEnter={hoverOverDescription}></div>
      <div className={`${classes.obliquesRight} w-[5em] h-[5.1em] absolute top-[12em] left-[5.5em]`} data-name="obliques" onMouseEnter={hoverOverDescription}></div>
      <div className={`${classes.glutesLeft} w-[5.1em] h-[5.1em] absolute top-[14.7em] left-[.8em]`} data-name="glutes" onMouseEnter={hoverOverDescription}></div>
      <div className={`${classes.glutesRight} w-[5.4em] h-[5.1em] absolute top-[14.7em] left-[3.7em]`} data-name="glutes" onMouseEnter={hoverOverDescription}></div>
      <div className={`${classes.quadsLeft} w-[6.5em] h-[7.4em] absolute top-[14.5em] -left-[1.6em]`} data-name="glues" onMouseEnter={hoverOverDescription}></div>
      <div className={`${classes.quadsRight} w-[6.5em] h-[7.4em] absolute top-[14.7em] left-[3.5em]`} data-name="glutes" onMouseEnter={hoverOverDescription}></div>
      <div className={`${classes.hamstringsLeft} w-[6.5em] h-[7.4em] absolute top-[16.8em] -left-[.4em]`} data-name="hamstrings" onMouseEnter={hoverOverDescription}></div>
      <div className={`${classes.hamstringsRight} w-[6.5em] h-[7.4em] absolute top-[17.0em] left-[2.2em]`} data-name="hamstrings" onMouseEnter={hoverOverDescription}></div>
      <div className={`${classes.adductors} w-[6.5em] h-[7.4em] absolute top-[16.4em] left-[1em]`} data-name="adductors" onMouseEnter={hoverOverDescription}></div>
      <div className={`${classes.calvesLeft} w-[6em] h-[11em] absolute top-[22em] -left-[1.2em]`} data-name="calves" onMouseEnter={hoverOverDescription}></div>
      <div className={`${classes.calvesRight} w-[6em] h-[11em] absolute top-[22em] left-[3.7em]`} data-name="calves" onMouseEnter={hoverOverDescription}></div>
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