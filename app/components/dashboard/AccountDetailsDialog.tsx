import { Dialog } from '@headlessui/react'
import Image from 'next/image'
import CustomButton from '@/app/ui/CustomButton'
import { Alert } from '@/app/ui/Alert'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { UserStats } from '@/common/frontend-types-and-constants'
import { useSession } from 'next-auth/react'
import noProfilePic from '@/app/icons/no-profile-pic.svg'
import ellipse from '../../icons/ellipse.svg'
import CustomInput from '@/app/ui/CustomInput'

interface Props {
  isOpen: boolean,
  setIsOpen: Dispatch<SetStateAction<boolean>>,
  userStats: UserStats,
  setUserStats: Dispatch<SetStateAction<UserStats | undefined>>,
}

export default function AccountDetailsDialog({ isOpen, setIsOpen, userStats, setUserStats }: Props) {
  const { data: session } = useSession()
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [showAlert, setShowAlert] = useState(false)

  const saveChanges = () => {
    console.log('save')
  }

  useEffect(() => {
    if (!session) return

    setFirstName(session?.userData?.firstName)
    setLastName(session?.userData?.lastName)
    setEmail(session?.userData?.email)
  }, [session])

  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      className="relative z-50 bg-white"
    >
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        <Dialog.Panel className="w-3/5 h-8/12 rounded bg-white py-6 leading-6 border">
          <Dialog.Title>
            <div className="flex justify-center">
              <h1 className="inter font-semibold text-lg">Account Details</h1>
            </div>
          </Dialog.Title>
          <Dialog.Description>
            <div className="px-10 mt-4">
              {/*change profile image*/}
              <div className="flex">
                {
                  session?.userData?.imageUrl
                    ? <Image className="ml-2 rounded-3xl" src={session?.userData?.imageUrl} alt="profile-pic" height={40} width={36} />
                    : <Image className="rounded-3xl" src={noProfilePic} alt="profile-pic" height={40} />
                }
                <div className="ml-4">
                  <p className="inter font-medium text-sm">Profile Image</p>
                  <p className="flex mt-2">
                    <span className="text-brand-blue">Change Photo</span>
                    <Image className="mx-2" src={ellipse} alt="profile-pic" height={4} width={4} />
                    <span className="text-brand-blue">Remove Photo</span>
                  </p>
                </div>
              </div>

              <div className="mt-4 flex flex-col gap-4">
                <CustomInput fieldName="firstName" type="text" placeholder="Enter your first name" inputValue={firstName} changeHandler={setFirstName} />
                <CustomInput fieldName="lastName" type="text" placeholder="Enter your last name" inputValue={lastName} changeHandler={setLastName} />
                <CustomInput fieldName="email" type="text" placeholder="Enter your email" inputValue={email} changeHandler={setEmail} />
              </div>

              {/*buttons*/}
              <div className="flex justify-center gap-6">
                <div className="w-36">
                  <CustomButton
                    label="Cancel"
                    classes="border border-brand-blue h-10 mt-16"
                    textClasses="font-semibold text-sm text-brand-blue"
                    onClick={() => setIsOpen(false)}
                  />
                </div>
                <div className="w-36">
                  <CustomButton
                    label="Save Changes"
                    classes="bg-brand-blue h-10 mt-16"
                    textClasses="font-semibold text-sm text-white"
                    onClick={saveChanges}
                  />
                </div>
              </div>
              <div className="mx-6 mt-10">
                <p>
                  {showAlert && <Alert customClasses="bg-green-200 text-sm">Changes saved successfully</Alert>}
                </p>
              </div>
            </div>
          </Dialog.Description>
        </Dialog.Panel>
      </div>
    </Dialog>
  )
}