'use client'
import Image from 'next/image'
import { useEffect, useState } from 'react'

import CustomButton from '@/app/ui/CustomButton'
import UpdateStatusDialog from '@/app/components/dashboard/UpdateStatsDialog'
import { useSession } from 'next-auth/react'

export default function DashboardNav() {
  const [isOpen, setIsOpen] = useState(false)

  const { data: session } = useSession()

  useEffect(() => {
    console.log(session)
  }, [session]);

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
          <p className="inter font-medium text-white opacity-60 my-auto">
            { session?.user?.name }
          </p>
          {
            session?.user?.image
              ? <Image className="ml-2 rounded-3xl" src={session?.user?.image} alt="profile-pic" height={32} width={36} />
              : ''
          }
        </div>
      </div>
    </div>
  )
}