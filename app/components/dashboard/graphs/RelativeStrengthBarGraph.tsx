'use client'
import { useContext, useEffect, useMemo, useState } from 'react'
import { capitalize, get } from 'lodash-es'
import { ActiveExercisesContext } from '@/app/store/exercises-context'
import { PROFICIENCY_LEVELS } from '@/common/shared-types-and-constants'

interface RelativeStrengthItem {
  name: string
  level: PROFICIENCY_LEVELS
  peerDistribution: Record<PROFICIENCY_LEVELS, number>
  peerSampleSize: number
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

const proficiencyOrder: PROFICIENCY_LEVELS[] = ['NOVICE', 'INTERMEDIATE', 'PROFICIENT', 'ADVANCED', 'ELITE']
const levelCountFields: Record<PROFICIENCY_LEVELS, keyof Pick<CohortProficiencyDistribution, 'noviceCount' | 'intermediateCount' | 'proficientCount' | 'advancedCount' | 'eliteCount'>> = {
  NOVICE: 'noviceCount',
  INTERMEDIATE: 'intermediateCount',
  PROFICIENT: 'proficientCount',
  ADVANCED: 'advancedCount',
  ELITE: 'eliteCount',
}
const proficiencyColors: Record<PROFICIENCY_LEVELS, string> = {
  NOVICE: '#F25B28',
  INTERMEDIATE: '#F4B43B',
  PROFICIENT: '#FCFF4B',
  ADVANCED: '#4CD964',
  ELITE: '#2E8EEC',
}
const graphXByLevel: Record<PROFICIENCY_LEVELS, number> = {
  NOVICE: 70,
  INTERMEDIATE: 195,
  PROFICIENT: 320,
  ADVANCED: 445,
  ELITE: 570,
}
const GRAPH_BASELINE_Y = 225
const PEER_DISTRIBUTION_BAR_MAX_HEIGHT = 120
const graphYByLevel: Record<PROFICIENCY_LEVELS, number> = {
  NOVICE: 205,
  INTERMEDIATE: 125,
  PROFICIENT: 62,
  ADVANCED: 125,
  ELITE: 205,
}

// Build peer counts without the current user, so users are never compared against themselves.
function buildPeerDistribution(level: PROFICIENCY_LEVELS | undefined, distribution: CohortProficiencyDistribution): RelativeStrengthItem['peerDistribution'] | undefined {
  if (!level || distribution.sampleSize <= 1) return

  const peerDistribution = proficiencyOrder.reduce((peerCounts, currentLevel) => {
    peerCounts[currentLevel] = distribution[levelCountFields[currentLevel]]

    return peerCounts
  }, {} as Record<PROFICIENCY_LEVELS, number>)

  peerDistribution[level] = Math.max(0, peerDistribution[level] - 1)

  return peerDistribution
}

// A fixed standard curve keeps the visual stable while the labels show actual peer percentages.
function getCurvePath() {
  return [
    `M 40 ${GRAPH_BASELINE_Y}`,
    `C 130 ${GRAPH_BASELINE_Y} 180 ${graphYByLevel.PROFICIENT} ${graphXByLevel.PROFICIENT} ${graphYByLevel.PROFICIENT}`,
    `C 460 ${graphYByLevel.PROFICIENT} 510 ${GRAPH_BASELINE_Y} 600 ${GRAPH_BASELINE_Y}`,
  ].join(' ')
}

function getAggregatePeerPercentage(level: PROFICIENCY_LEVELS, aggregatePeerDistribution: Record<PROFICIENCY_LEVELS, number>, aggregatePeerSampleSize: number) {
  if (aggregatePeerSampleSize === 0) return 0

  return Math.round((aggregatePeerDistribution[level] / aggregatePeerSampleSize) * 100)
}

// Multiple exercises can land in the same proficiency bucket; stack them around the bucket's curve position.
function getPointPosition(level: PROFICIENCY_LEVELS, indexInLevel: number, totalInLevel: number) {
  const yOffset = (indexInLevel - (totalInLevel - 1) / 2) * 18

  return {
    x: graphXByLevel[level],
    y: graphYByLevel[level] + yOffset,
  }
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
        const peerDistribution = distribution ? buildPeerDistribution(level, distribution) : undefined
        const peerSampleSize = peerDistribution
          ? proficiencyOrder.reduce((sum, currentLevel) => sum + peerDistribution[currentLevel], 0)
          : undefined

        if (!level || !peerDistribution || !peerSampleSize) return

        return {
          level,
          name: get(exercise, 'exercise.displayName', ''),
          peerDistribution,
          peerSampleSize,
        }
      })
      .filter((exercise): exercise is RelativeStrengthItem => {
        return !!exercise?.name
      })
  }, [activeExercises, cohortDistributions])
  const exerciseCountsByLevel = useMemo(() => {
    return exercises.reduce((counts, exercise) => {
      counts[exercise.level] += 1

      return counts
    }, {
      NOVICE: 0,
      INTERMEDIATE: 0,
      PROFICIENT: 0,
      ADVANCED: 0,
      ELITE: 0,
    } as Record<PROFICIENCY_LEVELS, number>)
  }, [exercises])

  // Aggregate across displayed exercises so the axis labels show the overall peer bucket mix.
  const aggregatePeerDistribution = useMemo(() => {
    return exercises.reduce((distribution, exercise) => {
      proficiencyOrder.forEach((level) => {
        distribution[level] += exercise.peerDistribution[level]
      })

      return distribution
    }, {
      NOVICE: 0,
      INTERMEDIATE: 0,
      PROFICIENT: 0,
      ADVANCED: 0,
      ELITE: 0,
    } as Record<PROFICIENCY_LEVELS, number>)
  }, [exercises])
  const aggregatePeerSampleSize = useMemo(() => {
    return proficiencyOrder.reduce((sum, level) => sum + aggregatePeerDistribution[level], 0)
  }, [aggregatePeerDistribution])

  return (
    <div className="px-10 py-7">
      <h3 className="uppercase">Relative Strengths and Weaknesses</h3>
      <div className="mt-8">
        {
          exercises.length === 0
            ? <p className="inter font-normal text-sm text-dark-grey opacity-70">No peer data yet.</p>
            : <>
                <div className="relative">
                  <svg viewBox="0 0 640 280" className="w-full">
                    {
                      proficiencyOrder.map((level) => {
                        const percentage = getAggregatePeerPercentage(level, aggregatePeerDistribution, aggregatePeerSampleSize)
                        const height = (percentage / 100) * PEER_DISTRIBUTION_BAR_MAX_HEIGHT

                        return (
                          <rect
                            fill={proficiencyColors[level]}
                            height={height}
                            key={level}
                            opacity="0.38"
                            rx="6"
                            width="92"
                            x={graphXByLevel[level] - 46}
                            y={GRAPH_BASELINE_Y - height}
                          ></rect>
                        )
                      })
                    }
                    <path
                      d={getCurvePath()}
                      fill="none"
                      stroke="#DADADA"
                      strokeWidth="3"
                    />
                    <line x1="40" x2="600" y1={GRAPH_BASELINE_Y} y2={GRAPH_BASELINE_Y} stroke="#DADADA" strokeDasharray="4 4" />
                  {
                      proficiencyOrder.map((level) => (
                        <g key={level}>
                          <line
                            x1={graphXByLevel[level]}
                            x2={graphXByLevel[level]}
                            y1={GRAPH_BASELINE_Y}
                            y2="232"
                            stroke="#A7A7A7"
                          />
                          <text
                            x={graphXByLevel[level]}
                            y="248"
                            fill="#656565"
                            fontSize="11"
                            textAnchor="middle"
                          >
                            {capitalize(level)}
                          </text>
                          <text
                            x={graphXByLevel[level]}
                            y="264"
                            fill="#656565"
                            fontSize="10"
                            textAnchor="middle"
                          >
                            {getAggregatePeerPercentage(level, aggregatePeerDistribution, aggregatePeerSampleSize)}%
                          </text>
                        </g>
                      ))
                    }
                    {
                      exercises.map((exercise, i) => {
                        const indexInLevel = exercises
                          .slice(0, i)
                          .filter((previousExercise) => previousExercise.level === exercise.level)
                          .length
                        const position = getPointPosition(exercise.level, indexInLevel, exerciseCountsByLevel[exercise.level])

                        return (
                          <g key={`${exercise.name}-${i}`}>
                            <rect
                              fill={proficiencyColors[exercise.level]}
                              height="16"
                              rx="8"
                              stroke="#111111"
                              strokeWidth="1"
                              width="92"
                              x={position.x - 46}
                              y={position.y - 8}
                            ></rect>
                            <text
                              x={position.x}
                              y={position.y + 3.5}
                              fill="#111111"
                              fontSize="9"
                              fontWeight="600"
                              textAnchor="middle"
                            >
                              {exercise.name}
                            </text>
                          </g>
                        )
                      })
                    }
                  </svg>
                </div>
                <p className="inter font-normal text-xs text-dark-grey mt-3">
                  Colored bars show where similar users land by proficiency level; exercise labels show where your current results land.
                </p>
              </>
        }
      </div>
    </div>
  )
}