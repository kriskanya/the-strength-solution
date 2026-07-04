'use client'
import CustomDropdown from '@/app/ui/CustomDropdown'
import { useContext, useEffect, useState } from 'react'
import { capitalize, get, isEmpty, map } from 'lodash-es'
import { ExercisesOnProfiles, Profile, Standard } from '@prisma/client'
import { getSession } from 'next-auth/react'
import { StandardsDropdownSelection } from '@/common/frontend-types-and-constants'
import { ActiveExercisesContext } from '@/app/store/exercises-context'
import { NON_STANDARD_EXERCISES, UserSavedExercise } from '@/common/shared-types-and-constants'
import { STRENGTH_CLASSIFICATIONS } from '@/app/components/dashboard/dashboard-helpers-and-constants'

const CLASSIFICATION_SWATCH_CLASSES: Record<string, string> = {
  novice: 'bg-red-novice',
  intermediate: 'bg-orange-intermediate',
  proficient: 'bg-yellow-proficient',
  advanced: 'bg-green-advanced',
  elite: 'bg-blue-elite',
}

function ClassificationHeader({
  level,
  description,
}: {
  level: string
  description: string
}) {
  return (
    <th align="left" className="inter font-normal text-xs uppercase text-dark-grey">
      <div className="group relative inline-flex cursor-default items-center">
        <div className="inline-flex items-center opacity-80">
          <div className={`h-[12px] w-[12px] ${CLASSIFICATION_SWATCH_CLASSES[level]}`} />
          <span className="ml-1 mt-[.2em]">{capitalize(level)}</span>
        </div>
        <div
          role="tooltip"
          className="pointer-events-none absolute left-0 top-full z-50 mt-2 hidden w-64 rounded-lg border border-lighter-grey bg-white px-4 py-3 text-left opacity-100 shadow-xl group-hover:block"
        >
          <p className="inter text-sm font-semibold text-[#111111]">{capitalize(level)}</p>
          <p className="inter mt-1.5 text-sm font-normal normal-case leading-6 text-dark-grey">
            {description}
          </p>
        </div>
      </div>
    </th>
  )
}

