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
    <div className="relative h-[calc(100vh-64px)] bg-black flex-col">
      {/* The Circle and two lines */}
      <div className="relative h-1/2 flex">
        {/* left line */}
        <motion.div
          className="bg-emerald-700 h-[5px] relative top-[50%] translate-y-[-50%] shadow-[2px_0_14px_2px] shadow-emerald-700"
          animate={{ flex: 1 }}
          transition={{ duration: 2, ease: 'easeOut' }}
        />
        {/* circle */}
        <Image
          className="h-full rounded-full shadow-emerald-700 aspect-square relative top-1/2 w-auto mx-auto
          translate-y-[-50%] shadow-[0_0_14px_4px,0_0_14px_4px_inset] border-emerald-700 border-[5px]"
          src={urlFor(config.logo).url()}
          alt="Xphoria logo"
          width={300}
          height={300}
          quality={100}
        />
        {/* right line */}
        <motion.div
          className="bg-emerald-700 h-[5px] relative top-[50%] translate-y-[-50%] shadow-[-2px_0_14px_2px] shadow-emerald-700 float-right"
          animate={{ flex: 1 }}
          transition={{ duration: 2, ease: 'easeOut' }}
        />
        {/* hiders */}
        <div className={`${styles.absoluteCenter} h-full aspect-square`}>
          <motion.div
            className="bg-black absolute h-[calc(50%+14px)] w-[calc(100%+14px*2)] right-[-14px] top-[-14px]"
            animate={{ width: 0 }}
            transition={{ delay: 2, duration: 2, ease: 'easeOut' }}
          />
          <motion.div
            className="bg-black absolute h-[calc(50%+14px)] w-[calc(100%+14px*2)] left-[-14px] bottom-[-14px]"
            animate={{ width: 0 }}
            transition={{ delay: 2, duration: 2, ease: 'easeOut' }}
          />
        </div>
      </div>

      {/* Scroll Down Button */}
      <motion.button
        className="selection:text-emerald-500 text-emerald-700 absolute bottom-8 left-1/2"
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
