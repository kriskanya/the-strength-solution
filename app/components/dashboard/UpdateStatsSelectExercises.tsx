import CustomCheckbox from '@/app/ui/CustomCheckbox'
import { ExercisesPerformedPayload, FlattenedChosenExercise } from '@/common/shared-types'
import { ChangeEvent } from 'react'
import { cloneDeep, get, isArray, toInteger } from 'lodash-es'

interface Props {
  exercises: FlattenedChosenExercise[] | undefined,
  setExercises: (updatedExercises: FlattenedChosenExercise[]) => void,
  // reps: ExercisesPerformedPayload | undefined,
  // setReps: (reps: ExercisesPerformedPayload) => void
}

export default function UpdateStatusSelectExercises({ exercises, setExercises }: Props) {
  const checkboxHandler = (event: ChangeEvent<HTMLInputElement>) => {
    let updatedExercises = cloneDeep(exercises)
    const checked = get(event, 'target.checked')
    const exerciseName = get(event, 'target.name')

    if (!updatedExercises) {
      console.log('issue with fetching data in Select Exercises component')
      return
    }

    updatedExercises = updatedExercises.map((e: FlattenedChosenExercise) => {
      if (e.exerciseName === exerciseName) {
        e.active = checked
      }
      return e
    })

    setExercises(updatedExercises)
  }

  const inputHandler = (event: ChangeEvent<HTMLInputElement>) => {
    let updatedExercises = cloneDeep(exercises)
    const exerciseName = get(event, 'target.name')
    const inputValue = get(event, 'target.value')

    if (!updatedExercises || (isArray(updatedExercises) && updatedExercises.length === 0) || !inputValue) {
      console.log(`Issue with saving reps in UpdateStatusSelectExercises; inputValue: ${inputValue}, updatedExercises: ${JSON.stringify(updatedExercises)}`)
      return
    }

    const currentExercise = updatedExercises.find(e => e.exerciseName === exerciseName)

    if (currentExercise) {
      currentExercise.reps = +inputValue
      setExercises(updatedExercises)
    }
  }

  return (
    <div>
      <div className={`h-4/6 mx-auto relative`}>
        <div className="flex justify-center flex-wrap gap-5 mt-10">
          {
            exercises && exercises.map(({ displayName, exerciseName,  active, id, reps }) => {
              return (
                <CustomCheckbox
                  isChecked={active}
                  showRepsInput={true}
                  reps={reps}
                  checkboxHandler={checkboxHandler}
                  inputHandler={inputHandler}
                  label={displayName}
                  name={exerciseName}
                  id={id+''}
                  key={id}
                />
              )
            })
          }
        </div>
      </div>
    </div>
  )
}