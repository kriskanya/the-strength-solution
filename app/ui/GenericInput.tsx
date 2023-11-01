import { capitalize } from 'lodash-es'

interface Props {
  field: string,
  value: string | number,
  onChange: (event: any) => void
}

export default function GenericInput({ field, value, onChange }: Props) {
  return (
    <div className="flex flex-col relative">
      <label className="inter font-medium text-sm mb-1" htmlFor="weight">{capitalize(field)}</label>
      <input
        className="px-3 border border-lighter-grey w-[201px] h-[48px] rounded"
        type="text"
        name="weight"
        id="weight"
        value={value}
        onChange={onChange}
      />
      {
        field === 'weight'
          ? <span className="absolute left-40 top-9">lbs</span>
          : ''
      }
    </div>
  )
}