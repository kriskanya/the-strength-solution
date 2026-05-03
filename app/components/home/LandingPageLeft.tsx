import CustomButton from "@/app/ui/CustomButton";
import Link from "next/link";

export default function LandingPageLeft() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div>
        <h1 className="inter font-extrabold text-3xl">
          Welcome to the Strength Solution
        </h1>
        <p className="inter font-normal text-dark-grey text-base mt-2">
          <span className="text-brand-blue">Your solution for building a bulletproof body and eliminating pain.</span>
        </p>
        <Link href="create-account">
          <CustomButton label="Get Started" classes="bg-brand-blue h-12 mt-16" textClasses="text-white" />
        </Link>
        <p className="inter font-normal text-dark-grey text-sm mt-5">
          By continuing you agree to the <Link className="text-brand-blue underline" href="privacy-policy">Privacy Policy</Link> and <Link
          className="text-brand-blue underline" href="terms-and-conditions">Terms & Conditions</Link>
        </p>
      </div>
    </div>
  )
}