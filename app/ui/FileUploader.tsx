import { Dispatch, SetStateAction, useRef } from 'react';
import Image from 'next/image'
import ellipse from '@/app/icons/ellipse.svg'

/* how to customize the file upload button in react - https://medium.com/web-dev-survey-from-kyoto/how-to-customize-the-file-upload-button-in-react-b3866a5973d8 */

interface Props {
  setFile: Dispatch<SetStateAction<File | undefined>>
}

export const FileUploader = ({ setFile }: Props) => {
  const hiddenFileInput = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    hiddenFileInput?.current?.click()
  }

  return (
    <>
      <button className="text-brand-blue cursor-pointer" onClick={handleClick}>
        Change Photo
      </button>
      <Image className="mx-2" src={ellipse} alt="profile-pic" height={4} width={4} />
      <button className="text-brand-blue cursor-pointer">Remove Photo</button>

      <input
        type="file"
        onChange={(e) => setFile(e.target.files?.[0])}
        ref={hiddenFileInput}
        style={{display:'none'}}
      />
    </>
  )
}