import classes from './CustomCheckbox.module.css'
import { ChangeEvent } from 'react'
import { MEASUREMENT_DISPLAY_VALUE } from '@/app/components/dashboard/dashboard-helpers-and-constants'

interface Props {
  isChecked: boolean,
  checkboxHandler: (evt: ChangeEvent<HTMLInputElement>) => void,
  inputHandler?: (evt: ChangeEvent<HTMLInputElement>) => void,
  name: string,
  label: string,
  id: string,
  showInputBox?: boolean,
  inputBoxLabel?: MEASUREMENT_DISPLAY_VALUE,
  quantity?: number
}

export default function CustomCheckbox({ isChecked, checkboxHandler, inputHandler, label, name, id, showInputBox, inputBoxLabel, quantity }: Props) {
  return (
    <div className={`${classes.checkboxWrapper} flex items-center justify-between h-16 w-80 px-3 border border-lighter-grey rounded bg-white`}>
      <label className="flex justify-center" htmlFor={id}>
        <input
          id={id}
          type="checkbox"
          name={name}
          checked={isChecked}
          onChange={checkboxHandler}
          className={isChecked ? classes.checked : ""}
        />
        <span className="inter font-medium text-sm text-custom-black opacity-80">{label}</span>
      </label>
      {
        showInputBox && isChecked
          ? (
            <label className="relative" htmlFor={`reps-${id}`}>
              <input
                name={name}
                id={`reps-${id}`}
                data-exercise_id={id}
                type="text"
                className="inter font-bold text-sm w-28 h-10 border rounded-lg text-right px-2"
                value={quantity}
                onChange={inputHandler}
              />
              <span className="absolute top-2.5 left-3 inter font-medium text-sm text-custom-black opacity-80">
                {inputBoxLabel}
                {/*{startCase(inputBoxLabel)}*/}
              </span>
            </label>
          )
          : ''
      }
    </div>
  )
}