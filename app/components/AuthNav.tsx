import backArrow from '../icons/back-arrow.svg'
import Image from 'next/image'

export default function AuthNav() {
  return (
    <div className="grid grid-cols-3 p-5 border-b border-light-grey">
      <div className="ml-6">
        <Image src={backArrow} alt="back-arrow" />
      </div>
      <h2 className="inter font-extrabold text-lg uppercase mx-auto">The Strength Solution</h2>
    </div>
  )
}