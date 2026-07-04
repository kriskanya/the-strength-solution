import { Suspense } from 'react'

import AuthNav from '@/app/components/auth/AuthNav'
import ResetPassword from '@/app/components/auth/ResetPassword'

export default function ResetPasswordPage() {
  return (
    <section>
      <AuthNav hideBack />
      <Suspense fallback={null}>
        <ResetPassword />
      </Suspense>
    </section>
  )
}
