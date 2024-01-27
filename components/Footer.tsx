'use client'

import styles from '../styles'
import { motion } from 'framer-motion'
import { footerVariants } from '../lib/motion'
import { brand, footerText, license, socials } from '../lib/constants'
import Image from 'next/image'

export default function Footer() {
  return (
    <motion.footer variants={footerVariants} initial="hidden" whileInView="show" className={`${styles.paddings} relative py-8`}>
      <div className="footer-gradient" />
      <div className={`${styles.innerWidth} mx-auto flex flex-col gap-8`}>
        <div className="flex flex-wrap items-center justify-between gap-5">
          <span className="text-[44px] font-bold [text-shadow:_0_0_5px_white] dark:text-white md:text-[64px]">{footerText}</span>
          <div className="text-2xl font-bold text-cyan-400 dark:text-emerald-700">{brand}</div>
        </div>
        <div className="flex flex-col">
          <div className="mb-[50px] h-[2px] bg-cyan-400  dark:bg-emerald-700 " />
          <div className="flex flex-wrap items-center justify-between gap-4">
            <p className="text-[14px] font-normal opacity-50 dark:text-white">{license}</p>
            <div className="flex gap-4">
              {socials.map(social => (
                <Image src={social.url} alt={social.name} key={social.name} className="h-[24px] w-[24px] cursor-pointer object-contain" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.footer>
  )
}
