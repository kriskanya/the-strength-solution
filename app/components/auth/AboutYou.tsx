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
import { cloneDeep, get, isEmpty } from 'lodash-es'
import { useSession } from 'next-auth/react'
import { Alert } from '@/app/ui/Alert'
import { useRouter } from 'next/navigation'
import { UserStats } from '@/common/frontend-types-and-constants'
import { convertHeightFromInches, convertHeightToInches } from '@/app/components/auth/auth-helpers'

export default function AboutYou() {
  const router = useRouter()
  const [userStats, setUserStats] = useState<UserStats>()
  const [error, setError] = useState<string | null>(null)
  const { data:session } = useSession()

  const fetchProfileInformation = async () => {
    const profileId = get(session, 'userData.profileId')

    if (!profileId) {
      const stats = { gender: { male: true, female: false }, bodyWeight: 150, age: 25, heightFeet: 5, heightInches: 10 }
      setUserStats(stats)
      return
    }

    try {
      const res = await fetch(`/api/profile/${profileId}`)
      const data = await res.json()
      const { age, bodyWeight, gender, height }: { age: number, bodyWeight: number, gender: 'MALE' | 'FEMALE', height: number } = data
      const { heightFeet, heightInches } = convertHeightFromInches(height)
      const stats = { gender: { male: gender === 'MALE', female: gender === 'FEMALE' }, bodyWeight, age, heightFeet, heightInches }
      setUserStats(stats)
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    (async () => {
      if (!session) return

      await fetchProfileInformation()
    })()
  }, [session])

  function onChangeStat(event: ChangeEvent<HTMLInputElement>) {
    let { value } = event.target
    const fieldName = get(event, 'target.name')
    const stats = cloneDeep(userStats) as UserStats

    switch (fieldName) {
      case 'gender':
        if (value === 'male') {
          stats.gender = { male: true, female: false }
        } else if (value === 'female') {
          stats.gender = { male: false, female: true }
        }
        break
      case 'heightFeet':
      case 'heightInches':
      case 'bodyWeight':
      case 'age':
        // only allow numbers to be inputted
        value = value.replace(/\D/g,'')
        stats[fieldName] = +value
        break
    }
    setUserStats(stats)
  }

  const showError = (text: string) => {
    setError(text)
    setTimeout(() => setError(null), 5000)
  }

  const saveChanges = async (event: FormEvent) => {
    event.preventDefault()
    try {
      if (!session || !userStats) return

      const userId = get(session, 'userData.id')
      const height = convertHeightToInches(userStats.heightFeet, userStats.heightInches)
      const body = {
        userId: userId,
        gender: userStats.gender.male ? 'MALE' : 'FEMALE',
        bodyWeight: userStats.bodyWeight,
        age: userStats.age,
        height
      }
      const res = await fetch(`/api/profile`, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json'
        },
      })

      if (res?.status !== 200) {
        showError('There was an issue setting your stats')
      } else {
        router.push('/choose-workouts')
      }
    } catch (err: any) {
      showError('There was an issue setting your stats')
      console.log(err);
    }
  }

  return (
    !isEmpty(userStats) && userStats
      ?
        <>
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
                    <GenericInput field="bodyWeight" displayName="Body Weight" value={userStats.bodyWeight} onChange={onChangeStat} />
                    <GenericInput field="age" displayName="Age" value={userStats.age} onChange={onChangeStat} />
                  </div>
                  <div className="mt-5">
                    <h3 className="font-bold">Height</h3>
                    <div className="mt-2 md:flex md:gap-5">
                      <GenericInput field="heightFeet" displayName="Feet" value={userStats.heightFeet} onChange={onChangeStat} />
                      <GenericInput field="heightInches" displayName="Inches" value={userStats.heightInches} onChange={onChangeStat} />
                    </div>
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
        </>
      : ''
  )
}