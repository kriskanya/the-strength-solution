'use client'
import CalvesFemale from '@/app/images/female-avatar/front/calves'
import AbsFemale from '@/app/images/female-avatar/front/abs'
import BicepsFemale from '@/app/images/female-avatar/front/biceps'
import DeltsFemale from '@/app/images/female-avatar/front/delts'
import ForearmsFemale from '@/app/images/female-avatar/front/forearms'
import ObliquesFemale from '@/app/images/female-avatar/front/obliques'
import PecsFemale from '@/app/images/female-avatar/front/pecs'
import QuadsFemale from '@/app/images/female-avatar/front/quads'
import TrapsFemale from '@/app/images/female-avatar/front/traps'
import { AvatarColorsFront, AvatarColorsRear } from '@/common/frontend-types-and-constants'
import { useContext, useEffect, useState } from 'react'
import { get } from 'lodash-es'
import classes from '@/app/components/dashboard/avatars/FemaleAvatarFront.module.css'
import ExerciseDescription from '@/app/ui/ExerciseDescription'
import NeckSternumFemale from '@/app/images/female-avatar/front/neck-sternum'
import HeadFemale from '@/app/images/female-avatar/front/head'
import HairFemale from '@/app/images/female-avatar/front/hair'
import HandsFemale from '@/app/images/female-avatar/front/hands'
import {
  femaleAvatarPositions,
  getActiveExercise,
  getMuscleGroupInfo,
  resetAvatar
} from '@/app/components/dashboard/dashboard-helpers'
import { EXERCISE_ENUM_VALUE, UserSavedExercise } from '@/common/shared-types'
import { ActiveExercisesContext } from '@/app/store/exercises-context'

interface Props {
  fillColors: AvatarColorsFront['colors'] & AvatarColorsRear['colors']
  originalFillColors: AvatarColorsFront['colors'] & AvatarColorsRear['colors']
  setFillColors: (input: AvatarColorsFront['colors'] & AvatarColorsRear['colors']) => void
}

