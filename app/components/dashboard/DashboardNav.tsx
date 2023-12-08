'use client'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

import CustomButton from '@/app/ui/CustomButton'
import UpdateStatusDialog from '@/app/components/dashboard/UpdateStatsDialog'
import { signOut, useSession } from 'next-auth/react'
import { get } from 'lodash-es'
import { convertHeightFromInches } from '@/app/components/auth/auth-helpers'
import { UserStats } from '@/common/frontend-types-and-constants'
import noProfilePic from '../../icons/no-profile-pic.svg'
import rightArrow from '../../icons/right-arrow.svg'
import logOut from '../../icons/log-out.svg'
import { useRouter } from 'next/navigation'
import AccountDetailsDialog from '@/app/components/dashboard/AccountDetailsDialog'

export default function DashboardNav() {
  const router = useRouter()
  const [showStatsDialog, setShowStatsDialog] = useState(false)
  const [showAcctDetailsDialog, setShowAcctDetailsDialog] = useState(false)
  const [userStats, setUserStats] = useState<UserStats>()
  const { data: session } = useSession()
  const menuItems = ['Account Details', 'About', 'Log Out']
  const [showMenu, setShowMenu] = useState<boolean>()
  const [itemHovered, setItemHovered] = useState<string>()
  const dropdown = useRef(null)

  const openDialog = async () => {
    const profileId = get(session, 'userData.profileId')

    try {
      const res = await fetch(`/api/profile/${profileId}`)
      const data = await res.json()
      const { age, bodyWeight, gender, height }: { age: number, bodyWeight: number, gender: 'MALE' | 'FEMALE', height: number } = data
      const { heightFeet, heightInches } = convertHeightFromInches(height)
      const stats = { gender: { male: gender === 'MALE', female: gender === 'FEMALE' }, bodyWeight, age, heightFeet, heightInches } as UserStats
      setUserStats(stats)
      setShowStatsDialog(true)
    } catch (err) {
      console.error('DashboardNav component', err)
    }
  }

  const displayUserName = () => {
    const firstName = get(session, 'userData.firstName') || ''
    const lastName = get(session, 'userData.lastName') || ''

    if (!firstName && !lastName) return '(No name set)'
    if (!firstName) return `${ lastName }`
    return `${ firstName } ${ lastName }`
  }

  const mouseEnter = (event: any) => {
    const itemHovered = get(event, `target.attributes['data-name'].value`, '')
    setItemHovered(itemHovered)
  }

  const onClickMenu = async (menuItem: string) => {
    switch (menuItem) {
      case 'Log Out':
        await signOut()
        router.push('/log-in')
        break
      case 'Account Details':
        setShowAcctDetailsDialog(true)
        break
      case 'About':
        router.push('/about')
        break
    }
  }

  // listener for closing the dropdown if the user clicks outside of it
  useEffect(() => {
    // only add the event listener when the dropdown is opened
    if (!showMenu) return

    function handleOutsideClick(event: any) {
      // @ts-ignore
      if (dropdown.current && !dropdown.current.contains(event.target)) {
        setShowMenu(false);
      }
    }
    window.addEventListener('click', handleOutsideClick)
    return () => window.removeEventListener('click', handleOutsideClick)
  }, [showMenu])

  return (
    <div className="grid grid-cols-2 py-5 px-12 bg-black-russian relative">
      <UpdateStatusDialog isOpen={showStatsDialog} setIsOpen={setShowStatsDialog} userStats={userStats as UserStats} setUserStats={setUserStats} />
      <AccountDetailsDialog isOpen={showAcctDetailsDialog} setIsOpen={setShowAcctDetailsDialog} userStats={userStats as UserStats} setUserStats={setUserStats} />
      <h2 className="inter font-extrabold text-base uppercase my-auto text-white">The Strength Solution</h2>
      <div className="flex justify-end">
        <div className="w-44">
          <CustomButton
            label="Update My Stats"
            classes="bg-brand-blue h-10"
            textClasses="font-semibold text-sm text-white"
            onClick={openDialog}
          />
        </div>
        <div className="flex ml-7 bg-[#333333] px-2 py-1 rounded cursor-pointer select-none"
             onClick={() => setShowMenu(!showMenu)}
             ref={dropdown}
        >
          <p className="inter font-medium text-white opacity-60 my-auto">
            { displayUserName() }
          </p>

          <div className="ml-2 bg-medium-grey rounded-3xl p-0.5">
            {
              session?.userData?.imageUrl
                ? <Image className="ml-2 rounded-3xl" src={session?.userData?.imageUrl} alt="profile-pic" height={32} width={36} />
                : <Image className="rounded-3xl" src={noProfilePic} alt="profile-pic" height={30} />
            }
          </div>
        </div>
      </div>
      {/*dropdown menu*/}
      <div className="z-10 w-[20em] right-10 top-20 bg-white rounded absolute">
        {
          showMenu && menuItems.map((menuItem, i) => {
            return (
              <div
                className={`flex justify-between px-6 pb-3 pt-4
                  ${i === menuItems.length-1 ? 'border-t mt-4 mb-2' : ''}
                  ${i === 0 ? 'mt-3' : ''}
                  ${itemHovered == menuItem ? 'bg-brand-blue text-white' : ''} cursor-pointer`}
                key={i}
                data-name={menuItem}
                onMouseEnter={mouseEnter}
                onMouseLeave={() => setItemHovered('')}
                onClick={() => onClickMenu(menuItem)}
              >
                <span>{menuItem}</span>
                {
                  i === menuItems.length-1
                    ? <Image src={logOut} alt="log-out" height={20} />
                    : <Image src={rightArrow} alt="right-arrow" height={25} />
                }
              </div>
            )
          })
        }
      </div>
    </div>
  )
}