'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { TitleText, TypingText } from './CustomTexts'
import { motion } from 'framer-motion'
import { slideIn } from '../lib/motion'
import { Product, sortedReviews } from '../types'
import styles from '../styles'
import ProductModal from './ProductModal'

const Products = ({ products, reviews }: { products: Product[]; reviews: sortedReviews }) => {
  const [isTouchScreen, setIsTouchScreen] = useState<boolean>(false)
  const [hovered, setHovered] = useState<number>()
  const [currentProduct, setCurrentProduct] = useState<number>(0)
  const [showModal, setShowModal] = useState<boolean>(false)

  useEffect(() => {
    setIsTouchScreen('ontouchstart' in window || navigator.maxTouchPoints > 0)
  }, [])

  const select = (i: number) => {
    if (!isTouchScreen) setHovered(i)
  }

  function handleClick(i: number) {
    setCurrentProduct(i)
    setShowModal(true)
  }

  return (
    <>
      <div className='m-auto flex w-[70%] max-w-4xl flex-wrap justify-center gap-14 py-40 text-white'>
        {products?.map((product, i) => (
          <div
            key={`product-${product.name}`}
            className='group relative h-64 w-56 cursor-pointer rounded-md shadow-[0_0_25px_6px]  shadow-gray-700'
            onMouseOver={() => select(i)}
            onClick={() => handleClick(i)}
          >
            <Image
              width={1000}
              height={1200}
              quality={100}
              src={product.image}
              alt={`Xphoria ${product.name}`}
              className='h-full rounded-md'
            />
            {hovered === i ? (
              <motion.div
                className={`${styles.absoluteCenter} hidden overflow-hidden
                rounded-md shadow-[0_0_50px_6px] shadow-emerald-900 group-hover:inline-block`}
                animate={{ width: '125%', height: '125%' }}
                viewport={{ once: false }}
              >
                <motion.div
                  variants={slideIn('top', 'tween', 0, 0.2)}
                  className='absolute bottom-0 w-full bg-[hsla(0,0%,0%,50%)]'
                  initial='hidden'
                  whileInView='show'
                >
                  <TypingText
                    title={product.name}
                    textStyles='text-2xl font-bold'
                  />
                  <TitleText
                    title={`$${product.price}`}
                    textStyles="text-2xl font-['east_sea_dokdo'] text-emerald-400 absolute right-2 bottom-0"
                  />
                </motion.div>
              </motion.div>
            ) : (
              isTouchScreen && (
                <div className='relative border-b-2 border-emerald-500'>
                  <TypingText
                    title={product.name}
                    textStyles='text-2xl font-bold'
                  />
                  <TitleText
                    title={`$${product.price}`}
                    textStyles="text-2xl font-['east_sea_dokdo'] text-emerald-400 absolute right-2 bottom-0"
                  />
                </div>
              )
            )}
          </div>
        ))}
      </div>
      <ProductModal
        key={`${products[currentProduct].name} Modal`}
        product={products[currentProduct]}
        reviews={reviews[products[currentProduct].name]}
        showModal={showModal}
        setShowModal={setShowModal}
      />
    </>
  )
}

export default Products
