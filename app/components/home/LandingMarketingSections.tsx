import CustomButton from '@/app/ui/CustomButton'
import Link from 'next/link'

export default function LandingMarketingSections() {
  return (
    <div className="border-t border-light-grey bg-off-white">
      <section className="mx-auto max-w-3xl px-6 py-14 md:px-8 md:py-20">
        <p className="inter text-xs font-semibold uppercase tracking-[0.2em] text-brand-blue">
          Strength in everyday life
        </p>
        <h2 className="inter mt-3 text-2xl font-bold tracking-tight text-black-russian md:text-3xl">
          Strength is not only for athletes—it affects your everyday life and activities
        </h2>
        <p className="inter mt-4 text-base leading-relaxed text-dark-grey">
          It shows up when you pick up a kid, haul luggage, stand for hours at work, garden on the
          weekend, or simply want energy left at the end of the day. It supports confidence, posture,
          and resilience as life gets busier. When strength is there, daily tasks cost less effort;
          when it fades, everything—from stairs to hobbies—starts to feel harder than it should.
          Symmetric strength—left and right, front and back, in patterns you actually use—helps you
          move with less twist and compensation, which lowers the odds that one side or one joint is
          silently doing double duty.           Well-rounded strength spreads load across tissues so no single spot has to carry the extra
          work when life suddenly asks more of you.
        </p>
        <ul className="inter mt-6 list-disc space-y-2 pl-5 text-base text-dark-grey">
          <li>More ease in the physical parts of work, family, travel, and home life</li>
          <li>Lower injury risk when both sides of the body share the work instead of one always winning</li>
          <li>Better odds of staying active, capable, and independent as the years stack up</li>
          <li>A body that backs up your ambitions instead of limiting them</li>
        </ul>
      </section>

      <section className="border-t border-light-grey bg-bright-white">
        <div className="mx-auto max-w-3xl px-6 py-14 md:px-8 md:py-20">
          <p className="inter text-xs font-semibold uppercase tracking-[0.2em] text-brand-blue">
            Functional training
          </p>
          <h2 className="inter mt-3 text-2xl font-bold tracking-tight text-black-russian md:text-3xl">
            Train patterns you actually use: push, pull, carry, and hinge
          </h2>
          <p className="inter mt-4 text-base leading-relaxed text-dark-grey">
            Functional training prioritizes movements that transfer to real life—not isolated poses
            you never repeat outside the gym. It builds coordination, balance, and usable power
            across joints and muscle groups so strength shows up when it matters, not only on a
            leaderboard. Symmetry is part of that picture: when one side or one pattern is clearly
            stronger, the body steers around the gap—twisting, shifting, or rushing range—and those
            habits are a common path to strain and injury. Training push, pull, carry, and hinge in
            balance helps both sides contribute so loads stay more predictable and less “surprising”
            to tissues that were not in on the plan.
          </p>
          <ul className="inter mt-6 list-disc space-y-2 pl-5 text-base text-dark-grey">
            <li>Chase capability, not just aesthetics: get stronger for how you live</li>
            <li>Shrink side-to-side gaps so neither arm, leg, nor hip is always the default bracer</li>
            <li>Expose weak links early, before asymmetry turns into plateaus, pain, or time on the sidelines</li>
            <li>Stay consistent with training that respects how humans move in the world</li>
          </ul>
        </div>
      </section>

      <section className="border-t border-light-grey bg-off-white">
        <div className="mx-auto max-w-3xl px-6 py-14 md:px-8 md:py-20">
          <p className="inter text-xs font-semibold uppercase tracking-[0.2em] text-brand-blue">
            See the full picture
          </p>
          <h2 className="inter mt-3 text-2xl font-bold tracking-tight text-black-russian md:text-3xl">
            The Strength Solution turns your assessment into a map—not a single score
          </h2>
          <p className="inter mt-4 text-base leading-relaxed text-dark-grey">
            When training is functional, progress is about balance and durability across movements—not
            one lucky PR. The Strength Solution helps you run a repeatable assessment, log every result
            in one place, and read the dashboard for where you are ahead, where you are behind, and what
            deserves attention next, including left-right and pattern-level gaps. You close those gaps
            early so compensation does not quietly lead to strain and injury.
          </p>
          <ul className="inter mt-6 list-disc space-y-2 pl-5 text-base text-dark-grey">
            <li>Context-aware benchmarks so “strong” means strong for you, not for a stranger online</li>
            <li>Charts and a body-level view that highlight asymmetry and patterns, not one-off wins</li>
            <li>Spot the strong side and the lagging side before one of them keeps paying the bill</li>
            <li>Re-test over time and let evidence show whether your functional base is really growing</li>
          </ul>
        </div>
      </section>

      <div className="border-t border-light-grey bg-bright-white py-12 md:py-16">
        <div className="mx-auto flex max-w-3xl flex-col items-center px-6 md:px-8">
          <p className="inter text-center text-base text-dark-grey">
            Ready improve your life by increasing functional strength?
          </p>
          <Link href="/create-account" className="mt-6 w-full max-w-xs">
            <CustomButton
              label="Get Started"
              classes="bg-brand-blue h-12"
              textClasses="text-white"
            />
          </Link>
        </div>
      </div>
    </div>
  )
}
