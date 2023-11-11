'use client'
import Image from 'next/image'
import { useState } from 'react'

import CustomButton from '@/app/ui/CustomButton'
import UpdateStatusDialog from '@/app/components/dashboard/UpdateStatsDialog'
import { useSession } from 'next-auth/react'
import { get } from 'lodash-es'

export default function DashboardNav() {
  const [isOpen, setIsOpen] = useState(false)
  const [userStats, setUserStats] = useState({
    gender: { male: true, female: false }, bodyWeight: 180, age: 27 }
  )

  const { data: session } = useSession()

  const openDialog = async () => {
    const profileId = get(session, 'userData.profileId')
    try {
      const res = await fetch(`/api/profile/${profileId}`)
      const data = await res.json()
      const { age, bodyWeight, gender }: { age: number, bodyWeight: number, gender: 'MALE' | 'FEMALE' } = data
      const stats = { gender: { male: gender === 'MALE', female: gender === 'FEMALE' }, bodyWeight, age }
      setUserStats(stats)
      setIsOpen(true)
    } catch (err) {
      console.error('DashboardNav component', err)
    }
  }

  return (
    <div className="grid grid-cols-2 py-5 px-12 bg-black-russian">
      <UpdateStatusDialog isOpen={isOpen} setIsOpen={setIsOpen} userStats={userStats} setUserStats={setUserStats} />
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
            { session?.user?.name || '' }
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