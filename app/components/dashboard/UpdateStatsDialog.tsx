import { ChangeEvent, Dispatch, SetStateAction, useContext, useEffect, useState } from 'react'
import { cloneDeep, get, isArray, isEmpty } from 'lodash-es'
import { Dialog } from '@headlessui/react'

import { UpdateStatsTab } from '@/app/ui/UpdateStatsTab'
import CustomButton from '@/app/ui/CustomButton'
import UpdateUserStats from '@/app/components/dashboard/UpdateUserStats'
import { getSession, useSession } from 'next-auth/react'
import { UserStats } from '@/common/frontend-types-and-constants'
import { Alert } from '@/app/ui/Alert'
import UpdateStatusSelectExercises from '@/app/components/dashboard/UpdateStatsSelectExercises'
import { ActiveExercisesContext } from '@/app/store/exercises-context'
import { convertHeightToInches } from '@/app/components/auth/auth-helpers'
import { setProficienciesForNonStandardExercises } from '@/common/standards-helpers'
import { Profile } from '@prisma/client'

interface Props {
  isOpen: boolean,
  setIsOpen: Dispatch<SetStateAction<boolean>>,
  userStats: UserStats,
  setUserStats: Dispatch<SetStateAction<UserStats | undefined>>,
}

export default function UpdateStatusDialog({ isOpen, setIsOpen, userStats, setUserStats }: Props ) {
  const [selectedTab, setSelectedTab] = useState({ workouts: true, stats: false })
  const [showAlert, setShowAlert] = useState(false)
  const { activeExercises, setActiveExercises } = useContext(ActiveExercisesContext)
  const { data:session } = useSession()

  function onChangeTab(event: ChangeEvent<HTMLInputElement>) {
    const { name } = event.target
    if (name === 'exercises') {
      setSelectedTab({ workouts: true, stats: false })
    } else {
      setSelectedTab({ workouts: false, stats: true })
    }
  }

  const constructBody = (userId: number, profileId: number) => {
    if (!userStats) return

    const height = convertHeightToInches(userStats.heightFeet, userStats.heightInches)
    return {
      userId,
      exercises: activeExercises,
      profileId,
      gender: userStats.gender.male ? 'MALE' : 'FEMALE',
      bodyWeight: userStats.bodyWeight,
      age: userStats.age,
      height,
      source: 'UPDATE_STATS'
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
      if (!session) return

      const userId = get(session, 'userData.id')
      const profileId = get(session, 'userData.profileId')

      if (userId && profileId) {
        const saveRes = await saveAll(userId, profileId)
        const res = await saveRes.json()
        let activeExercises = get(res, 'activeExercises')

        if (!activeExercises || isEmpty(activeExercises)) {
          console.log('UpdateStatsDialog', `Error saving changes: ${saveRes}`)
        }

        const userProfile = get(session, 'userData.profile') as unknown as Profile
        activeExercises = setProficienciesForNonStandardExercises(activeExercises, userProfile)

        setActiveExercises(activeExercises)
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
      case 'heightFeet':
      case 'heightInches':
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
                  ? <UpdateStatusSelectExercises />
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