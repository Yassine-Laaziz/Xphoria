'use client'

import { PropsWithChildren } from 'react'
import { UserProvider } from '../lib/contexts/UserContext'

export default function Providers({ children }: PropsWithChildren) {
  return <UserProvider>{children}</UserProvider>
}
