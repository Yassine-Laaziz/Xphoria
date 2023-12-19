'use client'

import '../styles/components/MultiSlide.css'
import styles from '../styles'
import Image from 'next/image'
import { DisplayProduct, ProductOptions, User } from '../types'
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi'
import { Dispatch, SetStateAction, useState } from 'react'
import { ExclamationCircleIcon, StarIcon } from '@heroicons/react/24/outline'
import sendReview from '../lib/serverFunctions/sendReview'
import { motion } from 'framer-motion'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useRouter } from 'next/navigation'
import { err } from '../lib/constants'
import { useUserContext } from '../lib/contexts/UserContext'
import { useCartContext } from '../lib/contexts/CartContext'

export default function ProductPage({ product }: { product: DisplayProduct }) {
  const [index, setIndex] = useState<Tindex>({
    mainImage: 0,
    color: 0,
    slide: { s1: false, s2: true, s3: false },
  })
  const [chosenOptions, setChosenOptions] = useState<ProductOptions>({
    size: product.options[0].sizes[0],
    color: product.options[0].color,
    colorName: product.options[0].colorName,
    mainImage: product.options[index.color].images[0],
  })
  const [animating, setAnimating] = useState<boolean>(false)
  const [reviewInput, setReviewInput] = useState<ReviewInput>({
    comment: '',
    rating: 0,
  })

  function navigate(d: ('s1' | 's2' | 's3')[]): void {
    if (animating) return
    setAnimating(true)
    setIndex(prev => ({
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
    if (index.color === i) return
    setIndex(prev => ({ ...prev, color: i, mainImage: 0 }))
    setChosenOptions({
      size: product.options[i].sizes[0],
      color,
      colorName,
      mainImage: product.options[i].images[0],
    })
  }

  const { push } = useRouter()

  return (
    <>
      <div
        className="[transform-style: preserve-3d] relative mx-auto flex h-screen max-h-[500px] w-full
       max-w-7xl select-none items-center justify-center overflow-hidden rounded-2xl
       bg-[hsla(183,100%,50%,.1)] text-center text-white dark:bg-gradient-to-tr dark:from-emerald-900
        dark:to-green-400 dark:shadow-emerald-200 sm:h-[90vh]"
      >
        {/* inputs for the slides */}
        <input type="radio" name="slider" className="hidden" id="s1" checked={index.slide.s1} readOnly />
        <input type="radio" name="slider" className="hidden" id="s2" checked={index.slide.s2} readOnly />
        <input type="radio" name="slider" className="hidden" id="s3" checked={index.slide.s3} readOnly />

        {/* Arrows */}
        <div
          className={`z-50 flex h-0 w-[calc(80%+50px)] items-center justify-between text-cyan-400 transition-all 
            c:cursor-pointer c:rounded-full c:bg-white c:text-[50px] c:shadow-[0_0_20px_2px_white] dark:text-green-500 dark:c:bg-black
            dark:c:bg-opacity-75 dark:c:shadow-[0_0_20px_2px_black] sm:w-[calc(60%+50px)] md:w-[calc(50%+50px)]  lg:w-[calc(33.33%+50px)]
          ${styles.absoluteCenter}
          ${animating ? 'cursor-default opacity-0' : ''}`}
        >
          <HiChevronLeft onClick={() => navigate(['s2', 's3', 's1'])} />
          <HiChevronRight onClick={() => navigate(['s3', 's1', 's2'])} />
        </div>

        {/* slides container */}
        <div
          className="cards relative flex h-[90%] w-full items-center font-black uppercase [perspective:1000px]
        [transform-style:preserve-3d] c:absolute c:left-0 c:right-0 c:m-auto c:flex c:h-full c:min-h-fit c:w-[60%]
        c:flex-col c:justify-between c:rounded-[35px] c:p-6 c:transition-all c:duration-500 sm:c:p-9 md:c:w-[50%] lg:c:w-1/3"
        >
          {/* First Slide */}
          <label htmlFor="s1" id="slide1">
            <FirstCard product={product} reviewInput={reviewInput} setReviewInput={setReviewInput} push={push} />
          </label>
          {/* Second Slide */}
          <label htmlFor="s2" id="slide2">
            <SecondCard product={product} index={index} setIndex={setIndex} chosenOptions={chosenOptions} push={push} />
          </label>
          {/* Third Slide */}
          <label htmlFor="s3" id="slide3">
            <ThirdCard
              index={index}
              product={product}
              chosenOptions={chosenOptions}
              setChosenOptions={setChosenOptions}
              changeColor={changeColor}
            />
          </label>
        </div>
      </div>
      <ToastContainer position="top-center" autoClose={7000} closeOnClick pauseOnFocusLoss draggable pauseOnHover theme="dark" />
    </>
  )
}

function FirstCard({ reviewInput, setReviewInput, product, push }: FirstCardProps) {
  const [isDragging, setIsDragging] = useState<boolean>(false)
  const [isSending, setIsSending] = useState<boolean>(false)
  const { user, setUser } = useUserContext()
  const userAlreadyReviewed = user.reviews.some(review => review.productID === product._id) || null

  const handleStarClick = (stars: number) => {
    setReviewInput(prev => ({ ...prev, rating: stars }))
  }

  const handleMouseDown = () => {
    setIsDragging(true)
  }

  const handleMouseLeave = () => {
    setIsDragging(false)
  }

  const handleMouseEnter = (stars: number) => {
    if (isDragging) {
      setReviewInput(prev => ({ ...prev, rating: stars }))
    }
  }

  async function hydrateSendReview() {
    if (isSending) return
    if (userAlreadyReviewed) return

    setIsSending(true)

    // below i'm using an almost instant server function so i wouldn't need a loading/optimistic state even for a low-end connection
    const res = await sendReview(reviewInput.comment, reviewInput.rating, product._id)
    setIsSending(false)

    if (res.redirect) return push(res.redirect)

    if (res.newReview) {
      const updatedUser: User = { ...user, reviews: [...user.reviews, res.newReview] }
      setUser(updatedUser)
    } else {
      const autoClose = res.msg ? res.msg.split('').length * 100 + 500 : 100 * 80 + 500
      toast(res.msg || err, {
        type: 'warning',
        toastId: 'error',
        className: '!bg-black !text-cyan-400',
        progressClassName: '!bg-white dark:!bg-emerald-400',
        autoClose,
      })
    }
  }

  return (
    <>
      <h2 className="pb-2 text-3xl tracking-wider text-white dark:[textShadow:0_0_7px_white] sm:text-4xl">Reviews</h2>
      {product.reviews?.[0] ? (
        product.reviews.map(review => (
          <div key={'review' + review.userID} className="flex-1 overflow-y-auto py-2">
            <p>{review.rating}</p>
            <p>{review.username}</p>
            <p>{review.comment}</p>
          </div>
        ))
      ) : (
        <section className="flex flex-col gap-2 [textShadow:0_0_7px_cyan]">
          <ExclamationCircleIcon className="mx-auto flex h-8 w-8 items-center justify-center rounded-full bg-cyan-400 text-white dark:bg-emerald-500 sm:h-12 sm:w-12" />
          <h3 className="mt-4 text-center font-medium dark:[textShadow:0_0_7px_white] sm:text-lg">No reviews yet</h3>
        </section>
      )}
      {!userAlreadyReviewed && (
        <section className="flex flex-col gap-3">
          <div className="flex overflow-hidden rounded-md border-2 border-black dark:border-gray-400">
            <input
              className="flex-1 px-2 text-blue-400 outline-0 placeholder:text-cyan-400 dark:bg-black dark:text-emerald-600 dark:placeholder:text-emerald-600"
              value={reviewInput.comment}
              maxLength={200}
              onChange={e => setReviewInput(prev => ({ ...prev, comment: e.target.value }))}
              placeholder="what do you think of it?"
            />
            <StarIcon className="h-10 w-10 cursor-pointer bg-gray-900 p-2 text-white dark:text-emerald-500" onClick={hydrateSendReview} />
          </div>
          <div
            className="m-auto flex max-w-min items-center"
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseLeave}
            onMouseLeave={handleMouseLeave}
          >
            {[...Array(5)].map((_, index) => (
              <motion.div
                key={index}
                className="cursor-pointer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onMouseEnter={() => handleMouseEnter(index + 1)}
                onClick={() => handleStarClick(index + 1)}
              >
                <StarIcon className={`h-6 w-6 ${index < reviewInput.rating ? 'fill-cyan-400 dark:fill-emerald-500' : 'fill-white'}`} />
              </motion.div>
            ))}
          </div>
        </section>
      )}
    </>
  )
}
function SecondCard({ product, index, setIndex, chosenOptions }: SecondCardProps) {
  const { addItem } = useCartContext()

  async function handleAddToBag() {
    addItem(product, chosenOptions)
    toast.success('Added !')
  }

  return (
    <>
      <section>
        <h2 className="pb-2 text-3xl tracking-wider text-white dark:[textShadow:0_0_7px_white] sm:text-4xl">{product.name}</h2>
        <h4 className="pb-4 text-xs text-white [textShadow:0_0_10px_cyan] dark:text-green-500 dark:[textShadow:0_0_10px_green] sm:text-sm">
          {product.slogan}
        </h4>
      </section>
      <section className="relative m-auto aspect-video h-full w-auto max-w-full flex-1 object-contain">
        <Image src={product.options[index.color].images[index.mainImage]} fill={true} alt={`Xphoria-${product.name}`} quality={100} />
      </section>
      <section className="relative mx-auto mt-auto flex w-fit justify-center gap-5 pt-4">
        {product.options[index.color].images.map((img, i) => (
          <div
            key={`Xphoria-img-${i}`}
            className={`flex aspect-video w-14 items-center rounded-md border-white p-1 transition-all dark:border-emerald-700
            ${index.mainImage === i ? 'border-2' : 'border-[1px] border-cyan-400'}`}
            onMouseOver={() => setIndex(prev => ({ ...prev, mainImage: i }))}
          >
            <Image src={img} alt={`Xphoria-${product.name}${i}`} width={1200} height={1200} />
          </div>
        ))}
      </section>
      <h2
        className={`absolute -bottom-5 left-1/2 -translate-x-1/2 cursor-pointer bg-black text-black transition
         hover:scale-110 dark:text-white ${styles.loopingBorder} whitespace-nowrap [text-shadow:0_0_4px_white]`}
        onClick={handleAddToBag}
      >
        Add to bag
      </h2>
    </>
  )
}
function ThirdCard({ product, index, chosenOptions, setChosenOptions, changeColor }: ThirdCardProps) {
  return (
    <>
      <h2 className="pb-2 text-3xl font-black tracking-wider text-white dark:[textShadow:0_0_7px_white] sm:text-4xl">Customize</h2>
      <h3 className="font-silkscreen text-3xl font-bold [textShadow:0_0_5px_white]">{product.price}$</h3>
      <section className="mx-auto flex max-h-72 w-fit flex-1 flex-col justify-around">
        <div>
          <h2>select size</h2>
          <div>
            <h3 className="mx-auto mb-2 mt-1 w-fit flex-wrap rounded-lg px-2 py-1 font-black">{chosenOptions.size}</h3>
            <div className="flex flex-wrap justify-around gap-3">
              {product.options[index.color].sizes.map((size, i) => (
                <h2
                  className={`cursor-pointer rounded-lg bg-white p-2 text-cyan-400 transition-all dark:bg-[hsla(0,0%,0%,.8)] dark:text-white
                      ${chosenOptions.size === size ? 'scale-125 border-2 border-black dark:border-white' : ''}`}
                  onClick={() => setChosenOptions(prev => ({ ...prev, size }))}
                  key={`sizes-pick-${i}`}
                >
                  {size}
                </h2>
              ))}
            </div>
          </div>
        </div>
        <div>
          <h2>select colour</h2>
          <div>
            <h3
              className="[textShadow:0_0_7px_black ] mx-auto mb-2 mt-1 w-fit flex-wrap rounded-lg px-2 py-1
              text-sm"
              style={{ color: chosenOptions.color }}
            >
              {chosenOptions.colorName}
            </h3>
            <div className="flex flex-wrap justify-center gap-3 before:absolute before:top-[60%] before:-z-20 before:h-[250px] before:w-[400px] before:rounded-full before:bg-radial-gradient before:from-white before:to-transparent before:blur-2xl before:content-[''] dark:before:blur-3xl ">
              {product.options.map((obj, i) => (
                <div
                  onClick={() => changeColor(i, obj.color, obj.colorName)}
                  className={`inline-block h-8 w-8 cursor-pointer rounded-full border-2 border-white transition-all
                      ${index.color === i ? 'scale-125' : ''}`}
                  key={`color-pick-${i}`}
                  style={{ backgroundColor: obj.color }}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

interface Tindex {
  mainImage: number
  color: number
  slide: { s1: boolean; s2: boolean; s3: boolean }
}

interface ReviewInput {
  rating: number
  comment: string
}

interface FirstCardProps {
  reviewInput: ReviewInput
  setReviewInput: Dispatch<SetStateAction<ReviewInput>>
  product: DisplayProduct
  push: (href: string) => void
}
interface SecondCardProps {
  product: DisplayProduct
  index: Tindex
  setIndex: Dispatch<SetStateAction<Tindex>>
  chosenOptions: ProductOptions
  push: (href: string) => void
}
interface ThirdCardProps {
  product: DisplayProduct
  index: Tindex
  chosenOptions: ProductOptions
  setChosenOptions: Dispatch<SetStateAction<ProductOptions>>
  changeColor: (i: number, color: string, colorName: string) => void
}
