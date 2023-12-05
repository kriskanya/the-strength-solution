import { createContext, ReactNode, useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { get, isArray } from 'lodash-es'
import { UserSavedExercise } from '@/common/shared-types-and-constants'
import { setProficienciesForNonStandardExercises } from '@/common/standards-helpers'
import { Profile } from '@prisma/client'

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
  const { data:session } = useSession()

  /**
   * This data is used to show how many reps a user has logged for
   * a particular exercise in the Update Stats dialog
   */
  const fetchLoggedExercisesForUpdateStats = async () => {
    try {
      if (!session) return

      const profileId = get(session, 'userData.profileId')
      const res = await fetch(`/api/exercises/choose/profile/${ profileId }`)
      let activeExercises = await res.json()

      console.log('session', session)

      if (activeExercises && (isArray(activeExercises) && activeExercises.length)) {
        const userProfile = get(session, 'userData.profile') as unknown as Profile
        activeExercises = setProficienciesForNonStandardExercises(activeExercises, userProfile)
        console.log('active exercises', activeExercises)
        setActiveExercises(activeExercises)
      }
    } catch (err) {
      console.error('UpdateStatsDialog', err)
    }
  }

  useEffect(() => {
    (async () => {
      await fetchLoggedExercisesForUpdateStats()
    })()
  }, [session])

  return (
    <ActiveExercisesContext.Provider value={ctxProvider}>
      {children}
    </ActiveExercisesContext.Provider>
  )
}