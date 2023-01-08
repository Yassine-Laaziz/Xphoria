"use client"

import Image from "next/image"
import { Product, ProductOptions } from "../types"
import { HiChevronLeft, HiChevronRight } from "react-icons/hi"
import styles from "../styles"
import { urlFor } from "../lib/sanity"
import { useState } from "react"

function MultiSlide({ product }: { product: Product }) {
  const [index, setIndex] = useState<number>(0)
  const [productOptions, setProductOptions] = useState<ProductOptions>({
    size: 0,
    colour: "",
  })

  console.log(product)

  return (
    <div>
      <div
        className="h-[90vh] w-[90vw] shadow-emerald-200 relative my-[5vh] mx-auto
       rounded-2xl bg-gradient-to-tr from-emerald-900 to-green-400 uppercase text-white
       text-2xl font-black text-center"
      >
        {/* Arrows */}
        <div
          className={`${styles.absoluteCenter} z-10 flex justify-between c:text-[50px] w-[calc(40%+50px)]
          text-green-500 c:rounded-full c:bg-black c:shadow-[0_0_30px_0_white]`}
        >
          <HiChevronLeft /> <HiChevronRight />
        </div>
        {/* Add to cart */}

        <div className="c:w-[40%] c:h-90 c:absolute c:top-1/2 c:left-1/2 c:-translate-x-1/2 c:-translate-y-1/2">
          {/* first slide */}
          <div />
          {/* second slide */}
          <div className="bg-gradient-to-b from-black to-[hsla(0,0%,10%,.6)] h-full p-12 rounded-[35px]">
            <h1 className="text-white [textShadow:0_0_7px_white] pb-4 text-4xl">
              {product.name}
            </h1>
            <h2 className="text-green-500 [textShadow:0_0_10px_green] text-sm">
              {product.slogan}
            </h2>
            <div className="relative h-1/3 w-[80%]">
              <Image
                src={urlFor(product.noBgImages[0].images).url()}
                fill={true}
                alt={`Green-Astronauts-${product.name}`}
              />
            </div>
          </div>
          {/* third slide */}
          <div />
        </div>
      </div>
    </div>
  )
}

export default MultiSlide
