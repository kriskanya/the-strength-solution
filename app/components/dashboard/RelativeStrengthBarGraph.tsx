export default function RelativeStrengthBarGraph() {
  function calculateWidth(input: number) {
    return `${(Math.abs(input) * 4.5)}px`
  }
  const exercises = [
    { name: 'Push-Ups', proficiency: -40 },
    { name: 'Goblet Squat', proficiency: 22 },
    { name: 'Dips', proficiency: 40 },
    { name: 'Chin-Ups', proficiency: -5 },
    { name: 'Goblet Squat', proficiency: 15 }
  ]

  return (
    <div className="px-10 py-7">
      <h3 className="uppercase">Relative Strengths and Weaknesses</h3>
      <div className="grid grid-cols-2 mt-8">
        <table>
          <tbody>
            {
              exercises.map((exercise, i) => {
                return (
                  exercise.proficiency > 0
                    ? <tr className="h-12" key={i}>
                        <td>{exercise.name}</td>
                        <td className="border-b border-dashed">
                          <div className="w-[180px] h-[24px] inline-block"></div>
                          {/*vertical blue line*/}
                          <span className="border border-brand-blue pt-4 pb-3"></span>
                          <div className={`h-[24px] inline-block bg-gradient-to-r from-[#007DD9] to-[#4845DA]`}
                               style={{'width': calculateWidth(exercise.proficiency)}}
                          >
                            <span className="inter font-normal text-xs leading-4 text-bright-white float-right mr-1 mt-[.4em]">
                              +{exercise.proficiency}
                            </span>
                          </div>
                        </td>
                      </tr>
                    : <tr className="h-12" key={i}>
                        <td>{exercise.name}</td>
                        <td className="border-b border-dashed">
                          <div className="w-[180px] h-[24px] inline-block">
                            <div className="bg-medium-grey float-right" style={{'width': calculateWidth(exercise.proficiency)}}>
                              <span className="inter font-normal text-xs leading-4 text-bright-white ml-1">
                                {exercise.proficiency}
                              </span>
                            </div>
                          </div>
                          {/*vertical blue line*/}
                          <span className="border border-brand-blue pt-4 pb-3"></span>
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