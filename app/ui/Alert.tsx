type AlertProps = {
  children: React.ReactNode,
  customClasses?: string
}
const Alert = ({ children, customClasses }: AlertProps) => {
  const defaultClasses = 'bg-red-200 text-sm'
  return <div className={`p-2 rounded ${ customClasses || defaultClasses }`}>{children}</div>
}
export { Alert }