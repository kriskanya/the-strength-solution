export default function RelativeStrengthBarGraph() {
  const MAX_BAR_WIDTH = 150 // in pixels
  const exercises = [
    { name: 'Push-Ups', proficiency: -500 },
    { name: 'Goblet Squat', proficiency: 20 },
    { name: 'Dips', proficiency: 300 },
    { name: 'Chin-Ups', proficiency: -5 },
    { name: 'Goblet Squat', proficiency: 15 }
  ]
  const highestProficiency = exercises.reduce((accumulator, current) => {
    const currentProficiency = Math.abs(current.proficiency)
    if (currentProficiency > accumulator) accumulator = currentProficiency
    return accumulator
  }, 0)
  function calculateWidth(input: number) {
    const minWidth = 35
    const calculatedWidth = (Math.abs(input) / highestProficiency) * MAX_BAR_WIDTH
    const result = calculatedWidth + minWidth
    return `${result}px`
  }

  return (
    <div className="px-10 py-7">
      <h3 className="uppercase">Relative Strengths and Weaknesses</h3>
      <div className="mt-8">
        <table className="w-full">
          <tbody>
            {
              exercises.map((exercise, i) => {
                return (
                  exercise.proficiency > 0
                    // blue bars
                    ? <tr className="h-12" key={i}>
                        <td>{exercise.name}</td>
                        <td className="border-b border-dashed">
                          <div className="w-[180px] h-[24px] inline-block"></div>
                          {/*vertical blue line*/}
                          <span className="border border-brand-blue pt-5 pb-2"></span>
                          <div className={`h-[24px] mt-1 inline-block bg-gradient-to-r from-[#007DD9] to-[#4845DA]`}
                               style={{'width': calculateWidth(exercise.proficiency)}}
                          >
                            <span className="inter font-normal text-xs leading-4 text-white float-right mr-1 mt-[.4em]">
                              +{exercise.proficiency}%
                            </span>
                          </div>
                        </td>
                      </tr>
                    // grey bars
                    : <tr className="h-12" key={i}>
                        <td>{exercise.name}</td>
                        <td className="border-b border-dashed">
                          <div className="w-[180px] h-[24px] inline-block">
                            <div className="bg-medium-grey float-right mt-1" style={{'width': calculateWidth(exercise.proficiency)}}>
                              <span className="inter font-normal text-xs text-white ml-1 align-middle">
                                {exercise.proficiency}%
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