import classes from '@/app/components/auth/ChooseWorkouts.module.css'
import CustomCheckbox from '@/app/ui/CustomCheckbox'
import CustomButton from '@/app/ui/CustomButton'

export default function ChooseWorkouts() {
  // todo: fetch from backend
  const exercises = [
    { name: 'Push-Ups', checked: true },
    { name: 'Chin-Ups', checked: true },
    { name: 'Goblet Squat', checked: true },
    { name: 'Inverted Row', checked: true },
    { name: 'Handstand Push-Up', checked: true },
    { name: 'Back Extensions', checked: true },
    { name: 'Dips', checked: true },
    { name: 'Pull-Ups', checked: true }
  ]

  return (
    <div className={`bg-off-white ${classes.setHeight}`}>
      <div className={`w-10/12 h-4/6 mx-auto relative md:mt-24 mt-5`}>
        <div className="flex flex-col justify-center">
          <h2 className="inter font-bold text-2xl">Choose workouts</h2>
          <p className="inter font-normal text-light-grey text-base mt-1">
            Choose which workouts you perform
          </p>
        </div>
        <div className="flex flex-wrap gap-5 mt-10">
          {
            exercises.map(({name, checked}, i) => {
              return (
                <CustomCheckbox checked={checked} label={name} id={i+''} key={i} />
              )
            })
          }
        </div>
        <div className="w-36 lg:absolute lg:bottom-0">
          <CustomButton label="Confirm" classes="bg-brand-blue h-10 mt-16" textClasses="font-semibold text-sm text-white" />
        </div>
      </div>
    </div>
  )
}