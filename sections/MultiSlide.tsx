"use client"

import "../styles/components/MultiSlide.css"
import styles from "../styles"
import Image from "next/image"
import { Product, ProductOptions } from "../types"
import { HiChevronLeft, HiChevronRight } from "react-icons/hi"
import { RxThickArrowUp } from "react-icons/rx"
import { urlFor } from "../lib/sanity"
import { useState } from "react"
import { colord } from "colord"

function MultiSlide({ product }: { product: Product }) {
  const [index, setIndex] = useState<{
    mainImage: number
    color: number
    slide: { s1: boolean; s2: boolean; s3: boolean }
  }>({
    mainImage: 0,
    color: 0,
    slide: { s1: false, s2: true, s3: false },
  })
  const [chosenOptions, setChosenOptions] = useState<ProductOptions>({
    size: product.noBgImages[0].sizes[0],
    color: product.noBgImages[0].color,
    colorName: product.noBgImages[0].colorName,
  })
  const [animating, setAnimating] = useState<boolean>(false)
  const [review, setReview] = useState<string>("")

  function navigate(d: ("s1" | "s2" | "s3")[]): void {
    setAnimating(true)
    setIndex((prev) => ({
      ...prev,
      slide: {
        s1: prev.slide[d[0]],
        s2: prev.slide[d[1]],
        s3: prev.slide[d[2]],
      },
    }))
    setTimeout(() => {
      setAnimating(false)
    }, 500)
  }

  function changeColor(i: number, color: string, colorName: string): void {
    setIndex((prev) => ({ ...prev, color: i, mainImage: 0 }))
    setChosenOptions({ size: product.noBgImages[i].sizes[0], color, colorName })
  }

  return (
    <div
      className="h-screen sm:w-[90%] sm:h-[90vh] max-w-6xl max-h-[500px] shadow-emerald-200 relative sm:my-[5vh] mx-auto
       rounded-2xl bg-gradient-to-tr from-emerald-900 to-green-400 text-white
       text-center flex justify-center items-center [transform-style: preserve-3d] overflow-hidden"
    >
      {/* inputs for the slides */}
      <input
        type="radio"
        name="slider"
        className="hidden"
        id="s1"
        checked={index.slide.s1}
        readOnly
      />
      <input
        type="radio"
        name="slider"
        className="hidden"
        id="s2"
        checked={index.slide.s2}
        readOnly
      />
      <input
        type="radio"
        name="slider"
        className="hidden"
        id="s3"
        checked={index.slide.s3}
        readOnly
      />

      {/* Arrows */}
      {!animating && (
        <div
          className={`z-50 flex justify-between c:text-[50px] w-[calc(80%+50px)] sm:w-[calc(60%+50px)] md:w-[calc(50%+50px)]
          lg:w-[calc(33.33%+50px)] text-green-500 c:rounded-full c:bg-[hsla(0,0%,0%,.9)] c:cursor-pointer h-0 items-center
          ${styles.absoluteCenter}
          ${!animating ? "animate-fadeIn" : ""}`}
        >
          <HiChevronLeft onClick={() => navigate(["s2", "s3", "s1"])} />
          <HiChevronRight onClick={() => navigate(["s3", "s1", "s2"])} />
        </div>
      )}

      {/* slides container */}
      <div
        className="cards relative flex items-center [perspective:1000px] [transform-style:preserve-3d] w-full h-[90%]
        c:absolute c:left-0 c:right-0 c:m-auto c:transition-all c:duration-500 c:w-[80%] sm:c:w-[60%] md:c:w-[50%]
        lg:c:w-1/3 c:h-full c:p-6 sm:c:p-9 c:rounded-[35px] c:flex c:flex-col c:justify-between font-black uppercase"
      >
        {/* First Slide */}
        <label htmlFor="s1" id="slide1">
          <h2 className="text-white [textShadow:0_0_7px_white] pb-2 text-3xl sm:text-4xl tracking-wider">
            Reviews
          </h2>
          <div>

          </div>
          <section className="flex-1 overflow-y-auto py-2">
          </section>
          <section className="flex rounded-lg border-2 border-gray-700 overflow-hidden">
            <input
              className="flex-1 placeholder:text-emerald-600 pl-2 text-emerald-600 bg-black"
              onChange={(e) => setReview(e.target.value)}
              placeholder="what do you think of it?"
            />
            <RxThickArrowUp
              color="rgb(4,120,87)"
              fontSize="30px"
              className="bg-gray-900 cursor-pointer"
            />
          </section>
        </label>
        {/* Second Slide */}
        <label htmlFor="s2" id="slide2">
          <section>
            <h2 className="text-white [textShadow:0_0_7px_white] pb-2 text-3xl sm:text-4xl tracking-wider">
              {product.name}
            </h2>
            <h4 className="text-green-500 [textShadow:0_0_10px_green] pb-4 text-xs sm:text-sm">
              {product.slogan}
            </h4>
          </section>
          <section className="relative m-auto flex-1 max-w-full aspect-video">
            <Image
              src={urlFor(
                product.noBgImages[index.color].images[index.mainImage]
              ).url()}
              fill={true}
              alt={`Green-Astronauts-${product.name}`}
              quality={100}
            />
          </section>
          <section className="relative mt-auto pt-4 mx-auto flex gap-5 justify-center w-fit">
            {product.noBgImages[index.color].images.map((img, i) => (
              <div
                key={`Green-Astronauts-${img}${i}`}
                className={`border-emerald-700 rounded-md w-14 aspect-video p-1 flex items-center
                  ${
                    index.mainImage === i
                      ? "scale-125 border-2"
                      : "border-[1px]"
                  }`}
                onMouseOver={() =>
                  setIndex((prev) => ({ ...prev, mainImage: i }))
                }
              >
                <Image
                  src={urlFor(product.noBgImages[index.color].images[i]).url()}
                  alt={`Green-Astronauts-${product.name}${i}`}
                  quality={100}
                  width={1200}
                  height={1200}
                />
              </div>
            ))}
          </section>
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
          <h2 className="text-white [textShadow:0_0_7px_white] pb-2 text-3xl sm:text-4xl tracking-wider font-black">
            Customize
          </h2>
          <h3 className="[textShadow:0_0_5px_white] text-3xl font-bold">
            {product.price}$
          </h3>
          <section className="w-fit mt-auto mx-auto flex flex-col gap-5">
            <section>
              <h2>select colour</h2>
              <div className="bg-gray-900 bg-opacity-80 rounded-md px-4 py-2">
                <h3
                  className="mb-2 py-1 px-2 text-2xl rounded-md shadow-[0_0_15px_10px_inset]"
                  style={{
                    color: chosenOptions.color,
                    textShadow: colord(chosenOptions.color).isDark()
                      ? `0 0 10px ${colord(chosenOptions.color)
                          .invert()
                          .toHslString()}`
                      : "",
                  }}
                >
                  {chosenOptions.colorName}
                </h3>
                <div className="flex justify-around gap-3">
                  {product.noBgImages.map((obj, i) => (
                    <div
                      onClick={() => changeColor(i, obj.color, obj.colorName)}
                      className={`rounded-full inline-block w-6 h-6 cursor-pointer [border:1px_solid_black]
                      ${index.color === i ? "scale-125" : ""}`}
                      key={`color-pick-${i}`}
                      style={{ backgroundColor: obj.color }}
                    />
                  ))}
                </div>
              </div>
            </section>
            <section>
              <h2>select size</h2>
              <div className="bg-gray-900 bg-opacity-80 rounded-md px-4 py-2">
                <h3 className="font-black mb-1">{chosenOptions.size}</h3>
                <div className="flex justify-around gap-3">
                  {product.noBgImages[index.color].sizes.map((size, i) => (
                    <h2
                      className={`p-2 bg-[hsla(0,0%,0%,.8)] rounded-lg cursor-pointer
                      ${chosenOptions.size === size ? "scale-125" : ""}`}
                      onClick={() =>
                        setChosenOptions((prev) => ({ ...prev, size }))
                      }
                      key={`sizes-pick-${i}`}
                    >
                      {size}
                    </h2>
                  ))}
                </div>
              </div>
            </section>
          </section>
        </label>
      </div>
    </div>
  )
}

export default MultiSlide
