import { capitalize } from 'lodash-es'

interface Props {
  field: string
}

export default function GenericInput(props: Props) {
  return (
    <div className="flex flex-col relative">
      <label className="inter font-medium text-sm" htmlFor="weight">{capitalize(props.field)}</label>
      <input
        className="px-3 border border-light-grey w-[201px] h-[48px] rounded" type="text" name="weight" id="weight"
      />
      {
        props.field === 'weight'
          ? <span className="absolute left-40 top-8">lbs</span>
          : ''
      }
    </div>
  )
}