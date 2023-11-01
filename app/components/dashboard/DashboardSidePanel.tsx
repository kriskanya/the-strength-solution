import Image from 'next/image'
import questionMark from '@/app/icons/question-mark.svg'
import { CustomChip } from '@/app/ui/CustomChip'
import { capitalize } from 'lodash-es'
import UpdateStatusDialog from '@/app/components/dashboard/UpdateStatsDialog'

export default function DashboardSidePanel() {
  const proficiencyLevels: { [key: string]: string } = {
    novice: 'bg-[#F25B28] w-[69px]',
    intermediate: 'bg-[#F4B43B] w-[107px]',
    advanced: 'bg-[#4CD964] w-[90px]'
  }
  const exerciseProficiency = [
    { name: 'Push-Ups', reps: 1, level: 'advanced' },
    { name: 'Goblet Squat', reps: 2, level: 'intermediate' },
    { name: 'Dips', reps: 4, level: 'intermediate' },
    { name: 'Chin-ups', reps: 4, level: 'advanced' },
    { name: 'Bench Press', reps: 2, level: 'novice' }
  ]


  return (
    <div>
      <div className="flex justify-between w-[35.1em]">
        {/*strongest lift*/}
        <div className="h-[5.5em] w-[17em] px-5 py-3 border border-white border-opacity-10 rounded-lg">
          <p className="inter font-normal text-white text-xs opacity-50 capitalize inline-block">
            Strongest Lift
          </p>
          <Image src={questionMark} alt="question-mark" className="inline-block ml-3" />
          <p className="inter font-semibold text-lg leading-6 text-white mt-1">Deadlift</p>
        </div>

        {/*weakest lift*/}
        <div className="h-[5.5em] w-[17em] px-5 py-3 border border-white border-opacity-10 rounded-lg">
          <p className="inter font-normal text-white text-xs opacity-50 capitalize inline-block">
            Weakest Lift
          </p>
          <Image src={questionMark} alt="question-mark" className="inline-block ml-3" />
          <p className="inter font-semibold text-lg leading-6 text-white mt-1">Back Squat</p>
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
              exerciseProficiency.map((exercise, i) => {
                return (
                  <tr className="leading-6 h-12" key={i}>
                    <td className="inter font-normal text-base text-white">{exercise.name}</td>
                    <td align="center" className="inter font-normal text-base text-white">{exercise.reps}</td>
                    <td align="right" className="inter font-normal text-base text-white">
                      <CustomChip classes={`uppercase text-black ${ proficiencyLevels[exercise.level as keyof { [key: string]: string }] }`}>
                        { capitalize(exercise.level) }
                      </CustomChip>
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