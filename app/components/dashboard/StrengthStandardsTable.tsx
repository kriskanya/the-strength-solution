import CustomDropdown from '@/app/ui/CustomDropdown'

export default function StrengthStandardsTable() {
  const genders = ['male', 'female']
  const weight = [100, 101, 102]
  const age = [26, 27, 28]

  return (
    <div className="px-10 py-7">
      <h3 className="uppercase">Strength Standards</h3>
      <div className="flex">
        <CustomDropdown options={genders} initialValue="female" />
        <CustomDropdown options={weight} initialValue="101" units="lbs" />
        <CustomDropdown options={age} initialValue="27" units="years" />
      </div>
    </div>
  )
}
