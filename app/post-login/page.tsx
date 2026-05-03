'use client'

import { useEffect } from 'react'
import { getSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { get, isArray, toInteger } from 'lodash-es'

export default function PostLoginPage() {
  const router = useRouter()

  useEffect(() => {
    const routeUser = async () => {
      try {
        const session = await getSession()
        const profileId = toInteger(get(session, 'userData.profileId'))

        if (!session?.user) {
          router.replace('/log-in')
          return
        }

        if (!profileId) {
          router.replace('/about-you')
          return
        }

        const chosenExercisesResponse = await fetch(`/api/exercises/choose/profile/${profileId}`)
        const chosenExercises = await chosenExercisesResponse.json()

        router.replace(
          (isArray(chosenExercises) && chosenExercises.length)
            ? '/dashboard'
            : '/choose-workouts'
        )
      } catch (err) {
        console.error('PostLoginPage routeUser', err)
        router.replace('/log-in')
      }
    }

    routeUser()
  }, [router])

  return (
    <main className="flex items-center justify-center min-h-screen bg-off-white">
      <p className="inter text-base text-black-russian">Setting up your account...</p>
    </main>
  )
}
