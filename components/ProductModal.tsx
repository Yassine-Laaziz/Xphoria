'use client'

import '../styles/components/MultiSlide.css'
import styles from '../styles'
import Image from 'next/image'
import { DisplayProduct, ProductOptions, User } from '../types'
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi'
import { Dispatch, SetStateAction, useState } from 'react'
import { colord } from 'colord'
import Modal from './Modal'
import { ExclamationCircleIcon, StarIcon } from '@heroicons/react/24/outline'
import { sendReview, addToBag } from '../lib/serverActions'
import { motion } from 'framer-motion'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useRouter } from 'next/navigation'
import { useUserContext } from '../lib/contexts/UserContext'
import { err } from '../lib/constants'
import { useLayoutContext } from '../lib/contexts/LayoutContext'

export default function ProductModal({ product, showModal, setShowModal }: props) {
  const [index, setIndex] = useState<Tindex>({
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
    setIndex(prev => ({ ...prev, color: i, mainImage: 0 }))
    setChosenOptions({ size: product.noBgImages[i].sizes[0], color, colorName })
  }

  const { push } = useRouter()

  return (
    <Modal
      open={showModal}
      setOpen={setShowModal}
    >
      <div
        className='[transform-style: preserve-3d] relative mx-auto flex h-screen max-h-[500px] w-full
       max-w-7xl select-none items-center justify-center overflow-hidden dark:bg-gradient-to-tr
       rounded-2xl bg-[hsla(183,100%,50%,.1)] text-center text-white dark:shadow-emerald-200
        dark:from-emerald-900 dark:to-green-400 sm:h-[90vh]'
      >
        {/* inputs for the slides */}
        <input
          type='radio'
          name='slider'
          className='hidden'
          id='s1'
          checked={index.slide.s1}
          readOnly
        />
        <input
          type='radio'
          name='slider'
          className='hidden'
          id='s2'
          checked={index.slide.s2}
          readOnly
        />
        <input
          type='radio'
          name='slider'
          className='hidden'
          id='s3'
          checked={index.slide.s3}
          readOnly
        />

        {/* Arrows */}
        <div
          className={`z-50 flex h-0 w-[calc(80%+50px)] items-center justify-between text-cyan-400 dark:text-green-500 
            c:rounded-full dark:c:bg-black dark:c:bg-opacity-75 c:bg-white c:text-[50px] sm:w-[calc(60%+50px)] transition-all
            c:cursor-pointer md:w-[calc(50%+50px)] lg:w-[calc(33.33%+50px)] c:shadow-[0_0_20px_2px_white]  dark:c:shadow-[0_0_20px_2px_black]
          ${styles.absoluteCenter}
          ${animating ? 'opacity-0 cursor-default' : ''}`}
        >
          <HiChevronLeft onClick={() => navigate(['s2', 's3', 's1'])} />
          <HiChevronRight onClick={() => navigate(['s3', 's1', 's2'])} />
        </div>

        {/* slides container */}
        <div
          className='cards relative flex h-[90%] w-full items-center font-black uppercase
        [perspective:1000px] [transform-style:preserve-3d] c:absolute c:left-0 c:right-0 c:m-auto c:flex c:h-full c:w-[80%]
        c:flex-col c:justify-between c:rounded-[35px] c:p-6 c:transition-all c:duration-500 sm:c:w-[60%] sm:c:p-9 md:c:w-[50%] lg:c:w-1/3'
        >
          {/* First Slide */}
          <label
            htmlFor='s1'
            id='slide1'
          >
            <FirstCard
              product={product}
              reviewInput={reviewInput}
              setReviewInput={setReviewInput}
              push={push}
            />
          </label>
          {/* Second Slide */}
          <label
            htmlFor='s2'
            id='slide2'
          >
            <SecondCard
              product={product}
              index={index}
              setIndex={setIndex}
              chosenOptions={chosenOptions}
              push={push}
            />
          </label>
          {/* Third Slide */}
          <label
            htmlFor='s3'
            id='slide3'
          >
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
      <ToastContainer
        position='top-center'
        autoClose={7000}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='dark'
      />
    </Modal>
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

    if (res.updatedReviews) {
      const updatedUser: User = { ...user, reviews: res.updatedReviews }
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
      <h2 className='pb-2 text-3xl tracking-wider text-white dark:[textShadow:0_0_7px_white] sm:text-4xl'>Reviews</h2>
      {product.reviews ? (
        product.reviews.map(review => (
          <div
            key={'review' + review.userID}
            className='flex-1 overflow-y-auto py-2'
          >
            <p>{review.rating}</p>
            <p>{review.username}</p>
            <p>{review.comment}</p>
          </div>
        ))
      ) : (
        <section className='flex flex-col gap-2 [textShadow:0_0_7px_cyan]'>
          <ExclamationCircleIcon className='mx-auto flex h-8 w-8 items-center justify-center rounded-full bg-cyan-400 dark:bg-emerald-500 text-white sm:h-12 sm:w-12' />
          <h3 className='mt-4 text-center font-medium dark:[textShadow:0_0_7px_white] sm:text-lg'>No reviews yet</h3>
        </section>
      )}
      {!userAlreadyReviewed && (
        <section className='flex flex-col gap-3'>
          <div className='flex overflow-hidden rounded-md border-2 border-black dark:border-gray-400'>
            <input
              className='flex-1 dark:bg-black px-2 text-blue-400 placeholder:text-cyan-400 dark:text-emerald-600 outline-0 dark:placeholder:text-emerald-600'
              value={reviewInput.comment}
              maxLength={200}
              onChange={e => setReviewInput(prev => ({ ...prev, comment: e.target.value }))}
              placeholder='what do you think of it?'
            />
            <StarIcon
              className='h-10 w-10 cursor-pointer dark:text-emerald-500 text-white bg-gray-900 p-2'
              onClick={hydrateSendReview}
            />
          </div>
          <div
            className='m-auto flex max-w-min items-center'
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseLeave}
            onMouseLeave={handleMouseLeave}
          >
            {[...Array(5)].map((_, index) => (
              <motion.div
                key={index}
                className='cursor-pointer'
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
function SecondCard({ product, index, setIndex, chosenOptions, push }: SecondCardProps) {
  const { refreshUser } = useUserContext()
  const {
    cart: { cartItems, setCartItems },
  } = useLayoutContext()

  async function handleAddToBag() {
    const res = await addToBag(product._id, 1, chosenOptions)
    if (!res) return
    if (res.redirect) push(res.redirect)
    else if (res.cart) {
      toast.success('Added !')
      refreshUser()
      const newCart = [...cartItems]
      newCart.push({
        chosenOptions,
        image: product.image,
        name: product.name,
        price: product.price,
        noBgImages: product.noBgImages,
        qty: 1,
      })
      setCartItems(newCart)
    }
  }

  return (
    <>
      <section>
        <h2 className='pb-2 text-3xl tracking-wider text-white dark:[textShadow:0_0_7px_white] sm:text-4xl'>{product.name}</h2>
        <h4 className='pb-4 text-xs dark:text-green-500 text-white [textShadow:0_0_10px_cyan] dark:[textShadow:0_0_10px_green] sm:text-sm'>
          {product.slogan}
        </h4>
      </section>
      <section className='relative m-auto aspect-video max-w-full flex-1'>
        <Image
          src={product.noBgImages[index.color].images[index.mainImage]}
          fill={true}
          alt={`Xphoria-${product.name}`}
          quality={100}
        />
      </section>
      <section className='relative mx-auto mt-auto flex w-fit justify-center gap-5 pt-4'>
        {product.noBgImages[index.color].images.map((img, i) => (
          <div
            key={`Xphoria-img-${i}`}
            className={`flex aspect-video w-14 items-center rounded-md transition-all border-white dark:border-emerald-700 p-1
            ${index.mainImage === i ? 'border-2' : 'border-[1px] border-cyan-400'}`}
            onMouseOver={() => setIndex(prev => ({ ...prev, mainImage: i }))}
          >
            <Image
              src={img}
              alt={`Xphoria-${product.name}${i}`}
              quality={100}
              width={1200}
              height={1200}
            />
          </div>
        ))}
      </section>
      <h2
        className={`absolute -bottom-5 left-1/2 -translate-x-1/2 cursor-pointer bg-black text-black dark:text-white
         transition hover:scale-110 ${styles.loopingBorder} whitespace-nowrap [text-shadow:0_0_4px_white]`}
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
      <h2 className='pb-2 text-3xl font-black tracking-wider text-white dark:[textShadow:0_0_7px_white] sm:text-4xl'>Customize</h2>
      <h3 className='text-3xl font-bold [textShadow:0_0_5px_white]'>{product.price}$</h3>
      <section className='mx-auto mb-auto mt-4 flex w-fit flex-col gap-5'>
        <section>
          <h2>select size</h2>
          <div
            className='rounded-md bg-gradient-to-tr dark:from-emerald-900 dark:to-green-400
           from-cyan-200 to-cyan-400 dark:bg-gray-900 bg-opacity-80 px-4 py-2'
          >
            <h3 className='mb-1 font-black'>{chosenOptions.size}</h3>
            <div className='flex justify-around gap-3'>
              {product.noBgImages[index.color].sizes.map((size, i) => (
                <h2
                  className={`cursor-pointer rounded-lg bg-white text-cyan-400 dark:text-white dark:bg-[hsla(0,0%,0%,.8)] p-2
                      ${chosenOptions.size === size ? 'scale-125' : ''}`}
                  onClick={() => setChosenOptions(prev => ({ ...prev, size }))}
                  key={`sizes-pick-${i}`}
                >
                  {size}
                </h2>
              ))}
            </div>
          </div>
        </section>
        <section className='font-mono'>
          <h2>select colour</h2>
          <div
            className='rounded-md bg-gradient-to-tr dark:from-emerald-900 dark:to-green-400
           from-cyan-200 to-cyan-400 dark:bg-gray-900 bg-opacity-80 px-4 py-2'
          >
            <h3
              className='mb-2 rounded-md px-2 py-1 text-2xl shadow-[0_0_15px_10px_inset]'
              style={{
                color: chosenOptions.color,
                textShadow: colord(chosenOptions.color).isDark() ? `0 0 10px ${colord(chosenOptions.color).invert().toHslString()}` : '',
              }}
            >
              {chosenOptions.colorName}
            </h3>
            <div className='flex justify-around gap-3'>
              {product.noBgImages.map((obj, i) => (
                <div
                  onClick={() => changeColor(i, obj.color, obj.colorName)}
                  className={`inline-block h-6 w-6 cursor-pointer rounded-full [border:1px_solid_black]
                      ${index.color === i ? 'scale-125' : ''}`}
                  key={`color-pick-${i}`}
                  style={{ backgroundColor: obj.color }}
                />
              ))}
            </div>
          </div>
        </section>
      </section>
    </>
  )
}

interface props {
  product: DisplayProduct
  showModal: boolean
  setShowModal: Dispatch<SetStateAction<boolean>>
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
