import AuthNav from '@/app/components/auth/AuthNav'
import AssessmentGuide from '@/app/components/assessment-guide/AssessmentGuide'

export default function AssessmentGuidePage() {
  return (
    <section>
      <AuthNav path="/choose-workouts" />
      <AssessmentGuide />
    </section>
  )
}
