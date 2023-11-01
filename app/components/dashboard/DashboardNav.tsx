'use client'
import Image from 'next/image'
import CustomButton from '@/app/ui/CustomButton'
import sampleProfilePic from '@/app/images/sample-profile-pic.png'
import UpdateStatusDialog from '@/app/ui/UpdateStatsDialog'

interface Props {
  path?: string
}

export default function DashboardNav({ path }: Props ) {
  return (
    <div className="grid grid-cols-2 py-5 px-12 bg-black-russian">

      <UpdateStatusDialog />

      <h2 className="inter font-extrabold text-base uppercase my-auto text-white">The Strength Solution</h2>
      <div className="flex justify-end">
        <div className="w-44">
          <CustomButton label="Update My Stats" classes="bg-brand-blue h-10" textClasses="font-semibold text-sm" />
        </div>
        <div className="flex ml-7">
          <p className="inter font-medium text-white opacity-60 my-auto">Samantha Robbins</p>
          <Image className="ml-2" src={sampleProfilePic} alt="profile-pic" height={32} width={32} />
        </div>
      </div>
    </div>
  )
}