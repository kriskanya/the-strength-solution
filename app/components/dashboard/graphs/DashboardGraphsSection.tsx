'use client'
import RelativeStrengthBarGraph from '@/app/components/dashboard/graphs/RelativeStrengthBarGraph'
import YouVsAverageBarGraph from '@/app/components/dashboard/graphs/YouVsAverageBarGraph'
import StrengthStandardsTable from '@/app/components/dashboard/graphs/StrengthStandardsTable'
import StrengthClassifications from '@/app/components/dashboard/graphs/StrengthClassifications'
import PageFooter from '@/app/components/dashboard/PageFooter'
import { useContext } from 'react'
import { ActiveExercisesContext } from '@/app/store/exercises-context'

export default function DashboardGraphsSection() {
  const { activeExercises } = useContext(ActiveExercisesContext)

  return (
    <>
      <section>
        {
          activeExercises
            ? <StrengthStandardsTable />
            : ''
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