export default function StrengthStandardsTable() {
  const { activeExercises } = useContext(ActiveExercisesContext)
  const [standards, setStandards] = useState<{ [key:string]: (Standard & { active?: boolean })[] }>({})
  const [selectedValues, setSelectedValues] = useState<StandardsDropdownSelection>()
  const [userProfile, setUserProfile] = useState<Profile>()
  const weight: { [key: string]: number[] } = {
    male: Array.from({length: 201}, (_, i) => i + 110),
    female: Array.from({length: 171}, (_, i) => i + 90)
  }
  const [weightOptions, setWeightOptions] = useState(weight.female)
  const genders = ['MALE', 'FEMALE']
  const age = Array.from({length: 76}, (_, i) => i + 14)
  const NON_STANDARD_UNITS: { [key: string]: string } = {
    DEAD_HANG: 'sec',
    BROAD_JUMP: 'in',
    FARMER_CARRY: 'lbs ea.'
  }

  function setDropdownValue(obj: { [key: string]: string | number }) {
    if (!selectedValues || isEmpty(selectedValues)) return
    setSelectedValues({...selectedValues, ...obj})
  }

  const determineIfStandardsActive = (standards: { [key: string]: (Standard & { active?: boolean })[] }, activeExercises: ExercisesOnProfiles[]) => {
    for (const [key, value] of Object.entries(standards)) {
      const isActive = activeExercises.find(ex => ex.exerciseId === get(value, '[0].id'))?.active
      standards[key] = standards[key].map(standard => {
        standard.active = isActive
        return standard
      })
    }
  }

  const fetchStandards = async ({ gender, weight, age }: StandardsDropdownSelection) => {
    try {
      if (!gender || !weight || !age) return

      let standards
      const exercises = map(activeExercises, 'exercise.exerciseName')
      const exerciseNames = exercises.join(', ')
      const res = await fetch(
        `/api/standards?gender=${gender}&age=${age}&bodyWeight=${weight}&exerciseNames=${exerciseNames}`
      )

      if (res) standards = await res.json()

      if (standards) setStandards(standards)

      if (activeExercises) determineIfStandardsActive(standards, activeExercises)
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    (async () => {
      if (selectedValues && !isEmpty(selectedValues)) {
        fetchStandards(selectedValues)
      }
    })()
  }, [selectedValues])

  useEffect(() => {
    (async () => {
      const session = await getSession()
      const gender = get(session, 'userData.profile.gender', 'MALE')
      const weight    = get(session, 'userData.profile.bodyWeight', 160)
      const age        = get(session, 'userData.profile.age', 30)
      const profile = get(session, 'userData.profile')
      setSelectedValues({gender, weight, age})
      setUserProfile(profile)
    })()
  }, [])

  const nonStandardStandards = (activeExercises || [])
    .filter((exercise: UserSavedExercise) => {
      return exercise.active && NON_STANDARD_EXERCISES.includes(exercise.exercise.exerciseName)
    })
    .map((exercise: UserSavedExercise) => {
      const exerciseName = exercise.exercise.exerciseName
      const bodyWeight = userProfile?.bodyWeight || 0
      const height = userProfile?.height || 0

      switch (exerciseName) {
        case 'DEAD_HANG':
          // Novice: practical entry standard (~30s); higher tiers match standards-helpers
          return {
            displayName: exercise.exercise.displayName,
            unit: NON_STANDARD_UNITS[exerciseName],
            values: [30, 60, 90, 120, 180]
          }
        case 'BROAD_JUMP':
          // Novice: below intermediate (height - 1); at least 1 in when height is small
          return {
            displayName: exercise.exercise.displayName,
            unit: NON_STANDARD_UNITS[exerciseName],
            values: [
              Math.max(1, height - 2),
              Math.max(height - 1, 1),
              height,
              height + 1,
              height + 2
            ]
          }
        case 'FARMER_CARRY': {
          // Novice: ~25 lb ea at ~200 lb BW (12.5%), scaled per person; floor so tiny BWs still read sensibly
          const farmerNovice = Math.max(10, Math.round(bodyWeight * 0.125))
          return {
            displayName: exercise.exercise.displayName,
            unit: NON_STANDARD_UNITS[exerciseName],
            values: [
              farmerNovice,
              Math.round(bodyWeight * 0.25),
              Math.round(bodyWeight * 0.5),
              Math.round(bodyWeight * 0.75),
              Math.round(bodyWeight)
            ]
          }
        }
        default:
          return undefined
      }
    })
    .filter(Boolean)

  return (
    <div className="bg-light-grey">
      <div className="px-10 pt-10 pb-5 flex justify-between">
        <h3 className="uppercase my-auto">Strength Standards</h3>
        <div className="flex">
          {
            selectedValues
              ?
                <>
                  <CustomDropdown type="gender" options={genders} initialValue={selectedValues?.gender} setValue={setDropdownValue} dropdownHeight="h-[5.1em]" propClasses="ml-4" />
                  <CustomDropdown type="weight" options={weightOptions} initialValue={selectedValues?.weight} setValue={setDropdownValue} units="lbs" propClasses="ml-4" dropdownHeight="h-[10em]" />
                  <CustomDropdown type="age"    options={age} initialValue={selectedValues?.age} setValue={setDropdownValue} propClasses="ml-4" units="years"  dropdownHeight="h-[10em]" />
                </>
              : ''
          }
        </div>
      </div>

      <div className="flex justify-center overflow-visible px-[2.35em] pb-20">
        <table className="w-full table-fixed border-collapse overflow-visible rounded border bg-white" cellPadding="20">
          <thead>
            <tr>
              <th align="left" className="w-1/3 inter font-normal text-xs uppercase opacity-80 text-dark-grey">Exercise Name</th>
              {STRENGTH_CLASSIFICATIONS.map(({ level, description }) => (
                <ClassificationHeader key={level} level={level} description={description} />
              ))}
            </tr>
          </thead>
          <tbody>
            <>
              {
                (() => {
                  const arr = []
                  for (const [exerciseName, standardsRecords] of Object.entries(standards)) {
                    const isActive = get(standardsRecords, '[0].active')
                    if (isActive) {
                      const el = (
                        <tr className="h-12 border-b border-lighter-grey" key={exerciseName}>
                          <td className="inter font-medium text-sm">{get(standardsRecords, '[0].displayName')}</td>
                          {
                            standardsRecords.map((record, i) => {
                              return (
                                <td key={i}>{record.startRepRange} { record.startRepRange === 1 ? 'rep' : 'reps' }</td>
                              )
                            })
                          }
                        </tr>
                      )
                      arr.push(el)
                    }
                  }
                  return arr
                })()
              }
              {
                nonStandardStandards.map((exercise: any) => {
                  return (
                    <tr className="h-12 border-b border-lighter-grey" key={exercise.displayName}>
                      <td className="inter font-medium text-sm">{exercise.displayName}</td>
                      {
                        exercise.values.map((value: number, i: number) => {
                          return (
                            <td key={i}>{value} {exercise.unit}</td>
                          )
                        })
                      }
                    </tr>
                  )
                })
              }
            </>
          </tbody>
        </table>
      </div>
    </div>
  )
}
