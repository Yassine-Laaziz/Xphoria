'use client'

import styles from '../styles'
import { motion } from 'framer-motion'
import { footerVariants } from '../lib/motion'
import { brand, footerText, license, socials } from '../lib/constants'

export default function Footer() {
  return (
    <motion.footer
      variants={footerVariants}
      initial='hidden'
      whileInView='show'
      className={`${styles.paddings} relative py-8`}
    >
      <div className='footer-gradient' />
      <div className={`${styles.innerWidth} mx-auto flex flex-col gap-8`}>
        <div className='flex flex-wrap items-center justify-between gap-5'>
          <h4 className='text-[44px] font-bold text-white [text-shadow:_0_0_5px_white] md:text-[64px]'>{footerText}</h4>
          <div className='text-2xl font-bold text-emerald-700'>{brand}</div>
        </div>
        <div className='flex flex-col'>
          <div className='mb-[50px] h-[2px] bg-emerald-700 ' />
          <div className='flex flex-wrap items-center justify-between gap-4'>
            <p className='text-[14px] font-normal text-white opacity-50'>{license}</p>
            <div className='flex gap-4'>
              {socials.map(social => (
                <img
                  src={social.url}
                  alt={social.name}
                  key={social.name}
                  className='h-[24px] w-[24px] cursor-pointer object-contain'
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.footer>
  )
}
