interface Props {
  label: string,
  classes: string,
  type?: 'submit' | 'button',
  textClasses?: string,
  onClick?: () => void
}

export default function CustomButton(props: Props) {
  return (
    <button
      type={props.type || 'button'}
      className={`flex justify-center items-center w-full rounded ${props.classes}`}
      onClick={props.onClick}
    >
      <p className={`inter ${props.textClasses}`}>{props.label}</p>
    </button>
  )
}