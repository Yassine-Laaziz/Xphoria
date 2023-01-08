"use client"

import Image from "next/image"
import { useEffect, useState } from "react"
import { urlFor } from "../lib/sanity"
import { TitleText, TypingText } from "../components/CustomTexts"
import { motion } from "framer-motion"
import { slideIn } from "../lib/motion"
import Link from "next/link"
import { Product } from "../types"
import styles from "../styles"

const Products = ({ products }: { products: Product[] }) => {
  const [isTouchScreen, setIsTouchScreen] = useState<boolean>(false)
  const [selected, setSelected] = useState<number>()

  useEffect(() => {
    setIsTouchScreen("ontouchstart" in window || navigator.maxTouchPoints > 0)
  }, [])

  const select = (i: number) => {
    if (!isTouchScreen) setSelected(i)
  }

  return (
    <div className="text-white flex justify-center max-w-4xl w-[70%] gap-5 m-auto py-40">
      {products?.map((product, i) => (
        <Link href={`/Product/${product.slug.current}`} key={`products-${i}`}>
          <div
            className="w-56 h-64 relative group rounded-md cursor-pointer shadow-[0_0_25px_6px]  shadow-gray-700"
            onMouseOver={() => select(i)}
          >
            <Image
              width={1000}
              height={1200}
              quality={100}
              src={urlFor(product.image).url()}
              alt="Green Astronauts"
              className="h-full rounded-md"
            />
            {selected === i ? (
              <div
                className={`${styles.absoluteCenter} hidden group-hover:inline-block
              overflow-hidden rounded-md shadow-[0_0_50px_6px] shadow-emerald-900 animate-bigger`}
              >
                <motion.div
                  variants={slideIn("top", "tween", 0, 0.2)}
                  className="absolute bottom-0 bg-[hsla(0,0%,0%,50%)] w-full"
                  initial="hidden"
                  whileInView="show"
                >
                  <TypingText
                    title={product.name}
                    textStyles="text-2xl font-bold"
                  />
                  <TitleText
                    title={`$${product.price}`}
                    textStyles="text-2xl font-['east_sea_dokdo'] text-emerald-400 absolute right-2 bottom-0"
                  />
                </motion.div>
              </div>
            ) : (
              isTouchScreen && (
                <div className="relative border-b-2 border-emerald-500">
                  <TypingText
                    title={product.name}
                    textStyles="text-2xl font-bold"
                  />
                  <TitleText
                    title={`$${product.price}`}
                    textStyles="text-2xl font-['east_sea_dokdo'] text-emerald-400 absolute right-2 bottom-0"
                  />
                </div>
              )
            )}
          </div>
        </Link>
      ))}
    </div>
  )
}

export default Products
