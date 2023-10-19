import * as React from "react"
const HeadFemale = (props: any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={42}
    height={54}
    fill="none"
    {...props}
  >
    <path
      fill={props.fill}
      d="M21.593 53.476c12.796-.134 17.757-20.102 19.536-31.319.707-4.464-1.78-8.706-5.92-10.52C29.1 8.958 19.55 4.968 9.335 1.447.58-1.572.859 20.01.965 23.61c.01.346.04.658.096.999.634 3.86 5.352 29.026 20.532 28.867Z"
    />
    <path
      stroke="#111"
      strokeLinejoin="round"
      d="M21.593 53.476c12.796-.134 17.757-20.102 19.536-31.319.707-4.464-1.78-8.706-5.92-10.52C29.1 8.958 19.55 4.968 9.335 1.447.58-1.572.859 20.01.965 23.61c.01.346.04.658.096.999.634 3.86 5.352 29.026 20.532 28.867Z"
    />
    <defs>
      <linearGradient
        id="a"
        x1={21.484}
        x2={21.484}
        y1={1.158}
        y2={53.477}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#9396A3" />
        <stop offset={1} stopColor="#6A6B70" />
      </linearGradient>
    </defs>
  </svg>
)
export default HeadFemale
