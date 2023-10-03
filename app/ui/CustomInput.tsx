import { capitalize } from 'lodash-es'
import Link from 'next/link'
import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react'
import Image from 'next/image'
import eye from '../icons/eye-solid.svg'
import eyeSlash from '../icons/eye-slash-solid.svg'

interface Props {
  fieldName: string,
  placeholder: string,
  type: 'text' | 'password',
  inputValue: string,
  changeHandler: Dispatch<SetStateAction<string>>
  showForgotPassword?: boolean
}

export default function CustomInput(props: Props) {
  const [inputType, setInputType] = useState(props.type)

  function togglePasswordVisibility() {
    inputType === 'password'
      ? setInputType('text')
      : setInputType('password')
  }

  return (
    <div>
      <div className="flex justify-between">
        <label className="inter font-semibold text-sm" htmlFor={props.fieldName}>{capitalize(props.fieldName)}</label>
        {
          props.showForgotPassword
            ? <Link href="forgot-password" className="inter font-medium text-sm text-brand-blue">Forgot your password?</Link>
            : ''
        }
      </div>
      <div className="relative">
        <input
          value={props.inputValue}
          onChange={(event: ChangeEvent<HTMLInputElement>) => props.changeHandler(event.target.value)}
          type={inputType}
          className="w-full h-[48px] border rounded px-5 bg-[#FFFFFF]"
          placeholder={props.placeholder}
          id={props.fieldName}
        />
        {
          props.fieldName === 'password' && (
            inputType === 'password'
              ? <Image src={eye} alt="show" className="absolute right-3 top-4 cursor-pointer" onClick={togglePasswordVisibility} />
              : <Image src={eyeSlash} alt="hide" className="absolute right-3 top-4 cursor-pointer" onClick={togglePasswordVisibility} />
          )
        }
      </div>
    </div>
  )
}