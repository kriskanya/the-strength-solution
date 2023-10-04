import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {},
      textColor: {
        'brand-blue': '#007DD9',
        'dark-grey': '#656565',
        'light-grey': '#A7A7A7',
        'custom-black': '#111111'
      },
      backgroundColor: {
        'brand-blue': '#007DD9',
        'bright-white': '#FFFFFF',
        'off-white': '#FAFAFA'
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
