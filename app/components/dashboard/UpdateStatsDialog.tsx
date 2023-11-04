'use client'
import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react'
import { cloneDeep, get } from 'lodash-es'
import { Dialog } from '@headlessui/react'

import { UpdateStatsTab } from '@/app/ui/UpdateStatsTab'
import UpdateStatusSelectWorkout from '@/app/components/dashboard/UpdateStatsSelectWorkout'
import CustomButton from '@/app/ui/CustomButton'
import UpdateUserStats from '@/app/components/dashboard/UpdateUserStats'
import { useSession } from 'next-auth/react'

interface Props {
  isOpen: boolean,
  setIsOpen: Dispatch<SetStateAction<boolean>>
}

export default function UpdateStatusDialog({ isOpen, setIsOpen }: Props ) {
  const [selectedTab, setSelectedTab] = useState({ workouts: false, stats: true })
  // todo: this should come from db
  const [userStats, setUserStats] = useState({
    gender: { male: true, female: false }, bodyWeight: 200, age: 27 }
  )
  const session = useSession()

  function onChangeTab(event: ChangeEvent<HTMLInputElement>) {
    const { name } = event.target
    if (name === 'exercises') {
      setSelectedTab({ workouts: true, stats: false })
    } else {
      setSelectedTab({ workouts: false, stats: true })
    }
  }

  const saveChanges = async () => {
    try {
      const email = get(session, 'data.user.email')
      const body = {
        email,
        gender: userStats.gender.male ? 'male' : 'female',
        bodyWeight: userStats.bodyWeight,
        age: userStats.age
      }
      const res = await fetch(`/api/profile`, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json'
        },
      })
      const data = await res.json()
      console.log(data)
    } catch (err) {
      console.log(err);
    }
  }

  function onChangeStat(event: ChangeEvent<HTMLInputElement>) {
    const { value } = event.target
    const fieldName = get(event, 'target.name')
    const stats = cloneDeep(userStats)

    switch (fieldName) {
      case 'gender':
        if (value === 'male') {
          stats.gender = { male: true, female: false }
        } else if (value === 'female') {
          stats.gender = { male: false, female: true }
        }
        break
      case 'bodyWeight':
      case 'age':
        stats[fieldName] = +value
        break
    }
    setUserStats(stats)
  }

  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      className="relative z-50 bg-white"
    >
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        <Dialog.Panel className="w-3/5 h-8/12 rounded bg-white py-6 leading-6 border">
          <Dialog.Title>
            <div className="flex justify-center">
              <h1 className="inter font-semibold text-lg">Update My Stats</h1>
            </div>
          </Dialog.Title>
          <Dialog.Description>
            <div className="md:flex md:justify-center">
              <UpdateStatsTab tabName="exercises" checked={selectedTab.workouts} onChange={onChangeTab} />
              <UpdateStatsTab tabName="stats" checked={selectedTab.stats} onChange={onChangeTab} />
            </div>
            <div>
              {
                selectedTab.workouts
                  ? <UpdateStatusSelectWorkout />
                  : <UpdateUserStats userStats={userStats} onChangeStat={onChangeStat} />
              }
            </div>
            <div className="flex justify-center gap-6">
              <div className="w-36">
                <CustomButton
                  label="Cancel"
                  classes="border border-brand-blue h-10 mt-16"
                  textClasses="font-semibold text-sm text-brand-blue"
                  onClick={() => setIsOpen(false)}
                />
              </div>
              <div className="w-36">
                <CustomButton
                  label="Save Changes"
                  classes="bg-brand-blue h-10 mt-16"
                  textClasses="font-semibold text-sm text-white"
                  onClick={saveChanges}
                />
              </div>
            </div>
          </Dialog.Description>
        </Dialog.Panel>
      </div>
    </Dialog>
  )
}