'use client'

import CustomDropdown from '@/app/ui/CustomDropdown'
import { useEffect, useState } from 'react'

export default function StrengthStandardsTable() {
  const [selectedValues, setSelectedValues] = useState({
    gender: 'female', weight: 150, age: 25
  })
  const weight: { [key: string]: number[] } = {
    male: Array.from({length: 201}, (_, i) => i + 110),
    female: Array.from({length: 171}, (_, i) => i + 90)
  }
  const [weightOptions, setWeightOptions] = useState(weight.female)
  const genders = ['male', 'female']
  const age = Array.from({length: 76}, (_, i) => i + 14)

  function setDropdownValue(obj: { [key: string]: string | number }) {
    setSelectedValues({...selectedValues, ...obj})
  }

  useEffect(() => {
    (async () => {
      setWeightOptions(weight[selectedValues.gender])
      const res = await fetch('/api/standards?gender=MALE&age=14&bodyWeight=130&exerciseName=DIPS', {
        method: 'GET'
      })
      console.log(res)
    })();

    return () => {
      // this now gets called when the component unmounts
    };
  }, [selectedValues]);

  return (
    <div className="bg-light-grey">
      <div className="px-10 pt-10 pb-5 flex justify-between">
        <h3 className="uppercase my-auto">Strength Standards</h3>
        <div className="flex">
          <CustomDropdown type="gender" options={genders} initialValue={selectedValues.gender} setValue={setDropdownValue} dropdownHeight="h-[5.1em]" />
          <CustomDropdown type="weight" options={weightOptions} initialValue={selectedValues.weight} setValue={setDropdownValue} units="lbs" propClasses="ml-4" dropdownHeight="h-[10em]" />
          <CustomDropdown type="age"    options={age} initialValue={selectedValues.age} setValue={setDropdownValue} propClasses="ml-4" units="years"  dropdownHeight="h-[10em]" />
        </div>
      </div>

      <div className="flex justify-center pb-20 px-[2.35em] rounded">
        <table className={`w-full table-fixed border bg-white border-collapse`} cellPadding="20">
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
