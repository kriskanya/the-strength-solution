import CustomCheckbox from '@/app/ui/CustomCheckbox'
import { UserSavedExercise } from '@/common/shared-types-and-constants'
import { ChangeEvent, useContext } from 'react'
import { cloneDeep, get, isArray, isEmpty, isUndefined, set } from 'lodash-es'
import { ActiveExercisesContext } from '@/app/store/exercises-context'
import { MEASUREMENT_DISPLAY_VALUE, MEASUREMENT_DISPLAY_VALUES } from '@/app/components/dashboard/dashboard-helpers-and-constants'

export default function UpdateStatusSelectExercises() {
  const { activeExercises,  setActiveExercises} = useContext(ActiveExercisesContext)

  const checkboxHandler = (event: ChangeEvent<HTMLInputElement>) => {
    let updatedExercises = cloneDeep(activeExercises)
    const checked = get(event, 'target.checked')
    const exerciseName = get(event, 'target.name')

    if (!updatedExercises) {
      console.log('issue with fetching data in Select Exercises component')
      return
    }

    updatedExercises = updatedExercises.map((e: UserSavedExercise) => {
      if (e.exercise.exerciseName === exerciseName) {
        e.active = checked
      }
      return e
    })

    setActiveExercises(updatedExercises)
  }

  const inputHandler = (event: ChangeEvent<HTMLInputElement>) => {
    let updatedExercises = cloneDeep(activeExercises)
    const exerciseName = get(event, 'target.name')
    let inputValue = get(event, 'target.value')

    if (!updatedExercises || (isArray(updatedExercises) && updatedExercises.length === 0)) {
      console.log(`Issue with saving reps in UpdateStatusSelectExercises; inputValue: ${inputValue}, updatedExercises: ${JSON.stringify(updatedExercises)}`)
      return
    }

    const currentExercise = updatedExercises.find(e => e.exercise.exerciseName === exerciseName)

    if (!isUndefined(currentExercise) && !isEmpty(currentExercise)) {
      inputValue = inputValue.replace(/\D/g,'')
      set(currentExercise, 'loggedExercise.quantity', +inputValue)
      setActiveExercises(updatedExercises)
    }
  }

  return (
    <div>
      <div className={`h-4/6 mx-auto relative`}>
        <div className="flex justify-center flex-wrap gap-5 mt-10">
          {
            activeExercises && activeExercises.map(({ exercise, loggedExercise, active }) => {
              return (
                <CustomCheckbox
                  isChecked={active}
                  showInputBox={true}
                  inputBoxLabel={MEASUREMENT_DISPLAY_VALUES[exercise.unitOfMeasurement] as MEASUREMENT_DISPLAY_VALUE}
                  quantity={loggedExercise?.quantity}
                  checkboxHandler={checkboxHandler}
                  inputHandler={inputHandler}
                  label={exercise.displayName}
                  name={exercise.exerciseName}
                  id={exercise.id+''}
                  key={exercise.id}
                />
              )
            })
          }
        </div>
      </div>
    </div>
  )
}