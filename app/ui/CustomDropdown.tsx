'use client'

import Image from 'next/image'
import downArrow from '@/app/icons/down-arrow.svg'
import upArrow from '@/app/icons/up-arrow.svg'
import { useEffect, useRef, useState } from 'react'
import { capitalize, get, isString } from 'lodash-es'

interface Props {
  options: string[] | number[],
  initialValue: string,
  units?: string
}

export default function CustomDropdown({ options, initialValue, units }: Props) {
  const [showDropdown, setShowDropdown] = useState(false)
  const [selectedOption, setSelectedOption] = useState(initialValue)
  const [itemHovered, setItemHovered] = useState('')
  const dropdown = useRef(null);

  function mouseEnter(event: any) {
    const itemHovered = get(event, `target.attributes['data-name'].value`, '')
    setItemHovered(itemHovered)
  }

  function onSelect(event: any) {
    const option = get(event, `target.attributes['data-name'].value`, '')
    setSelectedOption(option)
    setShowDropdown(false)
  }

  useEffect(() => {
    // only add the event listener when the dropdown is opened
    if (!showDropdown) return;
    function handleClick(event: any) {
      if (dropdown.current && !dropdown.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }
    window.addEventListener('click', handleClick);
    // clean up
    return () => window.removeEventListener('click', handleClick);
  }, [showDropdown]);

  return (
    <div className="cursor-pointer" ref={dropdown}>
      <div className="w-[131px] h-[40px] border border-lighter-grey rounded flex justify-between bg-white select-none"
           onClick={() => setShowDropdown(!showDropdown)}
      >
        <span className="mt-2 ml-2">{ isString(selectedOption) ? capitalize(selectedOption): selectedOption }</span>
        {
          showDropdown
            ? <Image src={upArrow} alt="up-arrow" className="mr-2" />
            : <Image src={downArrow} alt="down-arrow" className="mr-2" />
        }
      </div>
      {
        showDropdown
          ? (
            <div className="bg-white">
              {
                options.map((option, i) => {
                  return (
                    <p className={`${ itemHovered == option ? 'bg-brand-blue text-white' : '' } w-[131px] px-2 py-2`}
                       data-name={option}
                       onMouseEnter={mouseEnter}
                       onMouseLeave={() => setItemHovered('')}
                       key={i}
                       onClick={onSelect}
                    >
                      {
                        (isString(option) ? capitalize(option): option) + (units ? ` ${ units }` : '')
                      }
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