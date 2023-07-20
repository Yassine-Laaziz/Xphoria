import { createContext, Dispatch, PropsWithChildren, SetStateAction, useContext, useLayoutEffect, useState } from 'react'

type Theme = 'light' | 'dark'

interface ThemeContextProps {
  theme: Theme
  switchTheme: () => void
}

const ThemeContext = createContext<ThemeContextProps>({
  theme: 'light',
  switchTheme: () => {},
})

export function ThemeProvider({ children }: PropsWithChildren<{}>) {
  const [theme, setTheme] = useState<Theme>('light')

  function switchTheme() {
    const htmlElem = document.documentElement
    if (theme === 'light') {
      setTheme('dark')
      localStorage.setItem('theme', 'dark')
      htmlElem.classList.add('dark')
    } else {
      setTheme('light')
      localStorage.setItem('theme', 'light')
      htmlElem.classList.remove('dark')
    }
  }

  useLayoutEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark')
      setTheme('dark')
    }
  }, [])

  return <ThemeContext.Provider value={{ theme, switchTheme }}>{children}</ThemeContext.Provider>
}

export const useThemeContext = (): ThemeContextProps => useContext(ThemeContext)
