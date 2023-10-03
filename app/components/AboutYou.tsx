'use client'
import { GenderRadioButton } from '@/app/ui/GenderRadioButton'
import { ChangeEvent, useState } from 'react'
import Image from 'next/image'
import GenericInput from '@/app/ui/GenericInput'
import CustomButton from '@/app/ui/CustomButton'
import maleAvatar from '../images/male-avatar.svg'
import femaleAvatar from '../images/female-avatar.svg'
import classes from './AboutYou.module.css'

export default function AboutYou() {
  const [selectedGender, setSelectedGender] = useState({ male: true, female: false })

  function onChangeGender(event: ChangeEvent<HTMLInputElement>) {
    const { name } = event.target
    if (name === 'male') {
      setSelectedGender({ male: true, female: false })
    } else {
      setSelectedGender({ male: false, female: true })
    }
  }

  return (
    <div className={`grid grid-cols-2`}>
      {/*left side*/}
      <div className={`flex flex-col items-center m-24`}>
        <div className={`h-4/6 relative`}>
          <h2 className="inter font-bold text-2xl">About You</h2>
          <p className="inter font-normal text-light-grey text-base mt-1">
            Please fill in the information so we can initialize your dashboard
          </p>
          <p className="mt-10 -mb-5 inter font-medium text-sm">Your gender</p>
          <div className="flex gap-5">
            <GenderRadioButton gender="male" checked={selectedGender.male} onChange={onChangeGender} />
            <GenderRadioButton gender="female" checked={selectedGender.female} onChange={onChangeGender} />
          </div>
          <div className="mt-4 flex gap-5">
            <GenericInput field="weight" />
            <GenericInput field="age" />
          </div>
          <div className="w-36 absolute bottom-0">
            <CustomButton label="Next" classes="bg-brand-blue h-10 mt-16" textClasses="font-semibold text-sm" />
          </div>
        </div>
      </div>
      {/*right side*/}
      <div className="relative w-full h-screen">
        <Image src={maleAvatar} alt="male-avatar" className="absolute top-48 left-4" />
        <Image src={femaleAvatar} alt="female-avatar" className="absolute left-56 top-24" />
      </div>
    </div>
  )
}