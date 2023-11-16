'use client'

import CustomDropdown from '@/app/ui/CustomDropdown'
import { useEffect, useState } from 'react'
import { get, isEmpty, map } from 'lodash-es'
import { ExercisesOnProfiles, Standard } from '@prisma/client'
import { getSession } from 'next-auth/react'
import { StandardsDropdownSelection } from '@/common/frontend-types'

interface Props {
  activeExercises: ExercisesOnProfiles[] | undefined
}

export default function StrengthStandardsTable({ activeExercises }: Props) {
  const [standards, setStandards] = useState<{ [key:string]: Standard[] }>({})
  const [selectedValues, setSelectedValues] = useState<StandardsDropdownSelection>()
  const weight: { [key: string]: number[] } = {
    male: Array.from({length: 201}, (_, i) => i + 110),
    female: Array.from({length: 171}, (_, i) => i + 90)
  }
  const [weightOptions, setWeightOptions] = useState(weight.female)
  const genders = ['MALE', 'FEMALE']
  const age = Array.from({length: 76}, (_, i) => i + 14)

  function setDropdownValue(obj: { [key: string]: string | number }) {
    if (!selectedValues || isEmpty(selectedValues)) return
    setSelectedValues({...selectedValues, ...obj})
  }

  const fetchStandards = async ({ gender, weight, age }: StandardsDropdownSelection) => {
    try {
      if (!gender || !weight || !age) return

      let data
      const exerciseNames = map(activeExercises, 'exercise.exerciseName').join(', ')
      const res = await fetch(
        `/api/standards?gender=${gender}&age=${age}&bodyWeight=${weight}&exerciseNames=${exerciseNames}`
      )
      if (res) {
        data = await res.json()
      }
      if (data) {
        setStandards(data)
      }
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    (async () => {
      const session = await getSession()
      const gender = get(session, 'userData.profile.gender', 'MALE')
      const weight    = get(session, 'userData.profile.bodyWeight', 160)
      const age        = get(session, 'userData.profile.age', 30)
      setSelectedValues({ gender, weight, age })
      fetchStandards({ gender, weight, age })
    })()
  }, [])

  return (
    <div className="bg-light-grey">
      <div className="px-10 pt-10 pb-5 flex justify-between">
        <h3 className="uppercase my-auto">Strength Standards</h3>
        <div className="flex">
          {
            selectedValues
              ?
                <>
                  <CustomDropdown type="gender" options={genders} initialValue={selectedValues?.gender} setValue={setDropdownValue} dropdownHeight="h-[5.1em]" />
                  <CustomDropdown type="weight" options={weightOptions} initialValue={selectedValues?.weight} setValue={setDropdownValue} units="lbs" propClasses="ml-4" dropdownHeight="h-[10em]" />
                  <CustomDropdown type="age"    options={age} initialValue={selectedValues?.age} setValue={setDropdownValue} propClasses="ml-4" units="years"  dropdownHeight="h-[10em]" />
                </>
              : ''
          }
        </div>
      </div>

      <div className="flex justify-center pb-20 px-[2.35em] rounded">
        <table className={`w-full table-fixed border bg-white border-collapse`} cellPadding="20">
          <thead className="">
            <tr className="">
              <th align="left" className="w-1/3 inter font-normal text-xs uppercase opacity-80 text-dark-grey">Exercise Name</th>
              <th align="left" className="inter font-normal text-xs uppercase opacity-80 text-dark-grey">
                <div className="flex items-center">
                  <div className="w-[12px] h-[12px] bg-red-novice"></div>
                  <span className="ml-1 mt-[.2em]">Novice</span>
                </div>
              </th>
              <th align="left" className="inter font-normal text-xs uppercase opacity-80 text-dark-grey">
                <div className="flex items-center">
                  <div className="w-[12px] h-[12px] bg-orange-intermediate"></div>
                  <span className="ml-1 mt-[.2em]">Intermediate</span>
                </div>
              </th>
              <th align="left" className="inter font-normal text-xs uppercase opacity-80 text-dark-grey">
                <div className="flex items-center">
                  <div className="w-[12px] h-[12px] bg-yellow-proficient"></div>
                  <span className="ml-1 mt-[.2em]">Proficient</span>
                </div>
              </th>
              <th align="left" className="inter font-normal text-xs uppercase opacity-80 text-dark-grey">
                <div className="flex items-center">
                  <div className="w-[12px] h-[12px] bg-green-advanced"></div>
                  <span className="ml-1 mt-[.2em]">Advanced</span>
                </div>
              </th>
              <th align="left" className="inter font-normal text-xs uppercase opacity-80 text-dark-grey">
                <div className="flex items-center">
                  <div className="w-[12px] h-[12px] bg-blue-elite"></div>
                  <span className="ml-1 mt-[.2em]">Elite</span>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            <>
              {(() => {
                const arr = []
                for (const [exerciseName, standardsRecords] of Object.entries(standards)) {
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
                return arr
              })()}
            </>
          </tbody>
        </table>
      </div>
    </div>
  )
}
