'use client'
import classes from './CustomCheckbox.module.css'
import { useState } from 'react'

interface Props {
  checked: boolean,
  label: string,
  id: string,
  showRepsInput?: boolean
}

export default function CustomCheckbox({ checked, label, id, showRepsInput }: Props) {
  const [isChecked, setIsChecked] = useState(checked);

  return (
    <div className={`${classes.checkboxWrapper} flex items-center justify-between h-16 w-80 px-3 border border-lighter-grey rounded bg-white`}>
      <label className="flex justify-center" htmlFor={id}>
        <input
          id={id}
          type="checkbox"
          checked={isChecked}
          onChange={() => setIsChecked((prev) => !prev)}
          className={isChecked ? classes.checked : ""}
        />
        <span className="inter font-medium text-sm text-custom-black opacity-80">{label}</span>
      </label>
      {
        showRepsInput && isChecked
          ? (
            <label className="relative" htmlFor={`reps-${id}`}>
              <input
                id={`reps-${id}`}
                type="text"
                className="inter font-bold text-sm w-28 h-10 border rounded-lg text-right px-2"
              />
              <span className="absolute top-2.5 left-3 inter font-medium text-sm text-custom-black opacity-80">Reps</span>
            </label>
          )
          : ''
      }

    </div>
  )
}