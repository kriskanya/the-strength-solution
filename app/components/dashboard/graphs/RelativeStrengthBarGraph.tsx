'use client'
import { useContext, useEffect, useMemo, useState } from 'react'
import { get } from 'lodash-es'
import { ActiveExercisesContext } from '@/app/store/exercises-context'
import { PROFICIENCY_LEVELS } from '@/common/shared-types-and-constants'

interface RelativeStrengthItem {
  name: string
  percentage: number
}

type CohortProficiencyDistribution = {
  exerciseId: number
  sampleSize: number
  noviceCount: number
  intermediateCount: number
  proficientCount: number
  advancedCount: number
  eliteCount: number
}

const MAX_BAR_WIDTH = 150
const proficiencyOrder: PROFICIENCY_LEVELS[] = ['NOVICE', 'INTERMEDIATE', 'PROFICIENT', 'ADVANCED', 'ELITE']
const levelCountFields: Record<PROFICIENCY_LEVELS, keyof Pick<CohortProficiencyDistribution, 'noviceCount' | 'intermediateCount' | 'proficientCount' | 'advancedCount' | 'eliteCount'>> = {
  NOVICE: 'noviceCount',
  INTERMEDIATE: 'intermediateCount',
  PROFICIENT: 'proficientCount',
  ADVANCED: 'advancedCount',
  ELITE: 'eliteCount',
}

function calculateInclusivePercentile(level: PROFICIENCY_LEVELS | undefined, distribution: CohortProficiencyDistribution): number | undefined {
  if (!level || distribution.sampleSize === 0) return

  const levelIndex = proficiencyOrder.indexOf(level)
  if (levelIndex === -1) return

  const countAtOrBelowLevel = proficiencyOrder
    .slice(0, levelIndex + 1)
    .reduce((sum, currentLevel) => sum + distribution[levelCountFields[currentLevel]], 0)

  return Math.round((countAtOrBelowLevel / distribution.sampleSize) * 100)
}

export default function RelativeStrengthBarGraph() {
  const { activeExercises } = useContext(ActiveExercisesContext)
  const [cohortDistributions, setCohortDistributions] = useState<CohortProficiencyDistribution[]>([])

  useEffect(() => {
    const fetchCohortProficiencies = async () => {
      if (!activeExercises?.length) {
        setCohortDistributions([])
        return
      }

      try {
        const res = await fetch('/api/exercises/cohort-proficiencies')
        if (!res.ok) {
          console.error('RelativeStrengthBarGraph cohort proficiencies', res.status)
          setCohortDistributions([])
          return
        }

        const distributions = await res.json() as CohortProficiencyDistribution[]
        setCohortDistributions(distributions)
      } catch (err) {
        console.error('RelativeStrengthBarGraph cohort proficiencies', err)
        setCohortDistributions([])
      }
    }

    void fetchCohortProficiencies()
  }, [activeExercises])

  const exercises: RelativeStrengthItem[] = useMemo(() => {
    if (!activeExercises || cohortDistributions.length === 0) return []

    const distributionByExerciseId = new Map(cohortDistributions.map((distribution) => {
      return [distribution.exerciseId, distribution]
    }))

    return activeExercises
      .filter((exercise) => exercise.active)
      .map((exercise) => {
        const distribution = distributionByExerciseId.get(exercise.exerciseId)
        const level = get(exercise, 'loggedExercise.level') as PROFICIENCY_LEVELS | undefined
        const percentile = distribution ? calculateInclusivePercentile(level, distribution) : undefined

        if (percentile === undefined) return

        return {
          name: get(exercise, 'exercise.displayName', ''),
          percentage: percentile - 50,
        }
      })
      .filter((exercise): exercise is RelativeStrengthItem => {
        return !!exercise?.name
      })
  }, [activeExercises, cohortDistributions])

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
        {
          exercises.length === 0
            ? <p className="inter font-normal text-sm text-white opacity-50">No peer data yet.</p>
            : <table className="w-full">
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
        }
      </div>
    </div>
  )
}