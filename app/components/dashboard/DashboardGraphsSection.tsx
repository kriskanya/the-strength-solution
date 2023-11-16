'use client'
import RelativeStrengthBarGraph from '@/app/components/dashboard/RelativeStrengthBarGraph'
import YouVsAverageBarGraph from '@/app/components/dashboard/YouVsAverageBarGraph'
import StrengthStandardsTable from '@/app/components/dashboard/StrengthStandardsTable'
import StrengthClassifications from '@/app/components/dashboard/StrengthClassifications'
import PageFooter from '@/app/components/dashboard/PageFooter'
import { getSession } from 'next-auth/react'
import { get } from 'lodash-es'
import { useEffect, useState } from 'react'
import { ExercisesOnProfiles } from '@prisma/client'

export default function DashboardGraphsSection() {
  const [activeExercises, setActiveExercises] = useState<ExercisesOnProfiles[]>()

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
    <>
      <section>
        {
          activeExercises
            ? <StrengthStandardsTable activeExercises={activeExercises} />
            : <p>loading...</p>
        }
      </section>
      <section className="bg-light-grey pb-16">
        <StrengthClassifications />
      </section>
      <section className="grid grid-cols-2">
        <RelativeStrengthBarGraph />
        <YouVsAverageBarGraph />
      </section>
      <PageFooter />
    </>
  )
}