'use client'
import { ChangeEvent, Fragment, useEffect, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { UpdateStatsTab } from '@/app/ui/UpdateStatsTab'
import UpdateStatusSelectWorkout from '@/app/components/dashboard/UpdateStatsSelectWorkout'
import CustomButton from '@/app/ui/CustomButton'
import { cloneDeep, get } from 'lodash-es'
import UpdateUserStats from '@/app/components/dashboard/UpdateUserStats'

interface Props {
  openDialog: any
}

export default function UpdateStatusDialog({ openDialog }: Props ) {
  const [isOpen, setIsOpen] = useState(openDialog)
  const [selectedTab, setSelectedTab] = useState({ workouts: false, stats: true })
  // todo: this should come from db
  const [userStats, setUserStats] = useState({
    gender: { male: true, female: false }, weight: 200, age: 27 }
  )

  function onChangeTab(event: ChangeEvent<HTMLInputElement>) {
    const { name } = event.target
    if (name === 'workouts') {
      setSelectedTab({ workouts: true, stats: false })
    } else {
      setSelectedTab({ workouts: false, stats: true })
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
      case 'weight':
      case 'age':
        stats[fieldName] = +value
        break
    }
    setUserStats(stats)
  }

  return (
    <Transition
      show={isOpen}
      enter="transition duration-100 ease-out"
      enterFrom="transform scale-95 opacity-0"
      enterTo="transform scale-100 opacity-100"
      leave="transition duration-75 ease-out"
      leaveFrom="transform scale-100 opacity-100"
      leaveTo="transform scale-95 opacity-0"
      as={Fragment}
    >
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-50 bg-white"
      >
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <Dialog.Panel className="w-3/5 h-8/12 rounded bg-white px-4 py-8 leading-6 border">
            <Dialog.Title>
              <div className="flex justify-center">
                <h1 className="inter font-semibold text-lg">Update My Stats</h1>
              </div>
            </Dialog.Title>
            <Dialog.Description>
              <div className="flex justify-center">
                <UpdateStatsTab tabName="workouts" checked={selectedTab.workouts} onChange={onChangeTab} />
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
                  <CustomButton label="Cancel" classes="border border-brand-blue h-10 mt-16" textClasses="font-semibold text-sm text-brand-blue" />
                </div>
                <div className="w-36">
                  <CustomButton label="Save Changes" classes="bg-brand-blue h-10 mt-16" textClasses="font-semibold text-sm text-white" />
                </div>
              </div>
            </Dialog.Description>
          </Dialog.Panel>
        </div>
      </Dialog>
    </Transition>
  )
}