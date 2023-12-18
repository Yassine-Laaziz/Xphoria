'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { TitleText, TypingText } from './CustomTexts'
import { motion } from 'framer-motion'
import { slideIn } from '../lib/motion'
import { DisplayProduct } from '../types'
import styles from '../styles'
import ProductModal from './ProductModal'

export default function Products({ products }: { products: DisplayProduct[] }) {
  const [isTouchScreen, setIsTouchScreen] = useState<boolean>(false)
  const [hovered, setHovered] = useState<number>()
  const [currentProduct, setCurrentProduct] = useState<number>(0)
  const [showModal, setShowModal] = useState<boolean>(false)

  useEffect(() => setIsTouchScreen('ontouchstart' in window || navigator.maxTouchPoints > 0), [])

  const hover = (i: number) => {
    if (!isTouchScreen) setHovered(i)
  }

  function handleClick(i: number) {
    setCurrentProduct(i)
    setShowModal(true)
  }

  return (
    products[0] && (
      <>
        <h2 className="my-20 text-center text-5xl font-bold text-sky-400 [textShadow:0_0_20px_cyan] dark:text-white">Products</h2>
        <div className="m-auto flex w-[70%] max-w-4xl flex-wrap justify-center gap-14 pb-40 text-white">
          {products.map((product, i) => (
            <div
              key={`product-${product._id}`}
              className="group relative h-72 w-64 cursor-pointer rounded-md p-4 shadow-[0_0_20px_1px] shadow-cyan-400/40 transition-all hover:scale-110 dark:shadow-gray-700"
              onMouseOver={() => hover(i)}
              onMouseLeave={() => hover(-1)} // this is to lose focus
              onClick={() => handleClick(i)}
            >
              <Image
                width={1000}
                height={1200}
                quality={100}
                src={product.image}
                alt={`Xphoria ${product.name}`}
                className="h-full rounded-md object-contain"
              />
              {hovered === i ? (
                <motion.div
                  className={`${styles.absoluteCenter} overflow-hidden rounded-md shadow-[0_0_50px_50px_inset_white] group-hover:inline-block`}
                  initial={{ width: '100%', height: '100%' }}
                  animate={{ width: '115%', height: '115%' }}
                >
                  <motion.div
                    variants={slideIn('top', 'tween', 0, 0.2)}
                    className="absolute bottom-0 w-full bg-cyan-300 shadow-[0_0_50px_1px_white] dark:bg-emerald-500"
                    initial="hidden"
                    whileInView="show"
                  >
                    <TypingText title={product.name} textStyles="text-2xl text-white font-bold pl-2" />
                    <TitleText title={`$${product.price}`} textStyles="text-2xl text-black absolute right-2 bottom-0" />
                  </motion.div>
                </motion.div>
              ) : (
                isTouchScreen && (
                  <div className="relative border-b-2 border-cyan-400 dark:border-emerald-500">
                    <TypingText title={product.name} textStyles="text-2xl font-bold" />
                    <TitleText title={`$${product.price}`} textStyles="text-2xl text-emerald-400 absolute right-2 bottom-0" />
                  </div>
                )
              )}
            </div>
          ))}
        </div>
        <ProductModal
          key={`${products[currentProduct].name} Modal`}
          product={products[currentProduct]}
          showModal={showModal}
          setShowModal={setShowModal}
        />
      </>
    )
  )
}
