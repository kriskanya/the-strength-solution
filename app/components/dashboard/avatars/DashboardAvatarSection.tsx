import Image from 'next/image'
import FemaleAvatarFront from '@/app/components/dashboard/avatars/FemaleAvatarFront'
import proficiencyLegend from '@/app/images/proficiency-legend.svg'
import bgBlur from '@/app/images/blue-bg-blur-dashboard.svg'
import FemaleAvatarRear from '@/app/components/dashboard/avatars/FemaleAvatarRear'
import DashboardSidePanel from '@/app/components/dashboard/DashboardSidePanel'
import classes from './DashboardAvatarSection.module.css'
import MaleAvatarFront from '@/app/components/dashboard/avatars/MaleAvatarFront'
import MaleAvatarRear from '@/app/components/dashboard/avatars/MaleAvatarRear'
import { useContext, useEffect, useState } from 'react'
import { ActiveExercisesContext } from '@/app/store/exercises-context'
import {
  AvatarColors,
  colorsFront,
  colorsRear,
  LEGEND,
  maleAvatarPositions
} from '@/app/components/dashboard/dashboard-helpers-and-constants'
import { cloneDeep, get, isEmpty } from 'lodash-es'
import { useSession } from 'next-auth/react'

export default function DashboardAvatarSection() {
  const { activeExercises} = useContext(ActiveExercisesContext)
  const [fillColors, setFillColors] = useState<AvatarColors>({...colorsFront, ...colorsRear})
  const [originalFillColors, setOriginalFillColors] = useState<AvatarColors>({...colorsFront, ...colorsRear})
  const session = useSession()

  const setAvatarColors = () => {
    const avatarColors = cloneDeep(fillColors)
    for (const [key, value] of Object.entries(maleAvatarPositions)) {

      if (!activeExercises || isEmpty(activeExercises)) return

      const activeExercise = activeExercises.find(ex => ex?.exercise?.exerciseName === value.exercise)

      if (activeExercise?.loggedExercise?.level) {
        const level = activeExercise.loggedExercise.level
        if (avatarColors[key as keyof AvatarColors]) avatarColors[key as keyof AvatarColors] = LEGEND[level]
      } else {
        avatarColors[key as keyof AvatarColors] = LEGEND.NOT_SET
      }
    }
    setFillColors(avatarColors)
    setOriginalFillColors(cloneDeep(avatarColors))
  }

  useEffect(() => {
    setAvatarColors()
  }, [activeExercises]);

  return (
    <>
      <section className="bg-black-russian h-100 pb-10">
        <div className={`hidden h-[38em] xl:grid ${classes.container}`}>
          <Image src={bgBlur} alt="legend" className="absolute left-0 top-8" />
          <div className="w-220px relative ml-28 mt-6">
            {/*{*/}
            {/*  get(session, 'data.userData.profile.gender') === 'MALE'*/}
            {/*    ? <MaleAvatarFront fillColors={fillColors} setFillColors={setFillColors} originalFillColors={originalFillColors} />*/}
            {/*    : get(session, 'data.userData.profile.gender') === 'FEMALE'*/}
            {/*      ? <FemaleAvatarFront fillColors={fillColors} setFillColors={setFillColors} originalFillColors={originalFillColors} />*/}
            {/*      : ''*/}
            {/*}*/}
            {/*<FemaleAvatarFront fillColors={fillColors} setFillColors={setFillColors} originalFillColors={originalFillColors} />*/}
            <MaleAvatarFront fillColors={fillColors} setFillColors={setFillColors} originalFillColors={originalFillColors} />
            <div className="absolute bottom-6 right-20 z-0">
              <Image src={proficiencyLegend} alt="legend"/>
            </div>
          </div>
          <div className="">
            {/*{*/}
            {/*  get(session, 'data.userData.profile.gender') === 'MALE'*/}
            {/*    ? <MaleAvatarRear fillColors={fillColors} setFillColors={setFillColors} originalFillColors={originalFillColors} />*/}
            {/*    : get(session, 'data.userData.profile.gender') === 'FEMALE'*/}
            {/*      ? <FemaleAvatarRear fillColors={fillColors} setFillColors={setFillColors} originalFillColors={originalFillColors} />*/}
            {/*      : ''*/}
            {/*}*/}
            {/*<FemaleAvatarRear fillColors={fillColors} setFillColors={setFillColors} originalFillColors={originalFillColors} />*/}
            <MaleAvatarRear fillColors={fillColors} setFillColors={setFillColors} originalFillColors={originalFillColors} />
          </div>
          <DashboardSidePanel />
        </div>
        <div className="xl:hidden">
          <DashboardSidePanel />
        </div>
      </section>
    </>
  )
}