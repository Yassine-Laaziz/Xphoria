'use client'

import { useLayoutContext } from '../lib/contexts/LayoutContext'
import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { CartItemWithData } from '../types'
import { addToBag } from '../lib/serverActions'
import { removeFromBag } from '../lib/serverActions'
import { loadStripe } from '@stripe/stripe-js'
import { pay } from '../lib/serverActions/Stripe'

export default function CartModal() {
  const {
    cart: { showCart, setShowCart, cartItems },
  } = useLayoutContext()
  // @ts-ignore
  const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)
  return (
    <Transition.Root
      show={showCart}
      as={Fragment}
    >
      <Dialog
        as='div'
        className='relative z-10'
        onClose={setShowCart}
      >
        <Transition.Child
          as={Fragment}
          enter='ease-in-out duration-500'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in-out duration-500'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' />
        </Transition.Child>

        <div className='fixed inset-0 overflow-hidden'>
          <div className='absolute inset-0 overflow-hidden'>
            <div className='pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10'>
              <Transition.Child
                as={Fragment}
                enter='transform transition ease-in-out duration-500 sm:duration-700'
                enterFrom='translate-x-full'
                enterTo='translate-x-0'
                leave='transform transition ease-in-out duration-500 sm:duration-700'
                leaveFrom='translate-x-0'
                leaveTo='translate-x-full'
              >
                <Dialog.Panel className='pointer-events-auto w-screen max-w-md'>
                  <div className='flex h-full flex-col overflow-y-scroll dark:bg-gray-800 bg-white shadow-xl'>
                    <div className='flex-1 overflow-y-auto px-4 py-6 sm:px-6'>
                      <div className='flex items-start justify-between'>
                        <Dialog.Title className='text-lg font-medium dark:text-gray-300 text-gray-900'>Shopping cart</Dialog.Title>
                        <div className='ml-3 flex h-7 items-center'>
                          <button
                            type='button'
                            className='-m-2 p-2 text-gray-400 dark:hover:text-gray-300 hover:text-gray-500'
                            onClick={() => setShowCart(false)}
                          >
                            <span className='sr-only'>Close panel</span>
                            <XMarkIcon
                              className='h-6 w-6'
                              aria-hidden='true'
                            />
                          </button>
                        </div>
                      </div>

                      <div className='mt-8'>
                        <div className='flow-root'>
                          <ul
                            role='list'
                            className='-my-6 divide-y divide-gray-200'
                          >
                            {cartItems[0] && cartItems.map(item => <CartItem item={item} />)}
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className='border-t border-gray-200 px-4 py-6 sm:px-6'>
                      <div className='flex justify-between text-base font-medium dark:text-gray-300 text-gray-900'>
                        <p>Subtotal</p>
                        <p>$262.00</p>
                      </div>
                      <p className='mt-0.5 text-sm dark:text-gray-300 text-gray-500'>Shipping and taxes calculated at checkout.</p>
                      <div className='mt-6'>
                        <button
                          onClick={pay}
                          className='flex items-center justify-center rounded-md border border-transparent w-full
                           bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700'
                        >
                          Checkout
                        </button>
                      </div>
                      <div className='mt-6 flex justify-center text-center text-sm dark:text-gray-200 text-gray-500'>
                        <p>
                          or{' '}
                          <button
                            type='button'
                            className='font-medium text-indigo-600 hover:text-indigo-500'
                            onClick={() => setShowCart(false)}
                          >
                            Continue Shopping
                            <span aria-hidden='true'> &rarr;</span>
                          </button>
                        </p>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

function CartItem({ item }: { item: CartItemWithData }) {
  return (
    <li
      key={item.name + item.chosenOptions}
      className='flex py-6'
    >
      <div className='h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200'>
        <img
          src={item.image}
          alt={item.name + item.chosenOptions}
          className='h-full w-full object-cover object-center'
        />
      </div>

      <div className='ml-4 flex flex-1 flex-col'>
        <div>
          <div className='flex justify-between text-base font-medium text-gray-900'>
            <h3>{item.name}</h3>
            <p className='ml-4'>{item.price}</p>
          </div>
          <p className='mt-1 text-sm text-gray-500'>{item.chosenOptions.color}</p>
        </div>
        <div className='flex flex-1 items-end justify-between text-sm'>
          <p className='text-gray-500'>Qty {item.qty}</p>

          <div className='flex'>
            <button
              type='button'
              className='font-medium text-indigo-600 hover:text-indigo-500'
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    </li>
  )
}
