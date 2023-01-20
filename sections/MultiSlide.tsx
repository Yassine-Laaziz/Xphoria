"use client"

import "../styles/components/MultiSlide.css"
import styles from "../styles"
import Image from "next/image"
import { Product, ProductOptions } from "../types"
import { HiChevronLeft, HiChevronRight } from "react-icons/hi"
import { urlFor } from "../lib/sanity"
import { useState } from "react"

function MultiSlide({ product }: { product: Product }) {
  const [index, setIndex] = useState<{
    mainImage: number
    color: number
    checked: { s1: boolean; s2: boolean; s3: boolean }
  }>({
    mainImage: 0,
    color: 0,
    checked: { s1: false, s2: true, s3: false },
  })
  const [chosenOptions, setChosenOptions] = useState<ProductOptions>({
    size: 0,
    color: "",
  })

  const navigate = (d: ("s1" | "s2" | "s3")[]) => {
    setIndex((prev) => ({
      ...prev,
      checked: {
        s1: prev.checked[d[0]],
        s2: prev.checked[d[1]],
        s3: prev.checked[d[2]],
      },
    }))
  }

  return (
    <div>
      {/* gradient green box */}
      <div
        className="h-[90vh] w-[90vw] max-w-6xl shadow-emerald-200 relative my-[5vh] mx-auto
       rounded-2xl bg-gradient-to-tr from-emerald-900 to-green-400 uppercase text-white
       text-2xl font-black text-center flex [transform-style: preserve-3d] justify-center items-center
       overflow-x-hidden"
      >
        {/* inputs for the slides */}
        <input
          type="radio"
          name="slider"
          className="hidden"
          id="s1"
          checked={index.checked.s1}
          readOnly
        />
        <input
          type="radio"
          name="slider"
          className="hidden"
          id="s2"
          checked={index.checked.s2}
          readOnly
        />
        <input
          type="radio"
          name="slider"
          className="hidden"
          id="s3"
          checked={index.checked.s3}
          readOnly
        />

        {/* Arrows */}
        <div
          className={`${styles.absoluteCenter} z-50 flex justify-between c:text-[50px] w-1/2 max-w-[450px]
          text-green-500 c:rounded-full c:bg-[hsla(0,0%,0%,.9)] c:shadow-[0_0_30px_0_white] c:cursor-pointer`}
        >
          <HiChevronLeft onClick={() => navigate(["s2", "s3", "s1"])} />
          <HiChevronRight onClick={() => navigate(["s3", "s1", "s2"])} />
        </div>

        {/* slides container */}
        <div
          className="cards relative flex items-center h-[80%] w-full lg:w-[80%] [perspective:1000px] 
          [transform-style:preserve-3d] c:absolute c:left-0 c:right-0 c:m-auto c:transition-all c:duration-500
          c:w-[80%] lg:c:max-w-[400px] c:h-[80%] lg:c:max-h-[400px] c:p-12 c:bg-[hsla(0,0%,0%,.7)]
          c:rounded-[35px] c:flex c:flex-col c:justify-between"
        >
          {/* First Slide */}
          <label htmlFor="s1" id="slide1">
            Reviews
          </label>
          {/* Second Slide */}
          <label htmlFor="s2" id="slide2">
            <h2 className="text-white [textShadow:0_0_7px_white] pb-2 text-4xl tracking-wider">
              {product.name}
            </h2>
            <h2 className="text-green-500 [textShadow:0_0_10px_green] pb-4 text-sm">
              {product.slogan}
            </h2>
            <div className="relative m-auto flex-1 max-w-full aspect-video min-h-[50px]">
              <Image
                src={urlFor(
                  product.noBgImages[index.color].images[index.mainImage]
                ).url()}
                fill={true}
                alt={`Green-Astronauts-${product.name}`}
                quality={100}
              />
            </div>
            <div className="relative mt-auto pt-4 mx-auto flex gap-5 justify-center w-fit">
              {product.noBgImages[index.color].images.map((img, i) => (
                <div
                  key={`Green-Astronauts-${img}${i}`}
                  className={`bg-[hsla(0,0%,0%,.3)] rounded-md h-14 w-14 px-2 py-4
                  ${index.mainImage === i ? "scale-125" : ""}`}
                  onMouseOver={() =>
                    setIndex((prev) => ({ ...prev, mainImage: i }))
                  }
                >
                  <Image
                    src={urlFor(product.noBgImages[0].images[i]).url()}
                    alt={`Green-Astronauts-${product.name}${i}`}
                    quality={100}
                    width={1200}
                    height={1200}
                  />
                </div>
              ))}
            </div>
            <h2
              className="absolute -bottom-5 left-1/2 -translate-x-1/2 bg-[hsla(0,0%,0%,.9)] text-white [text-shadow:0_0_4px_white]
              rounded-md p-2 before:content-[''] before:w-[110%] before:h-8 before:bg-gradient-to-l before:from-white
              before:to-green-600 before:animate-rotate before:-z-10 before:top-1/2 before:left-1/2 before:[translate:-50%_-50%]
              before:absolute z-10 overflow-hidden after:absolute after:bg-black after:inset-1 after:rounded-md after:-z-10
              cursor-pointer hover:scale-110 transition"
            >
              Add to bag
            </h2>
          </label>
          {/* Third Slide */}
          <label htmlFor="s3" id="slide3">
            Customize
          </label>
        </div>
      </div>
    </div>
  )
}

export default MultiSlide
