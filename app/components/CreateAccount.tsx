import OAuthButton from "@/app/ui/OAuthButton";
import Divider from "@/app/ui/Divider";
import CustomInput from "@/app/ui/CustomInput";
import CustomButton from "@/app/ui/CustomButton";

export default function CreateAccount() {
  return (
    <section className="flex flex-col items-center justify-center h-screen">
      <div className="">
        <h2 className="inter font-bold text-2xl">Create an Account</h2>
        <div className="flex gap-4 mt-5">
          <div style={{width: '204px'}} className="">
            <OAuthButton label="Sign Up With Google" type="google" />
          </div>
          <div style={{width: '204px'}} className="">
            <OAuthButton label="Sign Up With Facebook" type="facebook" />
          </div>
        </div>
        <div className="flex justify-center mt-6">
          <Divider />
          <span className="mx-5">or</span>
          <Divider />
        </div>
        <div className="mt-4 flex flex-col gap-4">
          <CustomInput fieldName="email" type="text" placeholder="Enter your email" />
          <CustomInput fieldName="password" type="password" placeholder="Enter your password" />
        </div>
        <CustomButton label="Create Account" classes="bg-brand-blue h-12 mt-16" />
      </div>
    </section>
  )
}