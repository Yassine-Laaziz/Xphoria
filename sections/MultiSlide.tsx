"use client"

import Image from "next/image"
import { Product, ProductOptions } from "../types"
import { HiChevronLeft, HiChevronRight } from "react-icons/hi"
import styles from "../styles"
import { urlFor } from "../lib/sanity"
import { useState } from "react"

function MultiSlide({ product }: { product: Product }) {
  const [index, setIndex] = useState<{ mainImage: number; color: number }>({
    mainImage: 0,
    color: 0,
  })

  const [productOptions, setProductOptions] = useState<ProductOptions>({
    size: 0,
    color: "",
  })

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
          className={`${styles.absoluteCenter} z-10 flex justify-between c:text-[50px] w-[calc(40%+50px)]
          text-green-500 c:rounded-full c:bg-[hsla(0,0%,0%,.9)] c:shadow-[0_0_30px_0_white] c:cursor-pointer`}
        >
          <HiChevronLeft /> <HiChevronRight />
        </div>
        {/* Add to cart */}

        {/* slides container */}
        <div className="c:w-[40%] c:absolute c:p-12 c:rounded-[35px] c:flex c:flex-col c:justify-between
        c:h-full c:max-h-[400px] c:bg-gradient-to-b c:from-black c:to-[hsla(0,0%,10%,.6)]">
          {/* first slide */}
          <div className="-z-10 right-1/3">

          </div>
          {/* second slide */}
          <div className={`${styles.absoluteCenter}`}>
            <h1 className="text-white [textShadow:0_0_7px_white] pb-2 text-4xl tracking-wider">
              {product.name}
            </h1>
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
              rounded-md p-2 before:content-[''] before:w-full before:h-8 before:bg-gradient-to-l before:from-white
              before:to-green-600 before:animate-rotate before:-z-10 before:top-1/2 before:left-1/2 before:[translate:-50%_-50%]
              before:absolute z-10 overflow-hidden after:absolute after:bg-black after:inset-1 after:rounded-md after:-z-10
              cursor-pointer hover:scale-110 transition"
            >
              Add to bag
            </h2>
          </div>
          {/* third slide */}
          <div />
        </div>
      </div>
    </div>
  )
}

export default MultiSlide
