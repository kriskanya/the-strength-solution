'use client'
import classes from './CustomCheckbox.module.css'
import { useState } from 'react'

interface Props {
  checked: boolean,
  label: string,
  id: string
}

export default function CustomCheckbox({ checked, label, id }: Props) {
  const [isChecked, setIsChecked] = useState(checked);

  return (
    <div className={`${classes.checkboxWrapper} flex items-center h-16 w-80 px-3 border border-lighter-grey rounded bg-white`}>
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
    </div>
  )
}