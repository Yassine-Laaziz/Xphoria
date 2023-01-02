
"use client"

import styles from "../styles"
import { motion } from "framer-motion"
import { footerVariants } from "../lib/motion"

const Footer = () => (
  <motion.footer
    variants={footerVariants}
    initial="hidden"
    whileInView="show"
    className={`${styles.paddings} py-8 relative`}
  >
    <div className="footer-gradient" />
    <div className={`${styles.innerWidth} mx-auto flex flex-col gap-8`}>
      <div className="flex items-center justify-between flex-wrap gap-5">
        <h4 className="font-bold md:text-[64px] text-[44px] text-white [text-shadow:_0_0_5px_white]">
          The Real Drip, Period.
        </h4>
        <button
          type="button"
          className="flex items-center h-fit py-4 px-6 border-emerald-700 border-2 rounded-[32px] gap-[12px] font-normal text-[16px] text-emerald-700"
        >Our Recommended</button>
      </div>
      <div className="flex flex-col">
        <div className="mb-[50px] h-[2px] bg-emerald-700 " />
        <div className="flex items-center justify-between flex-wrap gap-4">
          <h4 className="font-extrabold text-[24px] text-emerald-700">Green Astronauts</h4>
          <p className="font-normal text-[14px] text-white opacity-50">
            @2022-2023 Green Astronauts. All rights reserved.
          </p>
          {/* <div className="flex gap-4">
            {socials.map((social) => (
              <img src={social.url} alt={social.name} key={social.name} className="w-[24px] h-[24px] object-contain cursor-pointer"/>
            ))}
          </div> */}
        </div>
      </div>
    </div>
  </motion.footer>
)

export default Footer