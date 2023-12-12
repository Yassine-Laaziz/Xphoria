import { Orbitron, Silkscreen } from 'next/font/google'

const orbitron = Orbitron({
  subsets: ['latin'],
  variable: '--font-orbitron',
  display: 'swap',
})

const silkscreen = Silkscreen({
  weight: ['400'],
  subsets: ['latin'],
  variable: '--font-silkscreen',
  display: 'swap',
})

export default `${silkscreen.variable} ${orbitron.variable}`
