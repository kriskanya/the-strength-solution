'use client'
import classes from '@/app/components/auth/ChooseExercises.module.css'
import CustomCheckbox from '@/app/ui/CustomCheckbox'
import CustomButton from '@/app/ui/CustomButton'
import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { cloneDeep, get, isArray, toInteger } from 'lodash-es'
import { getSession } from 'next-auth/react'
import { UserSavedExercise } from '@/common/shared-types'
import { Exercise } from '@prisma/client'
import { useRouter } from 'next/navigation'

export default function ChooseExercises() {
  const router = useRouter()
  const [selectedExercises, setSelectedExercises] = useState<UserSavedExercise[]>()

  const fetchExercises = async () => {
    try {
      let res, data: any
      const session = await getSession()
      const profileId =  toInteger(get(session, 'userData.profileId'))
      let chosenWorkoutsData, exercisesData

      if (profileId) {
        const chosenExercisesResponse = await fetch(`/api/exercises/choose/profile/${profileId}`)
        chosenWorkoutsData = await chosenExercisesResponse.json()
      }
      const exercisesResponse = await fetch(`/api/exercises`)
      exercisesData = await exercisesResponse.json()

      if (chosenWorkoutsData && (isArray(chosenWorkoutsData) && chosenWorkoutsData.length)) {
        data = chosenWorkoutsData
      } else if (exercisesData && (isArray(exercisesData) && exercisesData.length)) {
        /* set all new exercises choices to 'active' by default and format them to adhere to
         * UserSavedExercise interface */
        data = exercisesData.map((e: Exercise) => {
          return {
            ...{ exercise: e },
            ...{ active: true }
          }
        }) as UserSavedExercise[]
      }

      if (data && (isArray(data) && data.length)) {
        setSelectedExercises(data)
      }
    } catch (e) {
      console.error('ChooseExercises', e)
    }
  }

  useEffect(() => {
    (async () => {
      await fetchExercises()
    })()
  }, [])

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault()
    const session = await getSession()
    try {
      const body = {
        exercises: selectedExercises,
        profileId: get(session, 'userData.profileId') && toInteger(get(session, 'userData.profileId'))
      }
      const res = await fetch(`/api/exercises/choose`, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json'
        },
      })
      const data = await res.json()

      if (data && (isArray(data) && data.length)) {
        router.push('/dashboard')
      } else {
        console.error('error saving data in choose exercises component', data)
      }
    } catch (e) {
      console.error(e)
    }
  }

  const checkboxHandler = (event: ChangeEvent<HTMLInputElement>) => {
    let updatedExercises = cloneDeep(selectedExercises)
    const checked = get(event, 'target.checked')
    const exerciseName = get(event, 'target.name')

    if (!updatedExercises) {
      console.log('issue with fetching data in Choose Exercises component')
      return
    }

    updatedExercises = updatedExercises.map((e: UserSavedExercise) => {
      if (e.exercise.exerciseName === exerciseName) {
        e.active = checked
      }
      return e
    })

    setSelectedExercises(updatedExercises)
  }

  return (
    <form onSubmit={onSubmit}>
      <div className={`bg-off-white ${classes.setHeight}`}>
        <div className={`w-10/12 h-4/6 mx-auto relative md:mt-24 mt-5`}>
          <div className="flex flex-col justify-center">
            <h2 className="inter font-bold text-2xl">Choose exercises</h2>
            <p className="inter font-normal text-light-grey text-base mt-1">
              Choose which workouts you perform
            </p>
          </div>
          <div className="flex flex-wrap gap-5 mt-10">
            {
              selectedExercises && selectedExercises.map(({ exercise,  active }, i) => {
                return (
                  <CustomCheckbox
                    isChecked={active}
                    checkboxHandler={checkboxHandler}
                    label={exercise?.displayName}
                    name={exercise?.exerciseName}
                    id={i+''}
                    key={i}
                  />
                )
              })
            }
          </div>
          <div className="w-36 lg:absolute lg:bottom-0">
            <CustomButton type="submit" label="Confirm" classes="bg-brand-blue h-10 mt-16" textClasses="font-semibold text-sm text-white" />
          </div>
        </div>
      </div>
    </form>
  )
}