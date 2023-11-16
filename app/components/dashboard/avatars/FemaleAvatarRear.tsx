'use client'

import Image from 'next/image'
import { AvatarColorsRear } from '@/common/frontend-types'
import TrapsFemaleRear from '@/app/images/female-avatar/rear/traps'
import DeltsFemaleRear from '@/app/images/female-avatar/rear/delts'
import RhomboidsFemale from '@/app/images/female-avatar/rear/rhomboids'
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
import classes from './FemaleAvatarRear.module.css'
import { useEffect, useState } from 'react'
import { get } from 'lodash-es'
import { femaleAvatarRearPositions } from '@/app/components/dashboard/dashboard-helpers'
import ExerciseDescription from '@/app/ui/ExerciseDescription'
import HeadFemaleRear from '@/app/images/female-avatar/rear/head'
import HandsFemaleRear from '@/app/images/female-avatar/rear/hands'
import SpinalErectorsFemale from '@/app/images/female-avatar/rear/spinal-erectors'

export default function FemaleAvatarRear({ colors }: AvatarColorsRear) {
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
      text: femaleAvatarRearPositions[bodyPart]?.text,
      position: femaleAvatarRearPositions[bodyPart]?.position,
      name: femaleAvatarRearPositions[bodyPart]?.name
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
      <CalvesFemaleRear className="absolute top-[22.7em] -left-[.1em]" fill={fillColors.calves} />
      <QuadsFemaleRear className="absolute top-[17.4em] -left-[.1em]" fill={fillColors.hamstrings} />
      <HamstringsFemale className="absolute top-[19.3em] left-[.6em]" fill={fillColors.hamstrings} />
      <HipAdductorsFemale className="absolute top-[18.5em] left-[1.5em]" fill={fillColors.adductors} />
      <ObliquesFemaleRear className="absolute top-[13.8em] left-[.5em]" fill={fillColors.obliques} />
      <GlutesFemale className="absolute top-[15.2em] left-[0em]" fill={fillColors.glutes} />
      <SpinalErectorsFemale className="absolute top-[12em] left-[1.5em]" fill={fillColors.erectors} />
      <TrapsFemaleRear className="absolute top-[5.0em] left-[.5em]" fill={fillColors.traps} />
      <HeadFemaleRear className="absolute top-[.9em] left-3" fill={fillColors.head} />
      <LatsFemale className="absolute top-[9.9em] left-[.72em]" fill={fillColors.lats} />
      <RotatorCuffFemale className="absolute top-[7.5em] left-[.3em]" fill={fillColors.lats}  />
      <HandsFemaleRear className="absolute top-[16.1em] -left-[2.3em]" fill={fillColors.hands}  />
      <ForearmsFemaleRear className="absolute top-[11.2em] -left-[2.7em]" fill={fillColors.forearms}  />
      <TricepsFemale className="absolute top-[8.75em] -left-[1.25em]" fill={fillColors.triceps} />
      <DeltsFemaleRear className="absolute top-[6.8em] -left-[1em]" fill={fillColors.delts} />
      <RhomboidsFemale className="absolute top-[5.9em] left-4" fill={fillColors.rhomboids}  />

      {/*hover-over areas*/}
      <div className="w-[4.3em] h-[1.5em] absolute top-[5.5em] left-[1.2em]" data-name="traps" onMouseEnter={hoverOverDescription}></div>
      <div className={`${classes.rhomboids} w-[8.1em] h-[7em] absolute top-[5.9em] -left-[.9em]`} data-name="rhomboids" onMouseEnter={hoverOverDescription}></div>
      <div className={`${classes.erectors} w-[5.8em] h-[7em] absolute top-[11.1em] left-[.5em]`} data-name="erectors" onMouseEnter={hoverOverDescription}></div>
      <div className={`${classes.shoulderLeft} w-[5em] h-[4em] absolute top-[6.5em] -left-[1.8em]`} data-name="delts" onMouseEnter={hoverOverDescription}></div>
      <div className={`${classes.shoulderRight} w-[6.5em] h-[4.5em] absolute top-[6.5em] left-[3em]`} data-name="delts" onMouseEnter={hoverOverDescription}></div>
      <div className={`${classes.rotatorCuffLeft} w-[4em] h-[3.3em] absolute top-[7.4em] -left-[0.8em]`} data-name="lats" onMouseEnter={hoverOverDescription}></div>
      <div className={`${classes.rotatorCuffRight} w-[5.4em] h-[3.4em] absolute top-[7.5em] left-[2.8em]`} data-name="lats" onMouseEnter={hoverOverDescription}></div>
      <div className={`${classes.latLeft} w-[5.9em] h-[6.8em] absolute top-[9.3em] -left-[1.1em]`} data-name="lats" onMouseEnter={hoverOverDescription}></div>
      <div className={`${classes.latRight} w-[5.6em] h-[6.5em] absolute top-[8.7em] left-[2.1em]`} data-name="lats" onMouseEnter={hoverOverDescription}></div>
      <div className="w-[2em] h-[3.2em] absolute top-[9.2em] -left-[1.5em]" data-name="triceps" onMouseEnter={hoverOverDescription}></div>
      <div className="w-[2em] h-[3.2em] absolute top-[9.2em] left-[6.0em]" data-name="triceps" onMouseEnter={hoverOverDescription}></div>
      <div className="w-[2em] h-[4.3em] absolute top-[12.5em] -left-[1.9em]" data-name="forearms" onMouseEnter={hoverOverDescription}></div>
      <div className="w-[2em] h-[4.1em] absolute top-[12.5em] left-[6.5em]" data-name="forearms" onMouseEnter={hoverOverDescription}></div>
      <div className={`${classes.obliquesLeft} w-[2.5em] h-[3em] absolute top-[13.2em] left-[.3em]`} data-name="obliques" onMouseEnter={hoverOverDescription}></div>
      <div className={`${classes.obliquesRight} w-[2.0em] h-[2.9em] absolute top-[13.3em] left-[4.5em]`} data-name="obliques" onMouseEnter={hoverOverDescription}></div>
      <div className={`${classes.glutesLeft} w-[4.8em] h-[5.1em] absolute top-[14.7em] -left-[.2em]`} data-name="glutes" onMouseEnter={hoverOverDescription}></div>
      <div className={`${classes.glutesRight} w-[5.4em]  h-[5.1em] absolute top-[14.7em] left-[2.9em]`} data-name="glutes" onMouseEnter={hoverOverDescription}></div>
      <div className={`${classes.hamstringsTopLeft} w-[5.5em] h-[9em] absolute top-[15.5em] -left-[1.2em]`} data-name="hamstrings" onMouseEnter={hoverOverDescription}></div>
      <div className={`${classes.hamstringsTopRight} w-[6.5em] h-[7.9em] absolute top-[16.4em] left-[3em]`} data-name="hamstrings" onMouseEnter={hoverOverDescription}></div>
      <div className={`${classes.hamstringsLeft} w-[4.8em] h-[7.1em] absolute top-[19.1em] -left-[.9em]`} data-name="hamstrings" onMouseEnter={hoverOverDescription}></div>
      <div className={`${classes.hamstringsRight} w-[5em] h-[7.1em] absolute top-[19.3em] left-[2.5em]`} data-name="hamstrings" onMouseEnter={hoverOverDescription}></div>
      <div className={`${classes.adductors} w-[6.5em] h-[7.4em] absolute top-[17.3em] left-[0em]`} data-name="adductors" onMouseEnter={hoverOverDescription}></div>
      <div className={`${classes.calvesLeft} w-[6.4em] h-[11em] absolute top-[21.9em] -left-[1.4em]`} data-name="calves" onMouseEnter={hoverOverDescription}></div>
      <div className={`${classes.calvesRight} w-[6em] h-[11em] absolute top-[22.2em] left-[2.8em]`} data-name="calves" onMouseEnter={hoverOverDescription}></div>
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