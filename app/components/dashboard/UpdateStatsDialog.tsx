import { ChangeEvent, Dispatch, SetStateAction, useContext, useEffect, useState } from 'react'
import { cloneDeep, get, isEmpty } from 'lodash-es'
import { Dialog } from '@headlessui/react'
import { UpdateStatsTab } from '@/app/ui/UpdateStatsTab'
import CustomButton from '@/app/ui/CustomButton'
import UpdateUserStats from '@/app/components/dashboard/UpdateUserStats'
import { useSession } from 'next-auth/react'
import { UserStats } from '@/common/frontend-types-and-constants'
import { Alert } from '@/app/ui/Alert'
import UpdateStatusSelectExercises from '@/app/components/dashboard/UpdateStatsSelectExercises'
import { ActiveExercisesContext } from '@/app/store/exercises-context'
import { mergeActiveExerciseLoggedUpdates, setProficienciesForNonStandardExercises } from '@/common/standards-helpers'
import { Profile } from '@prisma/client'
import { UserSavedExercise } from '@/common/shared-types-and-constants'
import {
  buildUpdateStatsSaveDeltas,
  hasUpdateStatsSaveDeltas,
} from '@/app/components/dashboard/update-stats-deltas'

interface Props {
  isOpen: boolean,
  setIsOpen: Dispatch<SetStateAction<boolean>>,
  userStats: UserStats,
  setUserStats: Dispatch<SetStateAction<UserStats | undefined>>,
}

interface UpdateStatsSaveBaseline {
  userStats: UserStats
  activeExercises: UserSavedExercise[]
}

export default function UpdateStatusDialog({ isOpen, setIsOpen, userStats, setUserStats }: Props ) {
  const [selectedTab, setSelectedTab] = useState({ workouts: true, stats: false })
  const [showAlert, setShowAlert] = useState(false)
  const [saveBaseline, setSaveBaseline] = useState<UpdateStatsSaveBaseline>()
  const { activeExercises, setActiveExercises } = useContext(ActiveExercisesContext)
  const { data:session, update } = useSession()

  useEffect(() => {
    if (!isOpen || !activeExercises) {
      return
    }

    setSaveBaseline({
      userStats: cloneDeep(userStats),
      activeExercises: cloneDeep(activeExercises),
    })
  }, [isOpen])

  function onChangeTab(event: ChangeEvent<HTMLInputElement>) {
    const { name } = event.target
    if (name === 'exercises') {
      setSelectedTab({ workouts: true, stats: false })
    } else {
      setSelectedTab({ workouts: false, stats: true })
    }
  }

  const postJson = async (url: string, body: unknown) => {
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error(`Request failed for ${url}: ${response.status}`)
    }

    return response.json()
  }

  const saveChanges = async () => {
    try {
      if (!session || !activeExercises || !saveBaseline) return

      const userId = get(session, 'userData.id')
      const profileId = get(session, 'userData.profileId')

      if (!userId || !profileId) {
        console.error(`UpdateStatsDialog: userId: ${ userId }, profileId: ${ profileId }`)
        return
      }

      const deltas = buildUpdateStatsSaveDeltas(
        saveBaseline.userStats,
        userStats,
        saveBaseline.activeExercises,
        activeExercises
      )

      if (!hasUpdateStatsSaveDeltas(deltas)) {
        return
      }

      let performedResponse: { updatedExercises?: UserSavedExercise[] } | undefined

      if (deltas.profile) {
        await postJson('/api/profile/me', deltas.profile)
      }

      if (deltas.activeChanges.length > 0) {
        await postJson('/api/exercises/choose/active', { changes: deltas.activeChanges })
      }

      if (deltas.performedChanges.length > 0) {
        performedResponse = await postJson('/api/exercises-performed', {
          source: 'UPDATE_STATS',
          changes: deltas.performedChanges,
        })
      }

      const refreshedSession = await update()
      const userProfile = get(refreshedSession, 'userData.profile') as unknown as Profile
      let nextActiveExercises = mergeActiveExerciseLoggedUpdates(
        activeExercises,
        get(performedResponse, 'updatedExercises')
      )

      if (!nextActiveExercises || isEmpty(nextActiveExercises)) {
        console.error('UpdateStatsDialog', 'No active exercises available after save')
        return
      }

      if (deltas.profile) {
        nextActiveExercises = setProficienciesForNonStandardExercises(nextActiveExercises, userProfile)
      }

      if (!nextActiveExercises) {
        console.error('UpdateStatsDialog', 'Unable to refresh exercise proficiencies after save')
        return
      }

      setActiveExercises(nextActiveExercises)
      setSaveBaseline({
        userStats: cloneDeep(userStats),
        activeExercises: cloneDeep(nextActiveExercises),
      })
      setShowAlert(true)
      setTimeout(() => setShowAlert(false), 5000)
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
        <Dialog.Panel className="relative w-3/5 h-8/12 rounded bg-white py-6 leading-6 border">
          <button
            type="button"
            aria-label="Close update stats modal"
            className="absolute right-4 top-4 text-2xl leading-none text-gray-500 hover:text-gray-700"
            onClick={() => setIsOpen(false)}
          >
            ×
          </button>
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
