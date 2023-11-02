'use client'
import Image from 'next/image'
import { useState } from 'react'

import CustomButton from '@/app/ui/CustomButton'
import sampleProfilePic from '@/app/images/sample-profile-pic.png'
import UpdateStatusDialog from '@/app/components/dashboard/UpdateStatsDialog'

export default function DashboardNav() {
  const [isOpen, setIsOpen] = useState(false)

  function openDialog() {
    setIsOpen(true)
  }

  return (
    <div className="grid grid-cols-2 py-5 px-12 bg-black-russian">
      <UpdateStatusDialog isOpen={isOpen} setIsOpen={setIsOpen} />
      <h2 className="inter font-extrabold text-base uppercase my-auto text-white">The Strength Solution</h2>
      <div className="flex justify-end">
        <div className="w-44">
          <CustomButton
            label="Update My Stats"
            classes="bg-brand-blue h-10"
            textClasses="font-semibold text-sm text-white"
            onClick={openDialog}
          />
        </div>
        <div className="flex ml-7">
          <p className="inter font-medium text-white opacity-60 my-auto">Samantha Robbins</p>
          <Image className="ml-2" src={sampleProfilePic} alt="profile-pic" height={32} width={32} />
        </div>
      </div>
    </div>
  )
}