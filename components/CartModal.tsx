'use client'

import { useLayoutContext } from '../lib/contexts/LayoutContext'
import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { CartItemWithData } from '../types'
import { addToBag, removeFromBag } from '../lib/serverFunctions/product'
import { pay } from '../lib/serverActions/Stripe'
import { loadStripe } from '@stripe/stripe-js'

export default function CartModal() {
  const {
    cart: { showCart, setShowCart, cartItems },
  } = useLayoutContext()

  const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)
  return (
    <Transition.Root show={showCart} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setShowCart}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl dark:bg-gray-800">
                    <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                      <div className="flex items-start justify-between">
                        <Dialog.Title className="text-lg font-medium text-gray-900 dark:text-gray-300">Shopping cart</Dialog.Title>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="-m-2 p-2 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
                            onClick={() => setShowCart(false)}
                          >
                            <span className="sr-only">Close panel</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>

                      <div className="mt-8">
                        <div className="flow-root">
                          <ul role="list" className="-my-6 divide-y divide-gray-200">
                            {cartItems[0] && cartItems.map(item => <CartItem item={item} />)}
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                      <div className="flex justify-between text-base font-medium text-gray-900 dark:text-gray-300">
                        <p>Subtotal</p>
                        <p>$262.00</p>
                      </div>
                      <p className="mt-0.5 text-sm text-gray-500 dark:text-gray-300">Shipping and taxes calculated at checkout.</p>
                      <div className="mt-6">
                        <button
                          onClick={pay}
                          className="flex w-full items-center justify-center rounded-md border border-transparent
                           bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                        >
                          Checkout
                        </button>
                      </div>
                      <div className="mt-6 flex justify-center text-center text-sm text-gray-500 dark:text-gray-200">
                        <p>
                          or{' '}
                          <button
                            type="button"
                            className="font-medium text-indigo-600 hover:text-indigo-500"
                            onClick={() => setShowCart(false)}
                          >
                            Continue Shopping
                            <span aria-hidden="true"> &rarr;</span>
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

export function CartItem({ item: { name, slogan, price, image, options } }: { item: CartItemWithData }) {
  return (
    <div className="mb-4 flex flex-col rounded-md bg-white p-4 shadow-sm">
      <div className="flex flex-row items-center">
        <img src={image} alt={name} className="mr-4 h-32 w-32 rounded-lg object-cover" />
        <div>
          <h3 className="mb-2 text-xl font-semibold text-gray-800">{name}</h3>
          {slogan && <p className="mb-2 text-gray-600">{slogan}</p>}
          <p className="text-2xl font-bold text-gray-800">${price}</p>
        </div>
      </div>
      {options.length > 0 && (
        <div className="mb-2 mt-4">
          <h4 className="mb-2 text-lg font-medium text-gray-800">Options:</h4>
          {options.map(option => (
            <div key={option.color} className="mb-2 flex flex-row items-center">
              <span className="mr-2 font-medium text-gray-800">{option.colorName}:</span>
              <span className="mr-2 h-4 w-4 rounded-full" style={{ backgroundColor: option.color }}></span>
              {option.images.length > 0 && (
                <span className="text-gray-600">
                  (See
                  {option.images.length}
                  images)
                </span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
