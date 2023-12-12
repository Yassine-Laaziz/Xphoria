import Link from 'next/link'
import { CiLogin } from 'react-icons/ci'
import { FaUserPlus } from 'react-icons/fa6'

export default function Page() {
  return (
    <section
      className="flex flex-col flex-wrap gap-10 text-center text-white
         c:mx-auto c:rounded-xl c:px-4 c:py-4 dark:text-black"
    >
      <Link
        href="/Auth/Login"
        className="w-full flex-1 bg-black transition-all 
          hover:scale-110 hover:bg-gray-900 dark:bg-white dark:hover:bg-gray-300"
      >
        <CiLogin className="mx-auto text-7xl" />
        <h2 className="text-2xl font-bold">Login</h2>
        <p className="text-sm font-semibold text-gray-200 dark:text-gray-700">if you already have an account</p>
      </Link>
      <Link
        href="/Auth/Signup"
        className="w-full flex-1 bg-black transition-all 
          hover:scale-110 hover:bg-gray-900 dark:bg-white dark:hover:bg-gray-300"
      >
        <FaUserPlus className="mx-auto text-7xl" />
        <h2 className="text-2xl font-bold">Sign up</h2>
        <p className="text-sm font-semibold text-gray-200 dark:text-gray-700">if you don&apos;t have an account</p>
      </Link>
    </section>
  )
}
