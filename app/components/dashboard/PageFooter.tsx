import Image from 'next/image'
import youtube from '@/app/icons/youtube-white.svg'
import facebook from '@/app/icons/facebook-white.svg'
import instagram from '@/app/icons/instagram-white.svg'
import classes from './PageFooter.module.css'

export default function PageFooter() {
  return (
    <div className={`grid grid-cols-4 bg-black-russian py-6 px-10 ${ classes.container }`}>
      <div className="flex flex-col justify-center">
        <h2 className="inter font-extrabold text-base uppercase my-auto text-white">The Strength Solution</h2>
        <p className="inter font-normal text-xs text-white opacity-70 w-4/5 mt-2">
          An app designed to help you achieve your strength goals via functional bodyweight exercises
        </p>
      </div>
      <div className="flex flex-col justify-center">
        <p className="inter font-normal text-xs text-white opacity-70">FAQ</p>
        <p className="inter font-normal text-xs text-white opacity-70 mt-2">Strength Solution Store</p>
      </div>
      <div className="flex flex-col justify-center">
        <p className="inter font-normal text-xs text-white opacity-70">Privacy Policy</p>
        <p className="inter font-normal text-xs text-white opacity-70 mt-2">Terms & Conditions</p>
      </div>
      <div className="flex justify-start gap-5">
        <Image src={youtube} alt="youtube" className="cursor-pointer" />
        <Image src={facebook} alt="facebook" className="cursor-pointer" />
        <Image src={instagram} alt="instagram" className="cursor-pointer" />
      </div>
    </div>
  )
}