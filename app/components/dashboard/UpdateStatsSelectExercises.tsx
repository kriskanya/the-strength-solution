import CustomCheckbox from '@/app/ui/CustomCheckbox'
import { FlattenedChosenExercise } from '@/common/shared-types'
import { ChangeEvent } from 'react'
import { cloneDeep, get, toInteger } from 'lodash-es'

interface Props {
  exercises: FlattenedChosenExercise[] | undefined,
  setExercises: (updatedExercises: FlattenedChosenExercise[]) => void,
  reps: any,
  setReps: any
}

export default function UpdateStatusSelectExercises({ exercises, setExercises, reps, setReps }: Props) {
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
    let updatedReps = cloneDeep(reps)
    const exerciseName = get(event, 'target.name')
    const inputValue = get(event, 'target.value')
    const exerciseId = get(event, `target.attributes['data-exercise_id'].value`)

    if (!inputValue || !exerciseId) {
      console.log(`Issue with saving reps in UpdateStatusSelectExercises: inputValue is ${inputValue} and exerciseId is ${exerciseId}`)
      return
    }

    const current = { [exerciseName]: { reps: +inputValue, exerciseId: toInteger(exerciseId) } }
    updatedReps = { ...updatedReps, ...current }

    console.log('updated reps', updatedReps)

    setReps(updatedReps)
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