export default function FemaleAvatarFront({ fillColors, setFillColors, originalFillColors }: Props) {
  const [description, setDescription] = useState({
    bodyPart: '',
    text: '',
    position: '',
    name: '',
    exerciseName: '' as EXERCISE_ENUM_VALUE
  })
  const [showDescription, setShowDescription] = useState(false)
  const { activeExercises} = useContext(ActiveExercisesContext)
  const [activeExercise, setActiveExercise] = useState<UserSavedExercise>()

  function hoverOverDescription(event: any) {
    const bodyPart = get(event, 'target.dataset.name')

    if (!bodyPart) return

    getActiveExercise(bodyPart, setActiveExercise, activeExercises, femaleAvatarPositions)
    getMuscleGroupInfo(bodyPart, setDescription, fillColors, originalFillColors, setShowDescription, setFillColors, femaleAvatarPositions)
  }

  function handleLeave() {
    setShowDescription(false)
  }

  // listener for resetting the avatar if user's mouse leaves the area
  useEffect(() => {
    // only add the event listener when the description is shown
    if (showDescription) return;
    resetAvatar(originalFillColors, setFillColors)
  }, [showDescription]);
  
  return (
    <div className="relative" onMouseLeave={handleLeave}>
      <CalvesFemale className="absolute top-[19em] -left-[2em]" fill={fillColors.calvesFront} />
      <QuadsFemale className="absolute top-[13.3em] -left-[1.1em]" fill={fillColors.quads} />
      <ObliquesFemale className="absolute top-[3.5em] -left-[.9em]" fill={fillColors.obliquesFront} />
      <HairFemale className="absolute" fill={fillColors.hair} />
      <TrapsFemale className="absolute top-14 -left-[.55em]" fill={fillColors.trapsFront} />
      <AbsFemale className="absolute top-[8.1em] left-[.6em]" fill={fillColors.absFront} />
      <PecsFemale className="absolute top-[5.2em] -left-[1.3em]" fill={fillColors.pecs} />
      <NeckSternumFemale className="absolute top-[3.1em] -left-[.35em]" fill={fillColors.neck} />
      <HeadFemale className="absolute top-5 left-3" fill={fillColors.head} />
      <DeltsFemale className="absolute top-[5.1em] -left-[2.2em]" fill={fillColors.deltsFront} />
      <ForearmsFemale className="absolute top-[9.4em] -left-[4em]" fill={fillColors.forearmsFront} />
      <BicepsFemale className="absolute top-[7em] -left-[2.45em]" fill={fillColors.biceps} />
      <HandsFemale className="absolute top-[13.9em] -left-[5em]" fill={fillColors.hands} />

      {/*hover-over areas*/}
      <div className="w-[3em] h-[1.5em] absolute top-[4em] left-[.5em]" data-name="trapsFront" onMouseEnter={hoverOverDescription}></div>
      <div className={`${classes.shoulderLeft} w-[4.8em] h-[2.7em] absolute top-[5.2em] -left-[4.4em]`} data-name="deltsFront" onMouseEnter={hoverOverDescription}></div>
      <div className={`${classes.shoulderRight} w-[4.8em] h-[2.7em] absolute top-[5.2em] left-[3.9em]`} data-name="deltsFront" onMouseEnter={hoverOverDescription}></div>
      <div className="w-[5.2em] h-[2.3em] absolute top-[5.8em] -left-[.6em]" data-name="pecs" onMouseEnter={hoverOverDescription}></div>
      <div className="w-[2em] h-[2.9em] absolute top-[7.3em] -left-[2.7em]" data-name="biceps" onMouseEnter={hoverOverDescription}></div>
      <div className="w-[2em] h-[2.9em] absolute top-[7.3em] left-[4.5em]" data-name="biceps" onMouseEnter={hoverOverDescription}></div>
      <div className="w-[2em] h-[3.8em] absolute top-[10.3em] -left-[3.7em]" data-name="forearmsFront" onMouseEnter={hoverOverDescription}></div>
      <div className="w-[2em] h-[4.1em] absolute top-[10.3em] left-[5.7em]" data-name="forearmsFront" onMouseEnter={hoverOverDescription}></div>
      <div className="w-[3.1em] h-[6.5em] absolute top-[8.2em] left-[.5em]" data-name="absFront" onMouseEnter={hoverOverDescription}></div>
      <div className="w-[1.5em] h-[5.5em] absolute top-[8.2em] -left-[1em]" data-name="obliquesFront" onMouseEnter={hoverOverDescription}></div>
      <div className="w-[1.3em] h-[5.5em] absolute top-[8.2em] left-[3.5em]" data-name="obliquesFront" onMouseEnter={hoverOverDescription}></div>
      <div className={`${classes.quadLeft} w-[6.9em] h-[11em] absolute top-[12em] -left-[2.8em]`} data-name="quads" onMouseEnter={hoverOverDescription}></div>
      <div className={`${classes.quadRight} w-[6.9em] h-[11em] absolute top-[11.9em] left-[.2em]`} data-name="quads" onMouseEnter={hoverOverDescription}></div>
      <div className={`${classes.calvesLeft} w-[8em] h-[12em] absolute top-[18.5em] -left-[3.9em]`} data-name="calvesFront" onMouseEnter={hoverOverDescription}></div>
      <div className={`${classes.calvesRight} w-[8em] h-[12em] absolute top-[17.5em] left-[.5em]`} data-name="calvesFront" onMouseEnter={hoverOverDescription}></div>
      {
        showDescription
          ? (
            <div className={`absolute ${ description?.position } z-10`}>
              <ExerciseDescription hoveredExercise={activeExercise} bodyPart={description?.bodyPart} bodyPartDisplayName={description?.name} />
            </div>
          )
          : ''
      }
    </div>
  )
}