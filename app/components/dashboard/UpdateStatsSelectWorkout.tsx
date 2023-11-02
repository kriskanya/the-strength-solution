import CustomCheckbox from '@/app/ui/CustomCheckbox'
import CustomButton from '@/app/ui/CustomButton'

export default function UpdateStatusSelectWorkout() {
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
    <div className={``}>
      <div className={`h-4/6 mx-auto relative`}>
        <div className="flex justify-center flex-wrap gap-5 mt-10">
          {
            exercises.map(({name, checked}, i) => {
              return (
                <CustomCheckbox checked={checked} label={name} showRepsInput={true} id={`${i}`} key={i} />
              )
            })
          }
        </div>
      </div>
    </div>
  )
}