import { createContext, ReactNode, useEffect, useState } from 'react'
import { ExercisesOnProfiles } from '@prisma/client'
import { getSession } from 'next-auth/react'
import { get } from 'lodash-es'

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
  activeExercises: [] as ExercisesOnProfiles[] | undefined,
  setActiveExercises: (input: ExercisesOnProfiles[]) => {}
})

export default function ActiveExerciseContextProvider({ children }: Props) {
  const [activeExercises, setActiveExercises] = useState<ExercisesOnProfiles[]>()
  const ctxProvider = {
    activeExercises,
    setActiveExercises
  }

  const fetchExercisesOnProfiles = async () => {
    const session = await getSession()
    const profileId = get(session, 'userData.profileId')
    const res = await fetch(`/api/exercises-on-profiles/${profileId}`, {
      headers: {
        'Content-Type': 'application/json'
      },
    })
    const data = await res.json()
    if (data) {
      setActiveExercises(data)
    }
  }

  useEffect(() => {
    (async () => {
      await fetchExercisesOnProfiles()
    })()
  }, [])

  return (
    <ActiveExercisesContext.Provider value={ctxProvider}>
      {children}
    </ActiveExercisesContext.Provider>
  )
}