import CustomDropdown from '@/app/ui/CustomDropdown'

export default function StrengthStandardsTable() {
  const genders = ['male', 'female']
  const weight = Array.from({length: 20}, (_, i) => i + 100)
  const age = [26, 27, 28]

  return (
    <div className="px-10 py-7 flex justify-between">
      <h3 className="uppercase my-auto">Strength Standards</h3>
      <div className="flex">
        <CustomDropdown options={genders} initialValue="female" dropdownHeight="h-[5.1em]" />
        <CustomDropdown options={weight} initialValue={101} units="lbs" propClasses="ml-4" dropdownHeight="h-[7em]" />
        <CustomDropdown options={age} initialValue={27} units="years" propClasses="ml-4" dropdownHeight="h-[7em]" />
      </div>
    </div>
  )
}
