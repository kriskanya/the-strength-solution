import { capitalize } from 'lodash-es'

interface Props {
  tabName: 'workouts' | 'stats',
  checked: boolean,
  onChange: (event: any) => void
}

export function UpdateStatsTab({ tabName, checked, onChange }: Props) {
  const selected = 'border-light-blue bg-white'
  const notSelected = 'border-lighter-grey bg-blue-50'
  const conditionalClasses = checked ? selected : notSelected
  const zIndex = checked ? 'z-10' : ''
  const margin = tabName === 'workouts' ? '-mr-1.5' : '-ml-3'
  const opacity = checked ? '' : 'opacity-70'

  return (
    <label className={`inter font-medium text-sm cursor-pointer ${zIndex} ${margin}`} htmlFor={tabName}>
      <input
        className="invisible"
        type="radio"
        name={tabName}
        id={tabName}
        value={tabName}
        onChange={onChange}
        checked={checked}
      />
      <div className={`flex justify-between items-center px-3 border ${conditionalClasses} w-[201px] h-[40px] rounded-lg`}>
        <span className={`mr-auto inter font-medium text-sm text-center pl-5 ${opacity}`}>{capitalize(tabName)}</span>
      </div>
    </label>
  )
}