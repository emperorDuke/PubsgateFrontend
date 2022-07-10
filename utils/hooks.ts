import React from 'react'

export const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' && window.document
    ? React.useLayoutEffect
    : React.useEffect

export const useTheme = (theme: 'light' | 'dark' = 'light') => {
  const [themeState, setThemeState] = React.useState<typeof theme>('light')

  React.useEffect(() => setThemeState(theme), [theme])

  const palette = {
    light: {
      color: {
        primary: 'amber-600',
        primaryLight: 'amber-100/80',
        primaryDark: 'amber-700',
        secondary: 'black',
        secondaryLight: 'slate-500',
      },
    },
    dark: {
      color: {
        primary: 'amber-600',
        primaryLight: 'amber-100/80',
        primaryDark: 'amber-700',
        secondary: 'black',
        secondaryLight: 'slate-500',
      },
    },
  }

  return palette[themeState]
}
