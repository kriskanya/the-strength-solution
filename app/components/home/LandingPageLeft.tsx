import CustomButton from '@/app/ui/CustomButton'
import Link from 'next/link'

export default function LandingPageLeft() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-off-white">
      <div>
        <h1 className="inter text-3xl font-extrabold">
          Welcome to the Strength Solution
        </h1>
        <p className="inter mt-2 text-base font-normal text-dark-grey">
          <span className="text-brand-blue">
            Your solution for building a bulletproof body and eliminating pain.
          </span>
        </p>
        <Link href="create-account">
          <CustomButton
            label="Get Started"
            classes="bg-brand-blue h-12 mt-16"
            textClasses="text-white"
          />
        </Link>
        <p className="inter mt-5 text-sm font-normal text-dark-grey">
          By continuing you agree to the{' '}
          <Link className="text-brand-blue underline" href="privacy-policy">
            Privacy Policy
          </Link>{' '}
          and{' '}
          <Link className="text-brand-blue underline" href="terms-and-conditions">
            Terms &amp; Conditions
          </Link>
        </p>
      </div>
    </div>
  )
}
