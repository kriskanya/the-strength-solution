interface Props {
  label: string,
  classes: string,
  type?: 'submit' | 'button'
}

export default function CustomButton(props: Props) {
  return (
    <button type={props.type || 'button'} className={`flex justify-center items-center w-full rounded ${props.classes}`}>
      <p className="text-white">{props.label}</p>
    </button>
  )
}