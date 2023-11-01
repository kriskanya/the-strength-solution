'use client'
import { capitalize } from 'lodash-es'
import Image from 'next/image'
import male from '../icons/male.svg'
import female from '../icons/female.svg'
import checkmark from '../icons/checkmark.svg'

interface Props {
  gender: 'male' | 'female',
  checked: boolean,
  onChange: (event: any) => void
}

export function GenderRadioButton(props: Props) {
  const imgSrc = props.gender === 'male' ? male : female
  const borderColor = props.checked ? 'border-brand-blue' : 'border-lighter-grey'

  return (
    <label className="inter font-medium text-sm cursor-pointer" htmlFor={props.gender}>
      <input
        className="invisible"
        type="radio"
        name="gender"
        id={props.gender}
        value={props.gender}
        onChange={props.onChange}
        checked={props.checked}
      />
      <div className={`flex justify-between items-center px-3 border bg-white ${borderColor} w-[201px] h-[48px] rounded`}>
        <Image src={imgSrc} alt="male" />
        <span className="mr-auto inter font-medium text-sm pl-3 text-center">{capitalize(props.gender)}</span>
        {
          props.checked
            ? <Image src={checkmark} alt="checkmark" />
            : ''
        }
      </div>
    </label>
  )
}