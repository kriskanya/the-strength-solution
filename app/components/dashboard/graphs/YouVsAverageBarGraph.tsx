'use client'
import { calculateWidth, exercises, getAverage } from '@/app/components/dashboard/dashboard-helpers-and-constants'
import { useEffect, useState } from 'react'

export default function YouVsAverageBarGraph() {
  const [maxBarWidth, setMaxBarWidth] = useState<number | undefined>()

  useEffect(() => {
    setMaxBarWidth(window.innerWidth / 3)
  }, []);

  return maxBarWidth
    ?
      <div className="px-10 py-7">
        <div className="flex justify-between">
          <h3 className="uppercase">Your Current Strength Vs Proficient Level</h3>
          <div>
            <div className="h-[12px] w-[12px] bg-light-grey inline-block"></div>
            <p className="inline-block ml-3">Proficient</p>
          </div>
        </div>

        <table className="w-full">
          <tbody>
          {
            exercises.map((exercise, i) => {
              return (
                <tr className="h-14" key={i}>
                  <td>{exercise.name}</td>
                  <td className="border-b border-dashed">
                    <div className={`h-[16px] mt-1 bg-gradient-to-r from-[#F46A2C] via-[#FCFF4B] via-[#64D45E] to-[#4CD964]`}
                         style={{'width': calculateWidth(exercise.proficiency, maxBarWidth as number)}}
                    >
                    </div>
                    <div className={`h-[16px] mt-1 bg-light-grey`}
                         style={{'width': calculateWidth(getAverage(exercise.name), maxBarWidth as number)}}
                    >
                    </div>
                  </td>
                </tr>
              )
            })
          }
          </tbody>
        </table>

      </div>
    : ''
}