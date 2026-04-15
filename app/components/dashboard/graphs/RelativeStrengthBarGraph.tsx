'use client'
import { useContext, useMemo } from 'react'
import { get, isNumber } from 'lodash-es'
import { ActiveExercisesContext } from '@/app/store/exercises-context'
import { UserSavedExercise } from '@/common/shared-types-and-constants'
import { useSession } from 'next-auth/react'

interface RelativeStrengthItem {
  name: string
  percentage: number
}

const MAX_BAR_WIDTH = 150

function getProficientStandard(exercise: UserSavedExercise, profile: any) {
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

function computePercentageDifference(exercise: UserSavedExercise, profile: any) {
  const actual = get(exercise, 'loggedExercise.quantity')
  const standard = getProficientStandard(exercise, profile)

  if (!isNumber(actual) || !isNumber(standard)) return 0

  if (standard <= 0) {
    return actual > 0 ? 100 : 0
  }

  return Math.round(((actual - standard) / standard) * 100)
}

export default function RelativeStrengthBarGraph() {
  const { activeExercises } = useContext(ActiveExercisesContext)
  const { data: session } = useSession()

  const exercises: RelativeStrengthItem[] = useMemo(() => {
    if (!activeExercises) return []
    const profile = get(session, 'userData.profile')

    return activeExercises
      .filter((exercise) => exercise.active)
      .map((exercise) => {
        const percentage = computePercentageDifference(exercise, profile)
        return {
          name: get(exercise, 'exercise.displayName', ''),
          percentage
        }
      })
      .filter((exercise): exercise is RelativeStrengthItem => {
        return !!exercise.name
      })
  }, [activeExercises, session])

  const highestDifference = useMemo(() => {
    return exercises.reduce((accumulator, current) => {
      return Math.max(accumulator, Math.abs(current.percentage))
    }, 0)
  }, [exercises])

  function calculateWidth(input: number) {
    if (input === 0) return '0px'

    const minWidth = 35
    const calculatedWidth = highestDifference > 0
      ? (Math.abs(input) / highestDifference) * MAX_BAR_WIDTH
      : 0
    return `${calculatedWidth + minWidth}px`
  }

  return (
    <div className="px-10 py-7">
      <h3 className="uppercase">Relative Strengths and Weaknesses</h3>
      <div className="mt-8">
        <table className="w-full">
          <tbody>
            {
              exercises.map((exercise, i) => {
                if (exercise.percentage === 0) {
                  return (
                    <tr className="h-12" key={i}>
                      <td>{exercise.name}</td>
                      <td className="border-b border-dashed relative">
                        <span className="absolute left-[180px] top-0 bottom-0 w-px bg-brand-blue"></span>
                        <div className="w-[180px] h-[24px] inline-flex justify-end items-center">
                          <div className="bg-medium-grey h-[24px] w-[24px]"></div>
                        </div>
                        <span className="inline-block w-px"></span>
                        <div className="h-[24px] mt-1 inline-block bg-gradient-to-r from-[#007DD9] to-[#4845DA] w-[24px]"></div>
                        <span className="absolute left-[180px] top-1/2 -translate-x-1/2 -translate-y-1/2 inter text-xs text-white leading-none pointer-events-none">
                          0%
                        </span>
                      </td>
                    </tr>
                  )
                }

                return (
                  exercise.percentage > 0
                    ? <tr className="h-12" key={i}>
                        <td>{exercise.name}</td>
                        <td className="border-b border-dashed relative">
                          <span className="absolute left-[180px] top-0 bottom-0 w-px bg-brand-blue"></span>
                          <div className="w-[180px] h-[24px] inline-block"></div>
                          <span className="inline-block w-px"></span>
                          <div
                            className="h-[24px] mt-1 inline-block bg-gradient-to-r from-[#007DD9] to-[#4845DA]"
                            style={{ width: calculateWidth(exercise.percentage) }}
                          >
                            <span className="inter font-normal text-xs leading-4 text-white float-right mr-1 mt-[.4em]">
                              +{exercise.percentage}%
                            </span>
                          </div>
                        </td>
                      </tr>
                    : <tr className="h-12" key={i}>
                        <td>{exercise.name}</td>
                        <td className="border-b border-dashed relative">
                          <span className="absolute left-[180px] top-0 bottom-0 w-px bg-brand-blue"></span>
                          <div className="w-[180px] h-[24px] inline-block">
                            <div
                              className="bg-medium-grey float-right mt-1"
                              style={{ width: calculateWidth(exercise.percentage) }}
                            >
                              <span className="inter font-normal text-xs text-white ml-1 align-middle">
                                {exercise.percentage}%
                              </span>
                            </div>
                          </div>
                          <span className="inline-block w-px"></span>
                        </td>
                      </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}