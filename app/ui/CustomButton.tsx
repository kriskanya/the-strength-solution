interface Props {
  label: string,
  classes: string
}

export default function CustomButton(props: Props) {
  return (
    <div className={`flex justify-center items-center w-full rounded ${props.classes}`}>
      <p className="text-white">{props.label}</p>
    </div>
  )
}