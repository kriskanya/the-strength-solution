import Image from 'next/image'
import questionMark from '@/app/icons/question-mark.svg'
import ellipseBlack from '@/app/images/ellipse-black.svg'
import ellipseBlue from '@/app/images/ellipse-blue.svg'
import { CustomChip } from '@/app/ui/CustomChip'
import { capitalize } from 'lodash-es'

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
      {/*strength level*/}
      <div className="align-top h-[194px] w-[319px] px-5 py-5 border border-bright-white border-opacity-10 rounded-lg inline-block">
        <p className="inter font-normal text-bright-white text-xs opacity-50 capitalize inline-block">
          Strength Level
        </p>
        <Image src={questionMark} alt="question-mark" className="inline-block ml-3" />
        <div className="mt-8 relative">
          <div>
            <p className="inter font-semibold text-lg leading-6 text-bright-white">Intermediate</p>
            <p className="inter font-normal text-bright-white text-xs opacity-50 capitalize mt-1">SCORE:</p>

            {/*todo: make image dynamic based on score*/}
            <Image src={ellipseBlack} alt="" className="absolute right-6 -top-3" />
            <p className="inter font-semibold text-lg leading-6 text-bright-white absolute right-[2.6em] top-[.9em]">13.2</p>
            <Image src={ellipseBlue} alt="" className="absolute right-0 -top-8" />
          </div>
        </div>
      </div>

      <div className="inline-block ml-4">
        {/*strongest lift*/}
        <div className="h-[88px] w-[227px] px-5 py-3 border border-bright-white border-opacity-10 rounded-lg">
          <p className="inter font-normal text-bright-white text-xs opacity-50 capitalize inline-block">
            Strongest Lift
          </p>
          <Image src={questionMark} alt="question-mark" className="inline-block ml-3" />
          <p className="inter font-semibold text-lg leading-6 text-bright-white mt-1">Deadlift</p>
        </div>

        {/*weakest lift*/}
        <div className="h-[88px] w-[227px] mt-4 px-5 py-3 border border-bright-white border-opacity-10 rounded-lg">
          <p className="inter font-normal text-bright-white text-xs opacity-50 capitalize inline-block">
            Weakest Lift
          </p>
          <Image src={questionMark} alt="question-mark" className="inline-block ml-3" />
          <p className="inter font-semibold text-lg leading-6 text-bright-white mt-1">Back Squat</p>
        </div>
      </div>

      {/*exercise list*/}
      <div className="w-[35.1em] mt-3 px-5 py-5 border border-bright-white border-opacity-10 rounded-lg">
        <table className="w-full">
          <tbody>
            <tr>
              <th align="left" className="inter font-normal text-bright-white text-xs opacity-50 capitalize">Exercise</th>
              <th align="center" className="inter font-normal text-bright-white text-xs opacity-50 capitalize">Reps</th>
              <th align="right" className="inter font-normal text-bright-white text-xs opacity-50 capitalize">Strength Level</th>
            </tr>
            {
              exerciseProficiency.map((exercise, i) => {
                return (
                  <tr className="leading-6 h-12" key={i}>
                    <td className="inter font-normal text-base text-bright-white">{exercise.name}</td>
                    <td align="center" className="inter font-normal text-base text-bright-white">{exercise.reps}</td>
                    <td align="right" className="inter font-normal text-base text-bright-white">
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