'use client'
import { ChangeEvent, Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { UpdateStatsTab } from '@/app/ui/UpdateStatsTab'

export default function UpdateStatusDialog() {
  const [isOpen, setIsOpen] = useState(true)
  const [selectedTab, setSelectedTab] = useState({ workouts: true, stats: false })

  function onChangeTab(event: ChangeEvent<HTMLInputElement>) {
    const { name } = event.target
    if (name === 'workouts') {
      setSelectedTab({ workouts: true, stats: false })
    } else {
      setSelectedTab({ workouts: false, stats: true })
    }
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
          <Dialog.Panel className="w-3/5 rounded bg-white px-4 py-4 leading-6">
            <Dialog.Title>
              <h1 className="inter font-semibold text-lg">Update My Stats</h1>
            </Dialog.Title>
            <Dialog.Description>
              <div className="flex">
                <UpdateStatsTab tabName="workouts" checked={selectedTab.workouts} onChange={onChangeTab} />
                <UpdateStatsTab tabName="stats" checked={selectedTab.stats} onChange={onChangeTab} />
              </div>
            </Dialog.Description>
          </Dialog.Panel>
        </div>
      </Dialog>
    </Transition>
  )
}