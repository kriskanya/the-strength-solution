interface Props {
  field: string,
  displayName: string,
  value: string | number | undefined,
  onChange: (event: any) => void,
  autoComplete?: string,
}

const maxLength = (field: string): number => {
  return field === 'age'
    ? 2
    : field === 'bodyWeight'
      ? 3
      : 999
}

const determineUnitOfMeasurement = (field: string) => {
  switch (field) {
    case 'bodyWeight':
      return 'lbs.'
    case 'heightFeet':
      return 'ft.'
    case 'heightInches':
      return 'in.'
    default:
      return ''
  }
}

export default function GenericInput({ field, displayName, value, onChange, autoComplete }: Props) {
  const unitOfMeasurement = determineUnitOfMeasurement(field)

  return (
    <div className="flex flex-col relative">
      <label className="inter font-medium text-sm mb-1" htmlFor={field}>{displayName}</label>
      <input
        className={`px-3 border border-lighter-grey w-[201px] h-[48px] rounded`}
        type="text"
        name={field}
        id={field}
        value={value}
        onChange={onChange}
        maxLength={maxLength(field)}
        autoComplete={autoComplete}
      />
      {
        unitOfMeasurement
          ? <span className="absolute left-40 top-9">{unitOfMeasurement}</span>
          : ''
      }
    </div>
  )
}