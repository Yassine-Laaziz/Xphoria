'use client'

import { PropsWithChildren } from 'react'
import { UserProvider } from '../lib/contexts/UserContext'
import { CartProvider } from '../lib/contexts/CartContext'

export default function Providers({ children }: PropsWithChildren) {
  return (
    <UserProvider>
      <CartProvider>{children}</CartProvider>
    </UserProvider>
  )
}
