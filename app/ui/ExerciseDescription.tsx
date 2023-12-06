import classes from './ExerciseDescription.module.css'
import { UserSavedExercise } from '@/common/shared-types-and-constants'
import { MUSCLE_PROFICIENCIES } from '@/common/frontend-types-and-constants'
import { get } from 'lodash-es'

interface Props {
  hoveredExercise: UserSavedExercise | undefined,
  bodyPart: string,
  bodyPartDisplayName: string
}

export default function ExerciseDescription({ hoveredExercise, bodyPart, bodyPartDisplayName }: Props) {
  const getDescription = () => {
    return get(MUSCLE_PROFICIENCIES, `[${bodyPart}][${hoveredExercise?.loggedExercise?.level}]`)
  }

  return (
    <div>
      <div className={`w-[333px] h-[190px] rounded-lg ${classes.container} pl-8 pr-3 pt-3`}>
        <h2 className="inter font-semibold text-base text-white">{bodyPartDisplayName}</h2>
        <p className="inter font-normal text-xs leading-4 text-white mt-1">
          {getDescription()}
        </p>
        <hr className="mb-1 mt-3" />
        <p>
          <span className="inter font-normal text-xs uppercase text-white opacity-30">Quantity:</span>
          <span className="inter font-normal text-xs text-white ml-[1.1em]">{hoveredExercise?.loggedExercise?.quantity}</span>
        </p>
        <p className="-mt-1">
          <span className="inter font-normal text-xs uppercase text-white opacity-30">Level:</span>
          <span className="inter font-normal text-xs uppercase text-white ml-2">{hoveredExercise?.loggedExercise?.level}</span>
        </p>
      </div>
    </div>
  )
}