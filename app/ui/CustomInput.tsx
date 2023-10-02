import { capitalize } from 'lodash-es'

interface Props {
  fieldName: string,
  placeholder: string,
  type: 'text' | 'password'
}

export default function CustomInput(props: Props) {
  return (
    <div>
      <label className="inter font-semibold text-sm" htmlFor={props.fieldName}>{capitalize(props.fieldName)}</label>
      <div>
        <input type={props.type} className="w-full h-[48px] border rounded px-5" placeholder={props.placeholder} id={props.fieldName}/>
      </div>
    </div>
  )
}