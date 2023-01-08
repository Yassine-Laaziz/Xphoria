"use client"

import { useEffect, useState } from "react"
import { TitleText, TypingText } from "./CustomTexts"
import { motion } from "framer-motion"
import { BsArrowBarDown } from "react-icons/bs"
import { slideIn } from "../lib/motion"
import Image from "next/image"
import logo from "../public/Green_astronauts.png"
import styles from "../styles"

const HeroBanner = ({ config }: { config: object }) => {
  const [animate, setAnimate] = useState<{
    line?: boolean
    circle?: boolean
    logo?: boolean
    text?: boolean
    scroll?: boolean
  }>({})

  useEffect(() => {
    setAnimate({ line: true })

    // here i'm using Recursion because multiple setTimeouts should be inside each other
    const timeouts = (arr: { property: string; duration: number }[]) => {
      let i = 0

      const timeout = () => {
        const { property, duration } = arr[i]

        const id = setTimeout(() => {
          setAnimate((prev) => ({ ...prev, [property]: true }))
          i++
          if (arr[i]) timeout()
          return () => clearTimeout(id)
        }, duration)
      }

      timeout()
    }

    timeouts([
      { property: "circle", duration: 2000 },
      { property: "logo", duration: 2000 },
      { property: "text", duration: 1000 },
      { property: "scroll", duration: 1500 },
    ])
  }, [])

  const scrollDown = () => {
    window.scrollTo({
      top: document.documentElement.clientHeight + 160 - 20, //160: products section padding top
      behavior: "smooth",
    })
  }

  return (
    <div className="relative h-[100vh] bg-black flex-col">
      {/* ====== The Circle and two lines ====== */}
      <div className="relative pt-[14px] h-1/2 flex">
        {/* left line */}
        <div
          className={`bg-emerald-700 h-[5px] relative top-[50%] translate-y-[-50%] shadow-[2px_0_14px_2px] shadow-emerald-700 
        ${animate.line ? "animate-line" : ""}`}
        />
        {/* circle */}
        <div
          className="h-full rounded-full shadow-emerald-700 aspect-square
        mx-auto relative top-1/2 translate-y-[-50%] shadow-[0_0_14px_4px,0_0_14px_4px_inset] border-emerald-700 border-[5px] "
        >
          <Image
            src={logo}
            alt="Green astronauts"
            className={`h-[calc(100%-14px)] w-[calc(100%-14px)] ${
              styles.absoluteCenter
            } ${animate.logo ? "animate-logo" : "hidden"}`}
          />
        </div>
        {/* right line */}
        <div
          className={`bg-emerald-700 h-[5px] relative top-[50%] translate-y-[-50%] shadow-[-2px_0_14px_2px] shadow-emerald-700 
        ${animate.line ? "animate-line" : ""} float-right `}
        />
        {/* hiders */}
        <div className={`${styles.absoluteCenter} h-full aspect-square`}>
          <div
            className={`bg-black absolute h-[calc(50%+14px)] w-[calc(100%+14px*2)] right-[-14px] top-[-14px]
          ${animate.circle ? "animate-hider" : ""}`}
          />
          <div
            className={`bg-black absolute h-[calc(50%+14px)] w-[calc(100%+14px*2)] left-[-14px] bottom-[-14px]
          ${animate.circle ? "animate-hider" : ""}`}
          />
        </div>
      </div>

      {/* ====== The-Text ====== */}
      <div className="text-center [text-shadow:_0_0_20px_var(--tw-shadow-color)] shadow-emerald-700">
        {animate.text && (
          <>
            <TitleText
              title="Green Astronauts"
              textStyles={`text-emerald-700 ${styles.title}`}
            />
            <TypingText
              title="we do it better"
              textStyles={`text-emerald-700 ${styles.typingText}`}
            />
          </>
        )}
      </div>

      {/* ====== Scroll-Down ======  */}
      {animate.scroll && (
        <motion.div
          variants={slideIn("up", "tween", 0, 1)}
          initial="hidden"
          whileInView="show"
          className="absolute bottom-8 w-full"
        >
          <BsArrowBarDown
            className="text-4xl p-1 text-emerald-700 rounded-full hover:scale-125 transition
            shadow-[0_0_14px_4px] border-emerald-700 cursor-pointer m-auto"
            onClick={() => scrollDown()}
          />
        </motion.div>
      )}
    </div>
  )
}

export default HeroBanner
