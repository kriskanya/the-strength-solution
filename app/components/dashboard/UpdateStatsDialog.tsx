import { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from 'react'
import { cloneDeep, get, isArray } from 'lodash-es'
import { Dialog } from '@headlessui/react'

import { UpdateStatsTab } from '@/app/ui/UpdateStatsTab'
import CustomButton from '@/app/ui/CustomButton'
import UpdateUserStats from '@/app/components/dashboard/UpdateUserStats'
import { getSession } from 'next-auth/react'
import { UserStats } from '@/common/frontend-types'
import { Alert } from '@/app/ui/Alert'
import { ChosenExercise, FlattenedChosenExercise } from '@/common/shared-types'
import UpdateStatusSelectExercises from '@/app/components/dashboard/UpdateStatsSelectExercises'

interface Props {
  isOpen: boolean,
  setIsOpen: Dispatch<SetStateAction<boolean>>,
  userStats: UserStats,
  setUserStats: Dispatch<SetStateAction<UserStats>>,
}

export default function UpdateStatusDialog({ isOpen, setIsOpen, userStats, setUserStats }: Props ) {
  const [selectedTab, setSelectedTab] = useState({ workouts: true, stats: false })
  const [showAlert, setShowAlert] = useState(false)
  const [exercises, setExercises] = useState<FlattenedChosenExercise[]>()

  function onChangeTab(event: ChangeEvent<HTMLInputElement>) {
    const { name } = event.target
    if (name === 'exercises') {
      setSelectedTab({ workouts: true, stats: false })
    } else {
      setSelectedTab({ workouts: false, stats: true })
    }
  }

  const fetchExercises = async () => {
    try {
      let data: any
      const session = await getSession()
      const profileId = get(session, 'userData.profileId')
      const res = await fetch(`/api/exercises/choose/profile/${ profileId }`)
      const exercises = await res.json()

      if (exercises && (isArray(exercises) && exercises.length)) {
        // flatten the returned inner-joined object, so that we can more easily handle the case where they haven't chosen their exercises yet
        data = exercises.map((e: ChosenExercise) => {
          return { ...e, ...e.exercise }
        }) as FlattenedChosenExercise[]
      }

      if (data && (isArray(data) && data.length)) {
        setExercises(data)
      }
    } catch (err) {
      console.error('UpdateStatsDialog', err)
    }
  }

  useEffect(() => {
    (async () => {
      await fetchExercises()
    })()
  }, [])

  const constructBody = (userId: number, profileId: number) => {
    return {
      userId,
      exercises,
      profileId,
      gender: userStats.gender.male ? 'MALE' : 'FEMALE',
      bodyWeight: userStats.bodyWeight,
      age: userStats.age
    }
  }

  const saveAll = (userId: number, profileId: number) => {
    const body = constructBody(userId, profileId)
    return fetch(`/api/stats`, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json'
      },
    })
  }

  const saveChanges = async () => {
    try {
      const session = await getSession()
      const userId = get(session, 'userData.id')
      const profileId = get(session, 'userData.profileId')

      if (userId && profileId) {
        const save = await saveAll(userId, profileId)
        const res = await save.json()

        setShowAlert(true)
        setTimeout(() => setShowAlert(false), 5000)
      } else {
        console.error(`UpdateStatsDialog: userId: ${ userId }, profileId: ${ profileId }`)
      }
    } catch (err) {
      console.error(err);
    }
  }

  function onChangeStat(event: ChangeEvent<HTMLInputElement>) {
    let { value } = event.target
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
        value = value.replace(/\D/g,'')
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
                  ? <UpdateStatusSelectExercises exercises={exercises} setExercises={setExercises} />
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
            <div className="mx-6 mt-10">
              <p>
                {showAlert && <Alert customClasses="bg-green-200 text-sm">Changes saved successfully</Alert>}
              </p>
            </div>
          </Dialog.Description>
        </Dialog.Panel>
      </div>
    </Dialog>
  )
}