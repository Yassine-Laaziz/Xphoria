import { Metadata } from 'next'
import '../styles/globals.css'
import { brand, brandSlogan } from '../lib/constants'

export const metadata: Metadata = {
  title: brand,
  description: brandSlogan,
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body className='dark:bg-black'>{children}</body>
    </html>
  )
}
