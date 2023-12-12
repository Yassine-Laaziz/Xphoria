'use client'
import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { FaUserAstronaut } from 'react-icons/fa'
import Link from 'next/link'
import Image from 'next/image'
import classNames from '../lib/utils/ClassNames'
import { useUserContext } from '../lib/contexts/UserContext'
import { useCartContext } from '../lib/contexts/CartContext'
import axios from 'axios'
import { BsCart } from 'react-icons/bs'
import { User } from '../types'
import Switch from './ToggleSwitch'
import { usePathname } from 'next/navigation'

export default function Navbar() {
  const { setShowCart } = useCartContext()
  const { user, setUser } = useUserContext()
  const pathname = usePathname()

  const navigation = [
    { name: 'Dashboard', href: '/', current: pathname === '/' },
    { name: 'Checkout', href: '/Checkout', current: pathname.startsWith('/Checkout') },
    { name: 'Signup & Login', href: '/Auth', current: pathname.startsWith('/Auth') },
  ]

  function signOut() {
    const initializedUser = new User('', '', '', [], [], [])
    axios.post('/api/auth/expire').then(() => setUser(initializedUser))
  }

  return (
    <Disclosure
      as="nav"
      className="z-40 border-b-2 border-black bg-gradient-to-b from-sky-400 to-cyan-200 dark:from-gray-900 dark:to-gray-800"
    >
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button
                  className="inline-flex items-center justify-center rounded-md p-2 text-gray-400
                hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                >
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <h2 className="self-center text-lg font-bold text-white">Xphoria</h2>
                <div className="hidden border-l-2 border-gray-200 pl-4 sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {navigation.map(item => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          item.current
                            ? 'cursor-default bg-sky-500 font-bold text-white dark:bg-green-500'
                            : 'bg-gray-700 text-white transition-all duration-200 hover:bg-sky-400 dark:bg-gray-600 dark:hover:bg-emerald-700',
                          'rounded-md px-3 py-2 text-sm font-medium'
                        )}
                        aria-current={item.current ? 'page' : undefined}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              <Menu className="relative ml-3 rounded-3xl p-1 shadow-[black_inset_0_0_50px]" as="div">
                <div className="flex items-center gap-5 sm:gap-7">
                  {/* Theme Toggle Switch */}
                  <Switch />
                  {user.username ? (
                    <>
                      <button className="focus:outline-none" onClick={() => setShowCart(true)}>
                        <span className="sr-only">Open cart menu</span>
                        <BsCart className="h-8 w-8 text-sky-400 dark:text-emerald-500" />
                      </button>
                      <Menu.Button className="focus:outline-none">
                        <span className="sr-only">Open user menu</span>
                        <div className="overflow-hidden rounded-full">
                          {user.img ? (
                            <Image src={user.img} alt={`${user.username} image`} />
                          ) : (
                            <FaUserAstronaut className="h-8 w-8 text-cyan-400 dark:text-emerald-500" />
                          )}
                        </div>
                      </Menu.Button>
                    </>
                  ) : (
                    <Link
                      className="mr-2 rounded-md border-2 px-3 py-2 font-bold text-white transition-all hover:border-sky-500 dark:hover:border-green-300"
                      href="/Auth"
                    >
                      SIGN IN
                    </Link>
                  )}
                </div>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    {user.username ? (
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            onClick={signOut}
                            className={classNames(active ? 'bg-gray-100' : '', 'block w-full px-4 py-2 text-sm text-gray-700')}
                          >
                            Sign out
                          </button>
                        )}
                      </Menu.Item>
                    ) : (
                      <>
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              href="/Auth/Login"
                              className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                            >
                              Login
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              href="/Auth/Signup"
                              className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                            >
                              Sign up
                            </Link>
                          )}
                        </Menu.Item>
                      </>
                    )}
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map(item => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                    'block rounded-md px-3 py-2 text-base font-medium'
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}
