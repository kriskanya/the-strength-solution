import RelativeStrengthBarGraph from '@/app/components/dashboard/RelativeStrengthBarGraph'
import YouVsAverageBarGraph from '@/app/components/dashboard/YouVsAverageBarGraph'
import StrengthStandardsTable from '@/app/components/dashboard/StrengthStandardsTable'
import StrengthClassifications from '@/app/components/dashboard/StrengthClassifications'
import PageFooter from '@/app/components/dashboard/PageFooter'

export default function DashboardGraphsSection() {
  return (
    <>
      <section className="grid grid-cols-2">
        <RelativeStrengthBarGraph />
        <YouVsAverageBarGraph />
      </section>
      <section>
        <StrengthStandardsTable />
      </section>
      <section className="bg-light-grey pb-16">
        <StrengthClassifications />
      </section>
      <PageFooter />
    </>
  )
}