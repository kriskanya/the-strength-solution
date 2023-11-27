import { capitalize } from 'lodash-es'
import { STRENGTH_CLASSIFICATIONS } from '@/app/components/dashboard/dashboard-helpers'

export default function StrengthClassifications() {
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
          STRENGTH_CLASSIFICATIONS.map(({ level, color, description}, i) => {
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