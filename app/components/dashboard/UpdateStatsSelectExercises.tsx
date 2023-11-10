import CustomCheckbox from '@/app/ui/CustomCheckbox'
import { FlattenedChosenExercise } from '@/common/shared-types'
import { ChangeEvent } from 'react'
import { cloneDeep, get } from 'lodash-es'

interface Props {
  exercises: FlattenedChosenExercise[] | undefined,
  setExercises: (updatedExercises: FlattenedChosenExercise[]) => void
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

  return (
    <div className={``}>
      <div className={`h-4/6 mx-auto relative`}>
        <div className="flex justify-center flex-wrap gap-5 mt-10">
          {
            exercises && exercises.map(({ displayName, exerciseName,  active }, i) => {
              return (
                <CustomCheckbox
                  isChecked={active}
                  checkboxHandler={checkboxHandler}
                  label={displayName}
                  name={exerciseName}
                  id={i+''}
                  key={i}
                />
              )
            })
          }
        </div>
      </div>
    </div>
  )
}