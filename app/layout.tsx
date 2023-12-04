import { Metadata } from 'next'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import '../styles/globals.css'
import Providers from './Providers'
import { brand, brandSlogan } from '../lib/constants'
import OfflineModal from '../components/OfflineModal'
import CartModal from '../components/CartModal'

export const metadata: Metadata = {
  title: brand,
  description: brandSlogan,
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body className='dark:bg-black'>
        <Providers>
          <OfflineModal />
          <Navbar />
          <CartModal />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
