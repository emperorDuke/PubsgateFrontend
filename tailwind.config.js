const colors = require('tailwindcss/colors')

module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'primary': {
          DEFAULT: colors.amber["600"],
          light: colors.amber["500"],
          dark: colors.amber["700"]
        },
        secondary: {
          DEFAULT: colors.black,
          light: colors.slate['500']
        },
        'layout-col': {
          DEFAULT: colors.slate['200']
        },
        'header-col': {
          DEFAULT: colors.slate['600']
        },
        'border-col': {
          DEFAULT: colors.gray["300"]
        }
      }
    }
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
}
