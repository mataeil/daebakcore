import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#007BFF',
        success: '#28A745',
        danger: '#DC3545',
        background: '#F4F6F9',
        'text-dark': '#333333',
      },
    },
  },
  plugins: [],
}

export default config
