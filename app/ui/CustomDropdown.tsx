'use client'

import Image from 'next/image'
import downArrow from '@/app/icons/down-arrow.svg'
import upArrow from '@/app/icons/up-arrow.svg'
import { useState } from 'react'
import { capitalize, get } from 'lodash-es'

export default function CustomDropdown() {
  const genders = ['male', 'female']
  const [dropdownSelected, setDropdownSelected] = useState(false)
  const [selectedGender, setSelectedGender] = useState('male')
  const [itemHovered, setItemHovered] = useState('')

  function mouseEnter(event: any) {
    const highlightedGender = get(event, `target.attributes['data-name'].value`, '')
    setItemHovered(highlightedGender)
  }

  function onSelect(event: any) {
    const gender = get(event, `target.attributes['data-name'].value`, '')
    setSelectedGender(gender)
    setDropdownSelected(false)
  }

  return (
    <div className="cursor-pointer">
      <div className="w-[131px] h-[40px] border border-lighter-grey rounded flex justify-between bg-white select-none"
           onClick={() => setDropdownSelected(!dropdownSelected)}
      >
        <span className="mt-2 ml-2">{ capitalize(selectedGender) }</span>
        {
          dropdownSelected
            ? <Image src={upArrow} alt="up-arrow" className="mr-2" />
            : <Image src={downArrow} alt="down-arrow" className="mr-2" />
        }
      </div>
      {
        dropdownSelected
          ? (
            <div className="bg-white">
              {
                genders.map((gender, i) => {
                  return (
                    <p className={`${ itemHovered === gender ? 'bg-brand-blue text-white' : '' } w-[131px] px-2 py-2`}
                       data-name={gender}
                       onMouseEnter={mouseEnter}
                       onMouseLeave={() => setItemHovered('')}
                       key={i}
                       onClick={onSelect}
                    >
                      { capitalize(gender) }
                    </p>
                  )
                })
              }
            </div>
          )
          : ''
      }
    </div>
  )
}