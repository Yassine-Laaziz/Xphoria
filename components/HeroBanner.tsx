'use client'
import { motion } from 'framer-motion'
import { BsArrowBarDown } from 'react-icons/bs'
import styles from '../styles'
import Image from 'next/image'
import { useThemeContext } from '../lib/contexts/ThemeContext'

export default function HeroBanner() {
  const scrollDown = () => {
    window.scrollTo({
      top: document.documentElement.clientHeight + 160 - 20,
      behavior: 'smooth',
    })
  }

  const { theme } = useThemeContext()

  return (
    <div className="relative h-[calc(100vh-64px)] flex-col">
      {/* The Circle and two lines */}
      <div className="relative flex h-1/2 pt-20">
        {/* left line */}
        <motion.div
          className="relative top-[50%] h-[5px] translate-y-[-50%] bg-sky-300 shadow-[2px_0_14px_2px]
           shadow-sky-300 dark:bg-emerald-700 dark:shadow-emerald-700"
          animate={{ flex: 0.5 }}
          transition={{ duration: 2 }}
        />
        {/* Logo */}
        <div
          className="relative top-1/2 mx-auto aspect-square h-full w-auto -translate-y-1/2 rounded-full
            border-[5px] border-sky-300 shadow-[0_0_14px_4px,0_0_14px_4px_inset] shadow-sky-300
             dark:border-emerald-700 dark:shadow-emerald-700"
        >
          <motion.div
            className="absolute top-1/2 -translate-y-1/2"
            animate={{ opacity: [0, 0.5, 0.5, 1, 1, 0.2, 0.5, 0.2, 1, 0.2, 1] }}
            transition={{ delay: 4, duration: 1 }}
          >
            {theme === 'dark' ? (
              <Image className="object-cover" src="/logo.png" alt="Xphoria logo" width={300} height={300} quality={100} />
            ) : (
              <Image className="object-cover" src="/cyan_logo.png" alt="Xphoria logo" width={300} height={300} quality={100} />
            )}
          </motion.div>
        </div>
        {/* right line */}
        <motion.div
          className="relative top-[50%] h-[5px] translate-y-[-50%] bg-sky-300 shadow-[2px_0_14px_2px]
                  shadow-sky-300 dark:bg-emerald-700 dark:shadow-emerald-700"
          animate={{ flex: 0.5 }}
          transition={{ duration: 2 }}
        />
        {/* Logo hiders */}
        <div className={`${styles.absoluteCenter} aspect-square h-full`}>
          <motion.div
            className="absolute right-[-14px] top-[-14px] h-[calc(50%+14px)] w-[calc(100%+14px*2)] bg-white dark:bg-black"
            animate={{ width: 0 }}
            transition={{ delay: 2, duration: 2 }}
          />
          <motion.div
            className="absolute bottom-[-14px] left-[-14px] h-[calc(50%+14px)] w-[calc(100%+14px*2)] bg-white dark:bg-black"
            animate={{ width: 0 }}
            transition={{ delay: 2, duration: 2 }}
          />
        </div>
      </div>

      {/* Scroll Down Button */}
      <motion.div
        className="absolute bottom-8 left-1/2 text-center text-cyan-400 selection:text-sky-300
        c:mx-auto dark:text-emerald-700 dark:selection:text-emerald-500"
        initial={{ opacity: 0, y: -20, x: '-50%' }}
        animate={{ opacity: 1, y: 0, x: '-50%' }}
        transition={{ delay: 3, duration: 1 }}
      >
        <h2 className="mb-2 font-bold text-red-500">PLEASE NOTE:</h2>
        <p className="mb-7 text-gray-700 dark:text-gray-400">
          <span>
            This website is a <strong>DEMO</strong> for the Company respecting the owner&apos;s wishes
          </span>
          <br />
          <span>so i can&apos;t provide the actual website but this is a good replica</span>
          <br />
          -Difference: some functionalities are not complete especially the cart functionality
        </p>
        <BsArrowBarDown onClick={scrollDown} className="mt-7 text-3xl" />
        <div className="h-1 w-60 bg-gradient-to-r from-white via-gray-700 to-white" />
      </motion.div>
    </div>
  )
}
