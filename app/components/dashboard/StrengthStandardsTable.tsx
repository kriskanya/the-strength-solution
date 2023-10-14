import CustomDropdown from '@/app/ui/CustomDropdown'
import classes from './StrengthStandards.module.css'

export default function StrengthStandardsTable() {
  const genders = ['male', 'female']
  const weight = Array.from({length: 200}, (_, i) => i + 90)
  const age = Array.from({length: 76}, (_, i) => i + 14)

  return (
    <div className="bg-light-grey">
      <div className="px-10 pt-10 pb-5 flex justify-between">
        <h3 className="uppercase my-auto">Strength Standards</h3>
        <div className="flex">
          <CustomDropdown options={genders} initialValue="female" dropdownHeight="h-[5.1em]" />
          <CustomDropdown options={weight} initialValue={150} units="lbs" propClasses="ml-4" dropdownHeight="h-[10em]" />
          <CustomDropdown options={age} initialValue={27} units="years" propClasses="ml-4" dropdownHeight="h-[10em]" />
        </div>
      </div>

      <div className="flex justify-center pb-20 px-[2.35em] rounded">
        <table className={`w-full table-fixed border bg-white border-collapse ${classes.tableContainer}`} cellPadding="20">
          <thead className="">
            <tr className="">
              <th align="left" className="w-1/3 inter font-normal text-xs uppercase opacity-80 text-dark-grey">Workout Name</th>
              <th align="left" className="inter font-normal text-xs uppercase opacity-80 text-dark-grey">
                <div className="flex items-center">
                  <div className="w-[12px] h-[12px] bg-red-novice"></div>
                  <span className="ml-1 mt-[.2em]">Novice</span>
                </div>
              </th>
              <th align="left" className="inter font-normal text-xs uppercase opacity-80 text-dark-grey">
                <div className="flex items-center">
                  <div className="w-[12px] h-[12px] bg-orange-intermediate"></div>
                  <span className="ml-1 mt-[.2em]">Intermediate</span>
                </div>
              </th>
              <th align="left" className="inter font-normal text-xs uppercase opacity-80 text-dark-grey">
                <div className="flex items-center">
                  <div className="w-[12px] h-[12px] bg-yellow-proficient"></div>
                  <span className="ml-1 mt-[.2em]">Proficient</span>
                </div>
              </th>
              <th align="left" className="inter font-normal text-xs uppercase opacity-80 text-dark-grey">
                <div className="flex items-center">
                  <div className="w-[12px] h-[12px] bg-green-advanced"></div>
                  <span className="ml-1 mt-[.2em]">Advanced</span>
                </div>
              </th>
              <th align="left" className="inter font-normal text-xs uppercase opacity-80 text-dark-grey">
                <div className="flex items-center">
                  <div className="w-[12px] h-[12px] bg-blue-elite"></div>
                  <span className="ml-1 mt-[.2em]">Elite</span>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="h-12 border-b border-lighter-grey">
              <td className="inter font-medium text-sm">Push-Ups</td>
              <td>1 rep</td>
              <td>3 reps</td>
              <td>4 reps</td>
              <td>4 reps</td>
              <td>5 reps</td>
            </tr>
            <tr className="h-12 border-b border-lighter-grey">
              <td className="inter font-medium text-sm">Inverted Row</td>
              <td>1 rep</td>
              <td>3 reps</td>
              <td>4 reps</td>
              <td>4 reps</td>
              <td>5 reps</td>
            </tr>
            <tr className="h-12">
              <td className="inter font-medium text-sm">Pull-Ups</td>
              <td>1 rep</td>
              <td>3 reps</td>
              <td>4 reps</td>
              <td>4 reps</td>
              <td>5 reps</td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>
  )
}
