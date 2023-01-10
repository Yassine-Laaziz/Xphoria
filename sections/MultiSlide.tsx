"use client"

import Image from "next/image"
import { Product, ProductOptions } from "../types"
import { HiChevronLeft, HiChevronRight } from "react-icons/hi"
import styles from "../styles"
import { urlFor } from "../lib/sanity"
import { useState } from "react"

function MultiSlide({ product }: { product: Product }) {
  const [index, setIndex] = useState<{
    slide: number
    mainImage: number
    color: number
  }>({
    slide: 1,
    mainImage: 0,
    color: 0,
  })

  const [slideAnim, setSlideAnim] = useState<{
    s1: string
    s2: string
    s3: string
  }>({ s1: "", s2: "", s3: "" })

  const [chosenOptions, setChosenOptions] = useState<ProductOptions>({
    size: 0,
    color: "",
  })

  const currentSlide = (i: number) => {
    return index.slide === i
      ? "bg-gradient-to-b from-black to-[hsla(0,0%,10%,.9)] z-10 max-h-[400px]"
      : "bg-[hsla(0,0%,20%,.5)] max-h-[300px]"
  }

  const toRight = () => {
    setIndex((prev) => ({ ...prev, slide: prev.slide + 1 }))
    setSlideAnim((prev) => {
      if (!prev.s1)
        return {
          s1: "animate-slideToRight",
          s2: "animate-slideToLeft",
          s3: "animate-slideToMiddle",
        }
      return {
        s1: prev.s3,
        s2: prev.s1,
        s3: prev.s1,
      }
    })
  }
  const toLeft = () => {
    setIndex((prev) => ({ ...prev, slide: prev.slide - 1 }))
    setSlideAnim((prev) => {
      if (!prev.s1)
        return {
          s1: "animate-slideToMiddle",
          s2: "animate-slideToRight",
          s3: "animate-slideToLeft",
        }
      return {
        s1: prev.s2,
        s2: prev.s3,
        s3: prev.s1,
      }
    })
  }

  return (
    <div>
      {/* gradient green box */}
      <div
        className="h-[90vh] w-[90vw] max-w-4xl shadow-emerald-200 relative my-[5vh] mx-auto
       rounded-2xl bg-gradient-to-tr from-emerald-900 to-green-400 uppercase text-white
       text-2xl font-black text-center"
      >
        {/* Arrows */}
        <div
          className={`${styles.absoluteCenter} z-50 flex justify-between c:text-[50px] w-[calc(40%+50px)]
          text-green-500 c:rounded-full c:bg-[hsla(0,0%,0%,.9)] c:shadow-[0_0_30px_0_white] c:cursor-pointer`}
        >
          <HiChevronLeft onClick={() => toLeft()} />
          <HiChevronRight onClick={() => toRight()} />
        </div>
        {/* Add to cart */}

        {/* slides container */}
        <div className="c:w-[40%] c:absolute c:p-12 c:rounded-[35px] c:flex c:flex-col c:justify-between">
          {/* first slide */}
          <div
            className={`left-[5%] top-1/2 -translate-y-1/2 h-full 
            ${currentSlide(0)} ${slideAnim.s1}`}
          >
            <h2 className="text-white [textShadow:0_0_7px_white] pb-2 text-4xl tracking-wider">
              Reviews
            </h2>
          </div>
          {/* second slide */}
          <div
            className={`${styles.absoluteCenter} h-full ${currentSlide(1)}
            ${slideAnim.s2}`}
          >
            <h2 className="text-white [textShadow:0_0_7px_white] pb-2 text-4xl tracking-wider">
              {product.name}
            </h2>
            <h2 className="text-green-500 [textShadow:0_0_10px_green] pb-4 text-sm">
              {product.slogan}
            </h2>
            <div className="relative mx-auto flex-1 max-w-full aspect-video">
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
          </div>
          {/* third slide */}
          <div
            className={`right-[5%] top-1/2 -translate-y-1/2 h-full
            ${currentSlide(2)} ${slideAnim.s3}`}
          >
            <h2 className="text-white [textShadow:0_0_7px_white] pb-2 text-4xl tracking-wider">
              Customize
            </h2>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MultiSlide
