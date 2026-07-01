import { Dialog } from '@headlessui/react'
import Image from 'next/image'
import CustomButton from '@/app/ui/CustomButton'
import { Alert } from '@/app/ui/Alert'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { UserStats } from '@/common/frontend-types-and-constants'
import { useSession } from 'next-auth/react'
import noProfilePic from '@/app/icons/no-profile-pic.svg'
import CustomInput from '@/app/ui/CustomInput'
import { FileUploader } from '@/app/ui/FileUploader'
import { get } from 'lodash-es'

interface Props {
  isOpen: boolean,
  setIsOpen: Dispatch<SetStateAction<boolean>>,
  userStats: UserStats,
  setUserStats: Dispatch<SetStateAction<UserStats | undefined>>,
}

export default function AccountDetailsDialog({ isOpen, setIsOpen, userStats, setUserStats }: Props) {
  const { data: session, update } = useSession()
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showAlert, setShowAlert] = useState(false)
  const [alertMessage, setAlertMessage] = useState('Changes saved successfully')
  const [passwordError, setPasswordError] = useState<string | null>(null)
  const [file, setFile] = useState<File>()

  const hasPassword = Boolean(session?.userData?.hasPassword)

  const saveChanges = async () => {
    try {
      const res: (Response | undefined)[] = await Promise.all([uploadFile(), updateUserInfo()])

      setShowAlert(true)
      setAlertMessage('Changes saved successfully')
      setTimeout(() => setShowAlert(false), 5000)
      await update() // update the session to reflect changes
    } catch (e: any) {
      console.error(e)
    }
  }

  const savePassword = async () => {
    setPasswordError(null)
    try {
      const body = hasPassword
        ? { currentPassword, newPassword, confirmPassword }
        : { newPassword, confirmPassword }

      const res = await fetch('/api/user/password', {
        method: 'PATCH',
        body: JSON.stringify(body),
        headers: { 'Content-Type': 'application/json' },
      })
      const data = await res.json()

      if (!res.ok) {
        setPasswordError(data.error ?? 'Unable to update password.')
        return
      }

      setCurrentPassword('')
      setNewPassword('')
      setConfirmPassword('')
      setAlertMessage(hasPassword ? 'Password updated successfully' : 'Password set successfully')
      setShowAlert(true)
      setTimeout(() => setShowAlert(false), 5000)
      await update()
    } catch (e: any) {
      setPasswordError(e?.message ?? 'Unable to update password.')
    }
  }

  const updateUserInfo = () => {
    const body = { firstName, lastName, email }
    const id = session?.user?.id

    if (!id) {
      console.log('AccountDetailsDialog: There was an issue getting the session id when updating user info', session)
      return
    }

    return fetch(`/api/user/${id}`, {
      method: 'PUT',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json'
      },
    })
  }

  const uploadFile = async () => {
    if (!file) return

    const data = new FormData()
    data.set('file', file)
    const userId = get(session, 'user.id')

    return fetch(`/api/user/${userId}/profile-image`, {
      method: 'POST',
      body: data
    })
  }

  useEffect(() => {
    if (!session) return

    setFirstName(get(session, 'userData.firstName', ''))
    setLastName(get(session, 'userData.lastName', ''))
    setEmail(session?.userData?.email ?? '')
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
                    <FileUploader setFile={setFile} />
                  </p>
                </div>
              </div>

              <div className="mt-4 flex flex-col gap-4">
                <CustomInput fieldName="firstName" type="text" placeholder="Enter your first name" inputValue={firstName} changeHandler={setFirstName} />
                <CustomInput fieldName="lastName" type="text" placeholder="Enter your last name" inputValue={lastName} changeHandler={setLastName} />
                <CustomInput fieldName="email" type="text" placeholder="Enter your email" inputValue={email} changeHandler={setEmail} />
              </div>

              <div className="mt-8 border-t pt-6">
                <p className="inter font-medium text-sm mb-4">
                  {hasPassword ? 'Change password' : 'Set a password'}
                </p>
                {!hasPassword && (
                  <p className="inter text-sm text-gray-600 mb-4">
                    Add a password if you want to log in with email and password in addition to Google or Facebook.
                  </p>
                )}
                <div className="flex flex-col gap-4">
                  {hasPassword && (
                    <CustomInput
                      fieldName="currentPassword"
                      type="password"
                      placeholder="Current password"
                      inputValue={currentPassword}
                      changeHandler={setCurrentPassword}
                    />
                  )}
                  <CustomInput
                    fieldName="newPassword"
                    type="password"
                    placeholder={hasPassword ? 'New password' : 'Password'}
                    inputValue={newPassword}
                    changeHandler={setNewPassword}
                  />
                  <CustomInput
                    fieldName="confirmPassword"
                    type="password"
                    placeholder="Confirm password"
                    inputValue={confirmPassword}
                    changeHandler={setConfirmPassword}
                  />
                </div>
                {passwordError && (
                  <div className="mt-4">
                    <Alert>{passwordError}</Alert>
                  </div>
                )}
                <div className="w-40 mt-4">
                  <CustomButton
                    label={hasPassword ? 'Update Password' : 'Set Password'}
                    classes="border border-brand-blue h-10"
                    textClasses="font-semibold text-sm text-brand-blue"
                    onClick={savePassword}
                  />
                </div>
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
                    type="submit"
                    label="Save Changes"
                    classes="bg-brand-blue h-10 mt-16"
                    textClasses="font-semibold text-sm text-white"
                    onClick={saveChanges}
                  />
                </div>
              </div>
              <div className="mx-6 mt-10">
                <p>
                  {showAlert && <Alert customClasses="bg-green-200 text-sm">{alertMessage}</Alert>}
                </p>
              </div>
            </div>
          </Dialog.Description>
        </Dialog.Panel>
      </div>
    </Dialog>
  )
}