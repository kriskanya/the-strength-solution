import classes from './ExerciseDescription.module.css'
import { capitalize } from 'lodash-es'
import { useContext, useEffect, useState } from 'react'
import { ActiveExercisesContext } from '@/app/store/exercises-context'
import { EXERCISE_ENUM_VALUE, UserSavedExercise } from '@/common/shared-types'

interface Props {
  description: string,
  bodyPart: string,
  name: string,
  exerciseName: EXERCISE_ENUM_VALUE
}

// need to call useState instead of using props here
export default function ExerciseDescription({ bodyPart, description, name, exerciseName }: Props) {
  const { activeExercises} = useContext(ActiveExercisesContext)
  const [activeExercise, setActiveExercise] = useState<UserSavedExercise>()

  const getActiveExercise = () => {
    setActiveExercise(undefined)
    if (!activeExercises) return

    const activeExercise = activeExercises.find(ex => {
      return ex?.exercise?.exerciseName === exerciseName
    })

    if (activeExercise) setActiveExercise(activeExercise)
  }

  return (
    <div className="" onMouseEnter={getActiveExercise}>
      <div className={`w-[333px] h-[159px] opacity-90 rounded-lg ${classes.container} pl-8 pr-3 pt-3`}>
        <h2 className="inter font-semibold text-base text-white">{ name }</h2>
        <p className="inter font-normal text-xs leading-4 text-white opacity-70 mt-1">
          {description}
        </p>
        <hr className="mb-1 mt-3" />
        <p>
          <span className="inter font-normal text-xs uppercase text-white opacity-30">Reps:</span>
          <span className="inter font-normal text-xs text-white ml-[1.1em]">{activeExercise?.loggedExercise?.reps}</span>
        </p>
        <p className="-mt-1">
          <span className="inter font-normal text-xs uppercase text-white opacity-30">Level:</span>
          <span className="inter font-normal text-xs uppercase text-white ml-2">{activeExercise?.loggedExercise?.level}</span>
        </p>
      </div>
    </div>
  )
}