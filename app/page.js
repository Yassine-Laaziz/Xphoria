"use client"

import { useEffect, useState } from "react"

const Page = () => {
  const [animate, setAnimate] = useState({})
  useEffect(() => {
    setAnimate({ line: true })
    const circle = setTimeout(() => {
      setAnimate((prev) => ({ ...prev, circle: true }))
      const logo = setTimeout(
        () => setAnimate((prev) => ({ ...prev, logo: true })),
        2000
      )
      return () => clearTimeout(logo)
    }, 2000)

    return () => clearTimeout(circle)
  }, [])

  return (
    <div className="relative h-[100vh] bg-black flex-col">
      {/* ====== The Circle and two lines ====== */}
      <div className="relative h-1/2 flex">
        {/* left line */}
        <div
          className={`flex-1 bg-emerald-700 h-[5px] relative top-[50%] translate-y-[-50%] shadow-[2px_0_14px_2px] shadow-emerald-700 
        ${animate.line ? "animate-line" : ""}`}
        />
        {/* circle */}
        <div
          className="h-full rounded-full shadow-emerald-700 bg-black aspect-square
        mx-auto relative top-1/2 translate-y-[-50%] shadow-[0_0_14px_4px,0_0_14px_4px_inset] border-emerald-700 border-[5px] "
        >
          <img
            src="Green_astronauts.png"
            alt="Green astronauts"
            className={`h-[calc(100%-14px)] w-[calc(100%-14px)] relative top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] ${
              animate.logo ? "animate-logo" : "hidden"
            }`}
          />
        </div>
        {/* right line */}
        <div
          className={`flex-1 bg-emerald-700 h-[5px] relative top-[50%] translate-y-[-50%] shadow-[-2px_0_14px_2px] shadow-emerald-700 
        ${animate.line ? "animate-line" : ""} float-right `}
        />
        {/* hiders */}
        <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 h-full aspect-square">
          <div
            className={`bg-black absolute h-[calc(50%+15px)] w-[calc(100%+14px*2)] right-[-14px] top-[-14px]
          ${animate.circle ? "animate-hider" : ""}`}
          />
          <div
            className={`bg-black absolute h-[calc(50%+15px)] w-[calc(100%+14px*2)] left-[-14px] bottom-[-14px]
          ${animate.circle ? "animate-hider" : ""}`}
          />
        </div>
      </div>

      {/* The Text */}
      <div>

      </div>
    </div>
  )
}

export default Page
