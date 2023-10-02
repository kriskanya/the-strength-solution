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
        'dark-grey': '#656565'
      },
      backgroundColor: {
        'brand-blue': '#007DD9'
      },
      borderColor: {
        'light-grey': '#DADADA'
      }
    },
  },
  plugins: [],
}
export default config
