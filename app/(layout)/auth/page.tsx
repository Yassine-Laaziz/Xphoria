import Link from 'next/link'
import { CiLogin } from 'react-icons/ci'
import { FaUserPlus } from 'react-icons/fa6'

export default function Page() {
  return (
    <section
      className='flex flex-wrap flex-col gap-10 text-center c:mx-auto
         text-white dark:text-black c:px-4 c:py-4 c:rounded-xl'
    >
      <Link
        href='/Auth/Login'
        className='bg-black hover:bg-gray-900 dark:bg-white dark:hover:bg-gray-300 
          w-full flex-1 transition-all hover:scale-110'
      >
        <CiLogin className='text-7xl mx-auto' />
        <h2 className='text-2xl font-bold'>Login</h2>
        <p className='text-sm text-gray-200 dark:text-gray-700 font-semibold'>if you already have an account</p>
      </Link>
      <Link
        href='/Auth/Signup'
        className='bg-black hover:bg-gray-900 dark:bg-white dark:hover:bg-gray-300 
          w-full flex-1 transition-all hover:scale-110'
      >
        <FaUserPlus className='text-7xl mx-auto' />
        <h2 className='text-2xl font-bold'>Sign up</h2>
        <p className='text-sm text-gray-200 dark:text-gray-700 font-semibold'>if you don't have an account</p>
      </Link>
    </section>
  )
}
