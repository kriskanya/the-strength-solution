'use client'
import { capitalize } from 'lodash-es'

interface Props {
  tabName: 'workouts' | 'stats',
  checked: boolean,
  onChange: (event: any) => void
}

export function UpdateStatsTab(props: Props) {
  const selected = 'border-light-blue'
  const notSelected = 'border-lighter-grey bg-light-blue'
  const conditionalClasses = props.checked ? selected : notSelected
  const zIndex = props.checked ? 'z-10' : ''
  const margin = props.tabName === 'workouts' ? '-mr-1.5' : '-ml-1.5'

  return (
    <label className={`inter font-medium text-sm cursor-pointer ${zIndex} ${margin}`} htmlFor={props.tabName}>
      <input
        className="invisible"
        type="radio"
        name={props.tabName}
        id={props.tabName}
        value={props.tabName}
        onChange={props.onChange}
        checked={props.checked}
      />
      <div className={`flex justify-between items-center px-3 border bg-white ${conditionalClasses} w-[201px] h-[40px] rounded-lg`}>
        <span className={`mr-auto inter font-medium text-sm pl-5 text-center`}>{capitalize(props.tabName)}</span>
      </div>
    </label>
  )
}