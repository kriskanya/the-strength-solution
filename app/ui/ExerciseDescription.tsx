import classes from './ExerciseDescription.module.css'
import { UserSavedExercise } from '@/common/shared-types'

interface Props {
  hoveredExercise: UserSavedExercise | undefined,
  bodyPartDisplayName: string
}

export default function ExerciseDescription({ hoveredExercise, bodyPartDisplayName }: Props) {
  return (
    <div>
      <div className={`w-[333px] h-[159px] opacity-90 rounded-lg ${classes.container} pl-8 pr-3 pt-3`}>
        <h2 className="inter font-semibold text-base text-white">{bodyPartDisplayName}</h2>
        <p className="inter font-normal text-xs leading-4 text-white opacity-70 mt-1">
          {hoveredExercise?.exercise?.description}
        </p>
        <hr className="mb-1 mt-3" />
        <p>
          <span className="inter font-normal text-xs uppercase text-white opacity-30">Reps:</span>
          <span className="inter font-normal text-xs text-white ml-[1.1em]">{hoveredExercise?.loggedExercise?.reps}</span>
        </p>
        <p className="-mt-1">
          <span className="inter font-normal text-xs uppercase text-white opacity-30">Level:</span>
          <span className="inter font-normal text-xs uppercase text-white ml-2">{hoveredExercise?.loggedExercise?.level}</span>
        </p>
      </div>
    </div>
  )
}