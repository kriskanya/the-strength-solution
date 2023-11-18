import { createContext, ReactNode, useEffect, useState } from 'react'
import { getSession } from 'next-auth/react'
import { get, isArray } from 'lodash-es'
import { UserSavedExercise } from '@/common/shared-types'

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
  activeExercises     : [] as UserSavedExercise[] | undefined,
  setActiveExercises  : (input: UserSavedExercise[]) => {}
})

export default function ActiveExerciseContextProvider({ children }: Props) {
  const [activeExercises, setActiveExercises] = useState<UserSavedExercise[]>()
  const ctxProvider = {
    activeExercises,
    setActiveExercises
  }

  /**
   * This data is used to show how many reps a user has logged for
   * a particular exercise
   */
  const fetchMostRecentLoggedExercises = async () => {
    try {
      const session = await getSession()
      const profileId = get(session, 'userData.profileId')
      const res = await fetch(`/api/exercises/choose/profile/${ profileId }`)
      const data = await res.json()

      if (data && (isArray(data) && data.length)) {
        console.log('logged exercises', data)
        setActiveExercises(data)
      }
    } catch (err) {
      console.error('UpdateStatsDialog', err)
    }
  }

  useEffect(() => {
    (async () => {
      await fetchMostRecentLoggedExercises()
    })()
  }, [])

  return (
    <ActiveExercisesContext.Provider value={ctxProvider}>
      {children}
    </ActiveExercisesContext.Provider>
  )
}