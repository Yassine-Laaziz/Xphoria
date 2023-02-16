"use client"
import { TfiBag } from "react-icons/Tfi"
import { MdManageAccounts } from "react-icons/md"
import Link from "next/link"
import { useState } from "react"

export default function Navbar({
  brand,
  loggedIn,
}: {
  brand: string
  loggedIn: boolean
}): JSX.Element {
  const [show, setShow] = useState<boolean>(false)
  
  return (
    <nav className="px-8 py-2 sm:px-16 sm:py-4 md:px-24 md:py-6 mx-auto flex justify-between z-50 gap-8 items-center">
      <Link href="/" className="font-extrabold text-lg text-white">
        {brand}
      </Link>
      <div className="relative">
        <MdManageAccounts
          className="cursor-pointer text-2xl text-emerald-500 hover:scale-125 transition-all duration-300"
          onClick={() => setShow((prev) => (prev ? false : true))}
        />
        {show && (
          <div className="absolute top-full left-1/2 -translate-x-1/2 w-fit whitespace-nowrap z-[9999]">
            <div
              className="relative flex flex-col rounded-2xl border-4 border-gray-900 text-white p-1
              c:px-6 c:py-2 font-black bg-black text-center"
            >
              {!loggedIn ? (
                <>
                  <Link
                    href="/auth/login"
                    className="border-b-2 border-b-gray-800 hover:text-emerald-500 transition-all duration-150"
                  >
                    LOG IN
                  </Link>
                  <Link
                    href="/auth/signup"
                    className="hover:text-emerald-500 transition-all duration-150"
                  >
                    SIGN UP
                  </Link>
                </>
              ) : (
                <Link
                  href="/auth/logout"
                  className="hover:text-emerald-500 transition-all duration-150"
                >
                  LOG OUT
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
      <TfiBag className="cursor-pointer text-xl text-emerald-500 hover:scale-125 transition-all duration-300" />
    </nav>
  )
}
