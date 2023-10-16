import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'red-novice': '#F25B28',
        'orange-intermediate': '#F4B43B',
        'yellow-proficient': '#FCFF4B',
        'green-advanced': '#4CD964',
        'blue-elite': '#2E8EEC',
        'custom-black': '#111111'
      },
      textColor: {
        'brand-blue': '#007DD9',
        'dark-grey': '#656565',
        'light-grey': '#A7A7A7',
        'custom-black': '#111111'
      },
      backgroundColor: {
        'brand-blue': '#007DD9',
        'bright-white': '#FFFFFF',
        'off-white': '#FAFAFA',
        'light-grey': '#F2F2F2',
        'black-russian': '#1E1F23',
        'medium-grey': '#7D7D7D'
      },
      borderColor: {
        'brand-blue': '#007DD9',
        'light-grey': '#DADADA',
        'lighter-grey': '#F2F2F2'
      }
    },
  },
  plugins: [],
}
export default config
