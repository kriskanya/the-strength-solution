import { GenderRadioButton } from '@/app/ui/GenderRadioButton'
import GenericInput from '@/app/ui/GenericInput'

interface Props {
  userStats: {
    gender: { male: boolean, female: boolean },
    bodyWeight: number,
    age: number
  },
  onChangeStat: (event: any) => void
}

export default function UpdateUserStats({ userStats, onChangeStat }: Props) {
  return (
    <div className="flex justify-center">
      <div>
        <p className="mt-10 -mb-4 inter font-medium text-sm">Your gender</p>
        <div className="md:flex md:gap-6">
          <GenderRadioButton gender="male" checked={userStats.gender.male} onChange={onChangeStat} />
          <GenderRadioButton gender="female" checked={userStats.gender.female} onChange={onChangeStat} />
        </div>
        <div className="mt-5 md:flex md:gap-6">
          <GenericInput field="bodyWeight" displayName="Body Weight" value={userStats.bodyWeight} onChange={onChangeStat} />
          <GenericInput field="age" displayName="Age" value={userStats.age} onChange={onChangeStat} />
        </div>
        <div className="mt-5 md:flex md:gap-6">
          <GenericInput field="heightFeet" displayName="Feet" value={userStats.heightFeet} onChange={onChangeStat} />
          <GenericInput field="heightInches" displayName="Inches" value={userStats.heightInches} onChange={onChangeStat} />
        </div>
      </div>
    </div>
  )
}