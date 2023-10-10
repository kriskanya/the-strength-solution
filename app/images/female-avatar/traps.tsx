import * as React from "react"
const TrapsFemale = (props: any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={93}
    height={49}
    fill="none"
    {...props}
  >
    <path
      fill={props.fill}
      stroke="#111"
      strokeLinejoin="round"
      d="M.895 26.81c27.848-1.13 26.233-10.367 26.356-25.342H55.63s-1.19 12.232 5.068 19.26c8.786 9.867 31.424 8.109 31.424 8.109C83 55-2.411 54.235.895 26.81Z"
    />
    <defs>
      <linearGradient
        id="a"
        x1={46.462}
        x2={46.462}
        y1={1.468}
        y2={47.933}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#9396A3" />
        <stop offset={1} stopColor="#6A6B70" />
      </linearGradient>
    </defs>
  </svg>
)
export default TrapsFemale
