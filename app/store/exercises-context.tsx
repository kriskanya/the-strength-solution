import { createContext, ReactNode, useEffect, useState } from 'react'
import { getSession } from 'next-auth/react'
import { get, isArray } from 'lodash-es'
import { ChosenExercise, UserSavedExercise } from '@/common/shared-types'

interface Props {
  children?: ReactNode
}

/**
 * This context provider sets the initial value of activeExercises and also
 * allows the value to be updated up and down the component chain via setActiveExercises.
 * The main purpose is to update the Strength Standards table based on the exercises a user
 * chooses in UpdateStatsDialog (the ExercisesOnProfiles table)
 */
export const ActiveExercisesContext = createContext({
  activeExercises    : [] as ChosenExercise[] | undefined,
  setActiveExercises : (input: ChosenExercise[]) => {},
  exerciseStats      : [] as UserSavedExercise[] | undefined,
  setExerciseStats   : (input: UserSavedExercise[]) => {}
})

export default function ActiveExerciseContextProvider({ children }: Props) {
  const [activeExercises, setActiveExercises] = useState<ChosenExercise[]>()
  const [exerciseStats, setExerciseStats] = useState<UserSavedExercise[]>()
  const ctxProvider = {
    activeExercises,
    setActiveExercises,
    exerciseStats,
    setExerciseStats
  }

  /**
   * This data is used to determine what exercises to show in Strength Standards
   * table
   */
  const fetchActiveExercises = async () => {
    const session = await getSession()
    const profileId = get(session, 'userData.profileId')
    const res = await fetch(`/api/exercises-on-profiles/${profileId}`, {
      headers: {
        'Content-Type': 'application/json'
      },
    })
    const data: ChosenExercise[] | undefined = await res.json()
    if (data) {
      console.log('active exercises', data)
      setActiveExercises(data)
    }
  }

  /**
   * This data is used to show how many reps a user has logged for
   * a particular exercise
   */
  const fetchMostRecentLoggedExercises = async () => {
    try {
      let data: any
      const session = await getSession()
      const profileId = get(session, 'userData.profileId')
      const res = await fetch(`/api/exercises/choose/profile/${ profileId }`)
      const exercises = await res.json()

      data = exercises

      // if (exercises && (isArray(exercises) && exercises.length)) {
      //   // flatten the returned inner-joined object, so that we can more easily handle the case where they haven't chosen their exercises yet
      //   data = exercises.map((e: ChosenExercise) => {
      //     return { ...e, ...e.exercise }
      //   }) as FlattenedChosenExercise[]
      // }

      if (data && (isArray(data) && data.length)) {
        console.log('logged exercises', data)
        setExerciseStats(data)
      }
    } catch (err) {
      console.error('UpdateStatsDialog', err)
    }
  }

  useEffect(() => {
    (async () => {
      await Promise.all([fetchActiveExercises(), fetchMostRecentLoggedExercises()])
    })()
  }, [])

  return (
    <ActiveExercisesContext.Provider value={ctxProvider}>
      {children}
    </ActiveExercisesContext.Provider>
  )
}