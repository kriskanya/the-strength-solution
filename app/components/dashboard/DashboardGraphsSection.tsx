import RelativeStrengthBarGraph from '@/app/components/dashboard/RelativeStrengthBarGraph'
import YouVsAverageBarGraph from '@/app/components/dashboard/YouVsAverageBarGraph'
import StrengthStandardsTable from '@/app/components/dashboard/StrengthStandardsTable'

export default function DashboardGraphsSection() {
  return (
    <>
      {/*<section className="grid grid-cols-2">*/}
      {/*  <RelativeStrengthBarGraph />*/}
      {/*  <YouVsAverageBarGraph />*/}
      {/*</section>*/}
      <section>
        <StrengthStandardsTable />
      </section>
    </>
  )
}