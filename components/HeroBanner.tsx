'use client'
import { motion } from 'framer-motion'
import { BsArrowBarDown } from 'react-icons/bs'
import styles from '../styles'
import Image from 'next/image'
import { Config } from '../types'
import { urlFor } from '../lib/sanity'

interface props {
  config: Config
}
export default function HeroBanner({ config }: props) {
  const scrollDown = () => {
    window.scrollTo({
      top: document.documentElement.clientHeight + 160 - 20,
      behavior: 'smooth',
    })
  }

  return (
    <div className="relative h-[calc(100vh-64px)] flex-col bg-black">
      {/* The Circle and two lines */}
      <div className="relative flex h-1/2">
        {/* left line */}
        <motion.div
          className="relative top-[50%] h-[5px] translate-y-[-50%] bg-emerald-700 shadow-[2px_0_14px_2px] shadow-emerald-700"
          animate={{ flex: 1 }}
          transition={{ duration: 2, ease: 'easeOut' }}
        />
        {/* circle */}
        <div
          className="relative top-1/2 mx-auto aspect-square h-full w-auto translate-y-[-50%] rounded-full
            border-[5px] border-emerald-700 shadow-[0_0_14px_4px,0_0_14px_4px_inset] shadow-emerald-700"
        >
          <motion.div
            className="hidden"
            animate={{ display: 'block' }}
            transition={{ delay: 4, duration: 1 }}
          >
            <Image
              className={`absolute ${styles.absoluteCenter} aspect-square h-full w-auto translate-y-[-50%] overflow-hidden`}
              src={urlFor(config.logo).url()}
              alt="Xphoria logo"
              width={300}
              height={300}
              quality={100}
            />
          </motion.div>
        </div>
        {/* right line */}
        <motion.div
          className="relative top-[50%] float-right h-[5px] translate-y-[-50%] bg-emerald-700 shadow-[-2px_0_14px_2px] shadow-emerald-700"
          animate={{ flex: 1 }}
          transition={{ duration: 2, ease: 'easeOut' }}
        />
        {/* hiders */}
        <div className={`${styles.absoluteCenter} aspect-square h-full`}>
          <motion.div
            className="absolute right-[-14px] top-[-14px] h-[calc(50%+14px)] w-[calc(100%+14px*2)] bg-black"
            animate={{ width: 0 }}
            transition={{ delay: 2, duration: 2, ease: 'easeOut' }}
          />
          <motion.div
            className="absolute bottom-[-14px] left-[-14px] h-[calc(50%+14px)] w-[calc(100%+14px*2)] bg-black"
            animate={{ width: 0 }}
            transition={{ delay: 2, duration: 2, ease: 'easeOut' }}
          />
        </div>
      </div>

      {/* Scroll Down Button */}
      <motion.button
        className="absolute bottom-8 left-1/2 text-emerald-700 selection:text-emerald-500"
        onClick={scrollDown}
        initial={{ opacity: 0, y: -20, x: '-50%' }}
        animate={{ opacity: 1, y: 0, x: '-50%' }}
        transition={{ delay: 3, duration: 1 }}
      >
        <BsArrowBarDown className="text-3xl" />
      </motion.button>
    </div>
  )
}
