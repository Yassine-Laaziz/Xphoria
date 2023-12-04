import Providers from './Providers'
import { PropsWithChildren } from 'react'
import Footer from '../../components/Footer'
import Navbar from '../../components/Navbar'
import OfflineModal from '../../components/OfflineModal'
import CartModal from '../../components/CartModal'

export default function ({ children }: PropsWithChildren) {
  return (
    <Providers>
      <OfflineModal />
      <Navbar />
      <CartModal />
      {children}
      <Footer />
    </Providers>
  )
}
