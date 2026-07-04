import Link from 'next/link'
import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react'
import Image from 'next/image'
import eye from '../icons/eye-solid.svg'
import eyeSlash from '../icons/eye-slash-solid.svg'

function fieldNameToLabel(fieldName: string): string {
  return fieldName
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, (char) => char.toUpperCase())
    .trim()
}

interface Props {
  fieldName: string,
  placeholder: string,
  type: 'text' | 'password',
  inputValue: string,
  changeHandler: Dispatch<SetStateAction<string>>
  showForgotPassword?: boolean,
  passwordMatches?: boolean,
  required?: boolean
}

export default function CustomInput(props: Props) {
  const [inputType, setInputType] = useState(props.type)
  const isPasswordField = props.type === 'password'
  const showMatchIndicator = props.passwordMatches === true

  function togglePasswordVisibility() {
    inputType === 'password'
      ? setInputType('text')
      : setInputType('password')
  }

  const inputPaddingRight = isPasswordField
    ? showMatchIndicator
      ? 'pr-20'
      : 'pr-12'
    : ''

  const inputBorderClass = showMatchIndicator
    ? 'border-emerald-500 ring-2 ring-emerald-500/25'
    : ''

  return (
    <div>
      <div className="flex justify-between">
        <label className="inter font-semibold text-sm" htmlFor={props.fieldName}>{fieldNameToLabel(props.fieldName)}</label>
        {
          props.showForgotPassword
            ? <Link href="/forgot-password" className="inter font-medium text-sm text-brand-blue" tabIndex={-1}>Forgot your password?</Link>
            : ''
        }
      </div>
      <div className="relative">
        <input
          required={props.required}
          value={props.inputValue}
          onChange={(event: ChangeEvent<HTMLInputElement>) => props.changeHandler(event.target.value)}
          type={inputType}
          className={`w-full h-[48px] border rounded px-5 bg-[#FFFFFF] ${inputPaddingRight} ${inputBorderClass}`}
          placeholder={props.placeholder}
          id={props.fieldName}
        />
        {showMatchIndicator && (
          <>
            <svg
              className="absolute right-10 top-4 h-5 w-5 text-emerald-600"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M8.79992 15.9054L5.29992 12.4054C5.11507 12.2182 4.86297 12.1129 4.59992 12.1129C4.33687 12.1129 4.08478 12.2182 3.89992 12.4054C3.50992 12.7954 3.50992 13.4154 3.89992 13.8054L8.08992 17.9954C8.47992 18.3854 9.10992 18.3854 9.49992 17.9954L20.0999 7.40537C20.4899 7.01537 20.4899 6.39537 20.0999 6.00537C19.9151 5.81822 19.663 5.71289 19.3999 5.71289C19.1369 5.71289 18.8848 5.81822 18.6999 6.00537L8.79992 15.9054Z" />
            </svg>
            <span className="sr-only">Passwords match</span>
          </>
        )}
        {
          isPasswordField && (
            inputType === 'password'
              ? <Image src={eye} alt="Show password" className="absolute right-3 top-4 cursor-pointer" onClick={togglePasswordVisibility} />
              : <Image src={eyeSlash} alt="Hide password" className="absolute right-3 top-4 cursor-pointer" onClick={togglePasswordVisibility} />
          )
        }
      </div>
    </div>
  )
}