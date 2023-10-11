type ChipProps = {
  classes: string,
  children: React.ReactNode
}
const CustomChip = ({ children, classes }: ChipProps) => {
  return (
    <div className={`h-[24px] text-center py-1 rounded inter text-xs font-normal ${ classes }`}>
      {children}
    </div>
  )
}
export { CustomChip }