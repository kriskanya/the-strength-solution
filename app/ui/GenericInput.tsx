import { capitalize } from 'lodash-es'

interface Props {
  field: string,
  value: string | number | undefined,
  onChange: (event: any) => void
}

const maxLength = (field: string): number => {
  return field === 'age'
    ? 2
    : field === 'bodyWeight'
      ? 3
      : 999
}

export default function GenericInput({ field, value, onChange }: Props) {
  return (
    <div className="flex flex-col relative">
      <label className="inter font-medium text-sm mb-1" htmlFor="weight">{capitalize(field)}</label>
      <input
        className="px-3 border border-lighter-grey w-[201px] h-[48px] rounded"
        type="text"
        name={field}
        id={field}
        value={value}
        onChange={onChange}
        maxLength={maxLength(field)}
      />
      {
        field === 'bodyWeight'
          ? <span className="absolute left-40 top-9">lbs</span>
          : ''
      }
    </div>
  )
}