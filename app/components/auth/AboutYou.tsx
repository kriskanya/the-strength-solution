'use client'
import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import Image from 'next/image'
import { GenderRadioButton } from '@/app/ui/GenderRadioButton'
import GenericInput from '@/app/ui/GenericInput'
import CustomButton from '@/app/ui/CustomButton'
import maleAvatar from '../../images/male-avatar.svg'
import femaleAvatar from '../../images/female-avatar.svg'
import blueBlur from '../../images/blue-blur-background-small.svg'
import classes from './AboutYou.module.css'
import { cloneDeep, get } from 'lodash-es'
import { getSession } from 'next-auth/react'
import { Alert } from '@/app/ui/Alert'
import { useRouter } from 'next/navigation'
import { UserStats } from '@/common/frontend-types'

export default function AboutYou() {
  const router = useRouter()
  const [userStats, setUserStats] = useState<UserStats>({
    gender: { male: true, female: false }, bodyWeight: 150, age: 25 }
  )
  const [error, setError] = useState<string | null>(null)

  const fetchProfileInformation = async () => {
    const session = await getSession()
    const profileId = get(session, 'userData.profileId')

    if (!profileId) return

    try {
      const res = await fetch(`/api/profile/${profileId}`)
      const data = await res.json()
      const { age, bodyWeight, gender }: { age: number, bodyWeight: number, gender: 'MALE' | 'FEMALE' } = data
      const stats = { gender: { male: gender === 'MALE', female: gender === 'FEMALE' }, bodyWeight, age }
      setUserStats(stats)
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    (async () => {
      await fetchProfileInformation()
    })()
  }, [])

  function onChangeStat(event: ChangeEvent<HTMLInputElement>) {
    const { value } = event.target
    const fieldName = get(event, 'target.name')
    const stats = cloneDeep(userStats)

    switch (fieldName) {
      case 'gender':
        if (value === 'male') {
          stats.gender = { male: true, female: false }
        } else if (value === 'female') {
          stats.gender = { male: false, female: true }
        }
        break
      case 'bodyWeight':
      case 'age':
        stats[fieldName] = +value
        break
    }
    setUserStats(stats)
  }

  const saveChanges = async (event: FormEvent) => {
    event.preventDefault()
    try {
      const session = await getSession()
      const userId = get(session, 'userData.id')
      const body = {
        userId: userId,
        gender: userStats.gender.male ? 'male' : 'female',
        bodyWeight: userStats.bodyWeight,
        age: userStats.age
      }
      const res = await fetch(`/api/profile`, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json'
        },
      })
      router.push('/choose-workouts')
    } catch (err: any) {
      setError(err?.message || 'There was an issue setting your stats')
      setTimeout(() => setError(null), 5000)
      console.log(err);
    }
  }

  return (
    <form onSubmit={saveChanges}>
      <div className={`lg:grid lg:grid-cols-2 bg-off-white ${classes.setMaxHeight}`}>
        {/*left side*/}
        <div className="lg:flex lg:flex-col items-center m-24">
          <div className="h-4/6 relative">
            <h2 className="inter font-bold text-2xl">About You</h2>
            <p className="inter font-normal text-light-grey text-base mt-1">
              Please fill in your stats so we can initialize the dashboard
            </p>
            <p className="mt-10 -mb-4 inter font-medium text-sm">Your gender</p>
            <div className="md:flex md:gap-5">
              <GenderRadioButton gender="male" checked={userStats.gender.male} onChange={onChangeStat} />
              <GenderRadioButton gender="female" checked={userStats.gender.female} onChange={onChangeStat} />
            </div>
            <div className="mt-5 md:flex md:gap-5">
              <GenericInput field="bodyWeight" value={userStats.bodyWeight} onChange={onChangeStat} />
              <GenericInput field="age" value={userStats.age} onChange={onChangeStat} />
            </div>
            <div className="mt-6">
              {error && <Alert>{ error }</Alert>}
            </div>
            <div className="w-36 lg:absolute lg:bottom-0">
              <CustomButton type="submit" label="Next" classes="bg-brand-blue h-10 mt-16" textClasses="font-semibold text-sm text-white" />
            </div>
          </div>
        </div>
        {/*right side*/}
        <div className="relative w-full h-screen hidden lg:block">
          <Image src={maleAvatar} alt="male-avatar" className="absolute top-48 left-4 z-10" />
          <Image src={femaleAvatar} alt="female-avatar" className="absolute left-56 top-24 z-10" />
          <Image src={blueBlur} alt="" className="absolute right-30 top-24" />
        </div>
      </div>
    </form>
  )
}