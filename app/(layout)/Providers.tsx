'use client'

import { PropsWithChildren } from 'react'
import { UserProvider } from '../../lib/contexts/UserContext'
import { CartProvider } from '../../lib/contexts/LayoutContext'
import { ThemeProvider } from '../../lib/contexts/ThemeContext'

export default function Providers({ children }: PropsWithChildren) {
  return (
    <UserProvider>
      <ThemeProvider>
        <CartProvider>{children}</CartProvider>
      </ThemeProvider>
    </UserProvider>
  )
}
