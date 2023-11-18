import classes from './CustomCheckbox.module.css'
import { ChangeEvent } from 'react'

interface Props {
  isChecked: boolean,
  checkboxHandler: (evt: ChangeEvent<HTMLInputElement>) => void,
  inputHandler?: (evt: ChangeEvent<HTMLInputElement>) => void,
  name: string,
  label: string,
  id: string,
  showRepsInput?: boolean,
  reps?: number
}

export default function CustomCheckbox({ isChecked, checkboxHandler, inputHandler, label, name, id, showRepsInput, reps }: Props) {
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
        showRepsInput && isChecked
          ? (
            <label className="relative" htmlFor={`reps-${id}`}>
              <input
                name={name}
                id={`reps-${id}`}
                data-exercise_id={id}
                type="text"
                className="inter font-bold text-sm w-28 h-10 border rounded-lg text-right px-2"
                value={reps}
                onChange={inputHandler}
              />
              <span className="absolute top-2.5 left-3 inter font-medium text-sm text-custom-black opacity-80">Reps</span>
            </label>
          )
          : ''
      }
    </div>
  )
}