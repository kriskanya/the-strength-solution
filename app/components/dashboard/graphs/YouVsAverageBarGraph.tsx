'use client'
import { useContext, useMemo } from 'react'
import { get, isNumber } from 'lodash-es'
import { ActiveExercisesContext } from '@/app/store/exercises-context'
import { UserSavedExercise } from '@/common/shared-types-and-constants'
import { useSession } from 'next-auth/react'

interface ProgressItem {
  name: string
  current: number
  target: number
  unit: string
}

const UNIT_LABELS: { [key: string]: string } = {
  REPS: 'reps',
  SECONDS: 'sec',
  INCHES: 'in',
  POUNDS_PER_HAND: 'lbs ea.'
}

function getProficientTarget(exercise: UserSavedExercise, profile: any) {
  const exerciseName = get(exercise, 'exercise.exerciseName')
  switch (exerciseName) {
    case 'BROAD_JUMP':
      return get(profile, 'height')
    case 'DEAD_HANG':
      return 90
    case 'FARMER_CARRY':
      return get(profile, 'bodyWeight') * 0.5
    default:
      return get(exercise, 'loggedExercise.startRepRange')
  }
}

export default function YouVsAverageBarGraph() {
  const { activeExercises } = useContext(ActiveExercisesContext)
  const { data: session } = useSession()

  const progressItems: ProgressItem[] = useMemo(() => {
    if (!activeExercises) return []
    const profile = get(session, 'userData.profile')

    return activeExercises
      .filter((exercise) => exercise.active)
      .map((exercise) => {
        const current = get(exercise, 'loggedExercise.quantity')
        const target = getProficientTarget(exercise, profile)
        return {
          name: get(exercise, 'exercise.displayName', ''),
          current: isNumber(current) ? current : 0,
          target: isNumber(target) ? target : 0,
          unit: UNIT_LABELS[get(exercise, 'exercise.unitOfMeasurement', 'REPS')] || 'reps'
        }
      })
      .filter((item) => !!item.name)
  }, [activeExercises, session])

  return (
    <div className="px-10 py-7">
      <div className="flex justify-between">
        <h3 className="uppercase">Your Current Strength Vs Proficient Level</h3>
        <div className="flex items-center">
          <div className="h-[12px] w-[12px] bg-light-grey inline-block"></div>
          <p className="inline-block ml-2 text-sm text-dark-grey">Proficient Target</p>
        </div>
      </div>

      <table className="w-full mt-4">
        <tbody>
          {progressItems.map((item, i) => {
            const ratio = item.target > 0 ? item.current / item.target : 0
            const progressPercent = Math.max(0, Math.min(100, ratio * 100))
            const overflowPercent = ratio > 1 ? Math.min(100, (ratio - 1) * 100) : 0
            const gap = Math.round(item.current - item.target)
            const gapLabel = `${gap > 0 ? '+' : ''}${gap} ${item.unit}`

            return (
              <tr className="h-16" key={i}>
                <td className="w-1/3">{item.name}</td>
                <td className="border-b border-dashed">
                  <div className="flex justify-between text-xs text-dark-grey mb-1">
                    <span>Current: {item.current} {item.unit}</span>
                    <span>Target: {item.target} {item.unit} ({gapLabel})</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-[230px] h-[14px] bg-light-grey relative rounded-sm overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[#F46A2C] via-[#FCFF4B] via-[#64D45E] to-[#4CD964]"
                        style={{ width: `${progressPercent}%` }}
                      ></div>
                    </div>
                    {
                      overflowPercent > 0
                        ? <div className="w-[80px] h-[14px] ml-2 bg-[#E7EEFF] rounded-sm overflow-hidden">
                            <div
                              className="h-full bg-brand-blue"
                              style={{ width: `${overflowPercent}%` }}
                            ></div>
                          </div>
                        : <div className="w-[80px] h-[14px] ml-2"></div>
                    }
                  </div>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}