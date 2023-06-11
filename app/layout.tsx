import { Metadata } from 'next'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import '../styles/globals.css'
import Providers from './Providers'
import { brand, brandSlogan } from '../lib/constants'

export const metadata: Metadata = {
  title: brand,
  description: brandSlogan,
  icons: '/favicon.ico',
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <head>
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1'
        />
      </head>
      <body>
        <Providers>
          <Navbar />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
