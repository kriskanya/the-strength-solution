interface Props {
  label: string,
  classes: string,
  type?: 'submit' | 'button',
  textClasses?: string
}

export default function CustomButton(props: Props) {
  return (
    <button type={props.type || 'button'} className={`flex justify-center items-center w-full rounded ${props.classes}`}>
      <p className={`inter text-white ${props.textClasses}`}>{props.label}</p>
    </button>
  )
}