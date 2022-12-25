"use client"

import { motion } from "framer-motion"
import { textContainer } from "../utils/motion"
import { textVariant } from "../utils/motion"

export const TypingText = ({ title, textStyles }) => (
  <motion.p
    initial="hidden"
    whileInView="show"
    variants={textContainer}
    className={`font-normal text-[14px] ${textStyles}`}
  >
    {Array.from(title).map((letter, i) => (
      <motion.span variants={textVariant} key={i}>
        {letter === " " ? "\u00A0" : letter}
      </motion.span>
    ))}
  </motion.p>
)

export const TitleText = ({ title, textStyles }) => (
  <motion.h2
    variants={textVariant}
    initial="hidden"
    whileInView="show"
    className={`mt-[8px] font-bold md:text-[64px] text-[40px] ${textStyles}`}
  >
    {title}
  </motion.h2>
)