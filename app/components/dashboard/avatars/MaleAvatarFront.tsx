import { AvatarColorsFront, AvatarColorsRear } from '@/common/frontend-types-and-constants'
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
import { useContext, useEffect, useState } from 'react'
import ExerciseDescription from '@/app/ui/ExerciseDescription'
import { get } from 'lodash-es'
import {
  getActiveExercise,
  getMuscleGroupInfo,
  maleAvatarPositions,
  resetAvatar
} from '@/app/components/dashboard/dashboard-helpers-and-constants'
import classes from './MaleAvatarFront.module.css'
import { EXERCISE_ENUM_VALUE, UserSavedExercise } from '@/common/shared-types-and-constants'
import { ActiveExercisesContext } from '@/app/store/exercises-context'

interface Props {
  fillColors: AvatarColorsFront['colors'] & AvatarColorsRear['colors']
  originalFillColors: AvatarColorsFront['colors'] & AvatarColorsRear['colors']
  setFillColors: (input: AvatarColorsFront['colors'] & AvatarColorsRear['colors']) => void
}

export default function MaleAvatarFront({ fillColors, setFillColors, originalFillColors }: Props) {
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

    getActiveExercise(bodyPart, setActiveExercise, activeExercises, maleAvatarPositions)
    getMuscleGroupInfo(bodyPart, setDescription, fillColors, originalFillColors, setShowDescription, setFillColors, maleAvatarPositions)
  }

  function handleLeave() {
    setShowDescription(false)
  }

  // listener for resetting the avatar if user's mouse leaves the area
  useEffect(() => {
    if (showDescription) return
    resetAvatar(originalFillColors, setFillColors)
  }, [showDescription]);

  return (
    <div className="relative" onMouseLeave={handleLeave}>
      <HipAbductorsMale className="absolute top-[12.5em] left-[.30em]" fill={fillColors.quads} />
      <QuadsMale className="absolute top-[12.7em] -left-[1.4em]" fill={fillColors.quads} />
      <CalvesMale className="absolute top-[20.75em] -left-[1.9em]" fill={fillColors.calvesFront} />
      <ObliquesMale className="absolute top-[7.2em] -left-[.9em]" fill={fillColors.obliquesFront} />
      <TrapsMale className="absolute top-[3.3em] -left-[.6em]" fill={fillColors.trapsFront} />
      <ForearmsMale className="absolute top-[9.4em] -left-[4.7em]" fill={fillColors.forearmsFront} />
      <BicepsMale className="absolute top-[7em] -left-[3em]" fill={fillColors.biceps} />
      <AbsMale className="absolute top-[6.6em] left-[.1em]" fill={fillColors.absFront} />
      <NeckSternumMale className="absolute top-[2.9em] -left-[.35em]" fill={fillColors.neck} />
      <PecsMale className="absolute top-[5.4em] -left-[1.4em]" fill={fillColors.pecs} />
      <HeadMale className="absolute -top-[.3em] left-2" fill={fillColors.head} />
      <DeltsMale className="absolute top-[5em] -left-[2.6em]" fill={fillColors.deltsFront} />
      <HandsMale className="absolute top-[14em] -left-[4.2em]" fill={fillColors.hands} />

      {/*hover-over areas*/}
      <div className="w-[3em] h-[1.5em] absolute top-[4em] -left-[.6em]" data-name="trapsFront" onMouseEnter={hoverOverDescription}></div>
      <div className={`${classes.shoulderLeft} w-[4.8em] h-[2.7em] absolute top-[5.2em] -left-[4.4em]`} data-name="deltsFront" onMouseEnter={hoverOverDescription}></div>
      <div className={`${classes.shoulderRight} w-[4.8em] h-[2.7em] absolute top-[5.2em] left-[4em]`} data-name="deltsFront" onMouseEnter={hoverOverDescription}></div>
      <div className="w-[5.2em] h-[2.3em] absolute top-[5.8em] -left-[.6em]" data-name="pecs" onMouseEnter={hoverOverDescription}></div>
      <div className="w-[2em] h-[3.2em] absolute top-[7.5em] -left-[3em]" data-name="biceps" onMouseEnter={hoverOverDescription}></div>
      <div className="w-[2em] h-[3.2em] absolute top-[7.5em] left-[5.4em]" data-name="biceps" onMouseEnter={hoverOverDescription}></div>
      <div className="w-[2em] h-[3.8em] absolute top-[10.5em] -left-[3.3em]" data-name="forearmsFront" onMouseEnter={hoverOverDescription}></div>
      <div className="w-[2em] h-[4.1em] absolute top-[10.5em] left-[6.1em]" data-name="forearmsFront" onMouseEnter={hoverOverDescription}></div>
      <div className="w-[3.3em] h-[6.5em] absolute top-[8.2em] left-[.5em]" data-name="absFront" onMouseEnter={hoverOverDescription}></div>
      <div className="w-[1.5em] h-[5em] absolute top-[8.2em] -left-[1em]" data-name="obliquesFront" onMouseEnter={hoverOverDescription}></div>
      <div className="w-[1.5em] h-[5em] absolute top-[8.2em] left-[3.7em]" data-name="obliquesFront" onMouseEnter={hoverOverDescription}></div>
      <div className="w-[2em] h-[8em] absolute top-[14em] -left-[1.5em]" data-name="quads" onMouseEnter={hoverOverDescription}></div>
      <div className="w-[1.5em] h-[6.3em] absolute top-[15.7em] left-[.5em]" data-name="quads" onMouseEnter={hoverOverDescription}></div>
      <div className="w-[2em] h-[8em] absolute top-[14em] left-[3.8em]" data-name="quads" onMouseEnter={hoverOverDescription}></div>
      <div className="w-[2.5em] h-[6.3em] absolute top-[22em] -left-[1.2em]" data-name="calvesFront" onMouseEnter={hoverOverDescription}></div>
      <div className="w-[2.5em] h-[6.3em] absolute top-[22em] left-[3.5em]" data-name="calvesFront" onMouseEnter={hoverOverDescription}></div>
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