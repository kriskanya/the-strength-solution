'use client'

import Image from 'next/image'
import downArrow from '@/app/icons/down-arrow.svg'
import upArrow from '@/app/icons/up-arrow.svg'
import { useCallback, useEffect, useRef, useState } from 'react'
import { capitalize, debounce, get, isString } from 'lodash-es'
import classes from './CustomDropdown.module.css'

interface Props {
  options: string[] | number[],
  initialValue: string | number,
  dropdownHeight: string,
  units?: string,
  propClasses?: string,
}

export default function CustomDropdown({ options, initialValue, units, propClasses, dropdownHeight }: Props) {
  const [showDropdown, setShowDropdown] = useState(false)
  const [selectedOption, setSelectedOption] = useState<string | number>(initialValue)
  const [itemHovered, setItemHovered] = useState(initialValue)
  const dropdown = useRef(null)
  const searchRef = useRef('')
  // useCallback lets you cache a function definition between re-renders
  const searchDropdown = useCallback(debounce(searchList, 700, {}), []);

  function scrollToSelectedOption(name: string | number) {
    const el = document.querySelector(`[data-name="${ name }"]`)
    el && el.scrollIntoView({ block: 'nearest' })
  }
  function searchList(searchValue: string) {
    const regex = new RegExp(`^${ searchValue }`)
    const optionFound = options.find(option => {
      return regex.test(option+'')
    })
    if (optionFound) {
      setSelectedOption(optionFound)
      setItemHovered(optionFound)
      scrollToSelectedOption(optionFound)
    }
    searchRef.current = ''
  }

  function selectDropdownItem(direction: 'up' | 'down') {
    // @ts-ignore
    const currentSelectionIndex: number = options.indexOf(selectedOption)
    switch(direction) {
      case 'up': {
        const newSelection = options[currentSelectionIndex - 1]
        // @ts-ignore
        if (options.indexOf(newSelection) === -1) return
        setSelectedOption(newSelection)
        setItemHovered(newSelection)
        break
      }
      case 'down': {
        const newSelection = options[currentSelectionIndex + 1]
        // @ts-ignore
        if (options.indexOf(newSelection) === -1) return
        setSelectedOption(newSelection)
        setItemHovered(newSelection)
        break
      }
    }
  }

  // listener for user searching a dropdown via the keyboard
  useEffect(() => {
    // only add the event listener when the dropdown is opened
    if (!showDropdown) return;
    function handleKeydown(event: any) {
      if (event.keyCode !== 13) {
        searchRef.current = searchRef.current + event.key
        searchDropdown(searchRef.current)
      }
    }
    window.addEventListener('keydown', handleKeydown);
    return () => window.removeEventListener('keydown', handleKeydown);
  }, [showDropdown, searchDropdown]);

  // listener for the 'enter' or up/down arrow keypress
  useEffect(() => {
    if (!showDropdown) return;
    function handleKeydown(event: any) {
      if (event.keyCode === 13) {
        setSelectedOption(itemHovered)
        setShowDropdown(false)
      } else if (event.keyCode === 38) {
        selectDropdownItem('up')
      } else if (event.keyCode === 40) {
        selectDropdownItem('down')
      }
    }
    window.addEventListener('keydown', handleKeydown);
    return () => window.removeEventListener('keydown', handleKeydown);
  }, [itemHovered, showDropdown]);

  function mouseEnter(event: any) {
    const itemHovered = get(event, `target.attributes['data-name'].value`, '')
    setItemHovered(itemHovered)
  }

  function onSelect(event: any) {
    const option = get(event, `target.attributes['data-name'].value`, '')
    setSelectedOption(option)
    setShowDropdown(false)
  }

  // listener for closing the dropdown if the user clicks outside of it
  useEffect(() => {
    // only add the event listener when the dropdown is opened
    if (!showDropdown) return;

    function handleClick(event: any) {
      // @ts-ignore
      if (dropdown.current && !dropdown.current.contains(event.target)) {
        setShowDropdown(false);
      } else {
        // scroll to selected item
        scrollToSelectedOption(selectedOption)
        setItemHovered(selectedOption)
      }
    }
    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, [showDropdown]);

  return (
    <div className={`cursor-pointer ${ propClasses || '' }`} ref={dropdown}>
      <div className="w-[131px] h-[40px] border border-lighter-grey rounded flex justify-between bg-white select-none"
           onClick={() => setShowDropdown(!showDropdown)}
      >
        <span className="mt-2 ml-2">{
          isString(selectedOption)
            ? `${ capitalize(selectedOption) } ${ units || '' }`
            : `${ selectedOption } ${ units || '' }` }
        </span>
        {
          showDropdown
            ? <Image src={upArrow} alt="up-arrow" className="mr-2" />
            : <Image src={downArrow} alt="down-arrow" className="mr-2" />
        }
      </div>
      {
        showDropdown
          ? (
            <div className={`bg-white ${ dropdownHeight } ${ classes.dropdownBody } absolute overflow-y-scroll border-b border-l border-r border-lighter-grey z-10`}>
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