import { capitalize } from 'lodash-es'

export default function StrengthClassifications() {
  const classifications = [
    { level: 'novice', color: 'red', description: 'The lifter is weaker than the average untrained individual of the same sex and weight. Strength score <30' },
    { level: 'intermediate', color: 'orange', description: 'The lifter is weaker than the average untrained individual of the same sex and weight. Strength score <30' },
    { level: 'proficient', color: 'yellow', description: 'The lifter is weaker than the average untrained individual of the same sex and weight. Strength score <30' },
    { level: 'advanced', color: 'green', description: 'The lifter is weaker than the average untrained individual of the same sex and weight. Strength score <30' },
    { level: 'elite', color: 'blue', description: 'The lifter is weaker than the average untrained individual of the same sex and weight. Strength score <30' },
  ]

  function setMargin(elementIndex: number) {
    if (elementIndex === 0 || elementIndex === 3) {
      return 'mr-2 mb-4'
    } else if (elementIndex === 1 || elementIndex === 4) {
      return 'ml-2 mr-2 mb-4'
    } else if (elementIndex === 2) {
      return 'ml-2 mb-4'
    }
  }

  return (
    <div className="mx-10">
      <h3 className="uppercase">Strength Classifications</h3>
      <div className="grid grid-cols-3 auto-cols-max mt-10">
        {
          classifications.map(({ level, color, description}, i) => {
            return (
              <div key={i} className={`bg-white rounded px-4 py-5 ${ setMargin(i) }`}>
                <div className="flex items-center">
                  <div className={`w-[16px] h-[16px] bg-${color}-${level}`}></div>
                  <span className="inter text-sm font-normal uppercase ml-1 mt-[.1em]">{ capitalize(level) }</span>
                </div>
                <p className="inter font-normal text-sm text-dark-grey mt-2">{ description }</p>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}