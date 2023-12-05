'use client'
import Image from 'next/image'
import questionMark from '@/app/icons/question-mark.svg'
import { CustomChip } from '@/app/ui/CustomChip'
import { capitalize, isEmpty, map } from 'lodash-es'
import { useContext, useEffect, useState } from 'react'
import { ActiveExercisesContext } from '@/app/store/exercises-context'
import { determineStrongestAndWeakestExercises } from '@/app/components/dashboard/dashboard-helpers-and-constants'
import { UserSavedExercise } from '@/common/shared-types-and-constants'

export default function DashboardSidePanel() {
  const { activeExercises, setActiveExercises } = useContext(ActiveExercisesContext)
  const [strongestExercises, setStrongestExercises] = useState<UserSavedExercise[]>()
  const [weakestExercises, setWeakestExercises] = useState<UserSavedExercise[]>()
  const proficiencyLevels: { [key: string]: string } = {
    NOVICE: 'bg-[#F25B28] w-[69px]',
    INTERMEDIATE: 'bg-[#F4B43B] w-[107px]',
    PROFICIENT: 'bg-[#FCFF4B] w-[98px]',
    ADVANCED: 'bg-[#4CD964] w-[90px]',
    ELITE: 'bg-[#2E8EEC] w-[69px]'
  }

  useEffect(() => {
    if (!isEmpty(activeExercises)) {
      const { strongestExercises, weakestExercises } = determineStrongestAndWeakestExercises(activeExercises as UserSavedExercise[])
      setStrongestExercises(strongestExercises)
      setWeakestExercises(weakestExercises)
    }
  }, [activeExercises]);

  return (
    <div className="flex items-center">
      <div>
        <div className="flex justify-between w-[35.1em]">
          {/*strongest exercises*/}
          <div className="h-[5.5em] w-[17em] px-5 py-3 border border-white border-opacity-10 rounded-lg">
            <p className="inter font-normal text-white text-xs opacity-50 inline-block">
              Strongest Exercise(s)
            </p>
            <Image src={questionMark} alt="question-mark" className="inline-block ml-3" />
            <p className="inter font-semibold text-lg leading-6 text-white mt-1">
              {
                !isEmpty(strongestExercises) && map(strongestExercises, 'loggedExercise.displayName')?.join(', ')
              }
            </p>
          </div>

          {/*weakest exercises*/}
          <div className="h-[5.5em] w-[17em] px-5 py-3 border border-white border-opacity-10 rounded-lg">
            <p className="inter font-normal text-white text-xs opacity-50 inline-block">
              Weakest Exercise(s)
            </p>
            <Image src={questionMark} alt="question-mark" className="inline-block ml-3" />
            <p className="inter font-semibold text-lg leading-6 text-white mt-1">
              {
                !isEmpty(weakestExercises) && map(weakestExercises, 'loggedExercise.displayName')?.join(', ')
              }
            </p>
          </div>
        </div>

        {/*exercise list*/}
        <div className="w-[35.1em] mt-3 px-5 py-5 border border-white border-opacity-10 rounded-lg">
          <table className="w-full">
            <tbody>
            <tr>
              <th align="left" className="inter font-normal text-white text-xs opacity-50 capitalize">Exercise</th>
              <th align="center" className="inter font-normal text-white text-xs opacity-50 capitalize">Reps</th>
              <th align="right" className="inter font-normal text-white text-xs opacity-50 capitalize">Strength Level</th>
            </tr>
            {
              activeExercises && activeExercises.map((exercise, i) => {
                return (
                  exercise.active
                    ? (
                      <tr className="leading-6 h-12" key={i}>
                        <td className="inter font-normal text-base text-white">{exercise?.exercise?.displayName}</td>
                        <td align="center" className="inter font-normal text-base text-white">{exercise?.loggedExercise?.quantity}</td>
                        <td align="right" className="inter font-normal text-base text-white">
                          <CustomChip classes={`uppercase text-black ${ proficiencyLevels[exercise?.loggedExercise?.level as keyof { [key: string]: string }] }`}>
                            { capitalize(exercise?.loggedExercise?.level) }
                          </CustomChip>
                        </td>
                      </tr>
                    )
                    : ''
                )
              })
            }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}