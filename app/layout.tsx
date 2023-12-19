import { Metadata } from 'next'
import '../styles/globals.css'
import { brand, brandSlogan } from '../lib/constants'
import fonts from '../lib/fonts'

export const metadata: Metadata = {
  title: brand,
  description: brandSlogan,
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={fonts}>
      <body className="font-orbitron font-normal transition-all duration-500 dark:bg-black">{children}</body>
    </html>
  )
}
