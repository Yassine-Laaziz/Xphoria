"use client"

import { ChangeEvent, FormEvent, useState } from "react"
import clientSideCheck from "../../../lib/utils/clientSideCheck"
import { User } from "../../../types"

export default function Signup() {
  const [user, setUser] = useState<User>({
    username: "",
    email: "",
  })

  // i'm going to use debounce here
  const [currentTimeout, setCurrentTimeout] = useState<NodeJS.Timeout>()

  function handleChange(
    e: ChangeEvent<HTMLInputElement>,
    field: "username" | "email"
  ) {
    if (error.showErr) setError((prev) => ({ ...prev, showErr: false }))
    const newUser = { ...user, [field]: e.target.value }
    setUser(newUser)
    clearTimeout(currentTimeout)
    let timeout: NodeJS.Timeout
    timeout = setTimeout(() => clientSideCheck(newUser, setError), 1000)
    setCurrentTimeout(timeout)
  }

  const [error, setError] = useState<{ msg: string; showErr: boolean }>({
    msg: "",
    showErr: false,
  })

  function submit(e: FormEvent) {
    e.preventDefault()
    if (!clientSideCheck(user, setError)) return
  }

  return (
    <div className="min-h-screen">
      <form
        onSubmit={(e) => submit(e)}
        className="flex flex-col gap-5 border-4 border-gray-700 p-8 rounded-xl text-white
        mx-auto my-9 max-w-xs text-center c:rounded-md c:py-2 c:placeholder:text-gray-700
        c:placeholder:font-bold  focus-visible:c:outline-teal-600 
        [&>input]:font-black [&>input]:pl-1 [&>input]:text-emerald-500"
      >
        <h1>SIGN UP</h1>
        <input
          placeholder="username"
          value={user.username}
          onChange={(e) => handleChange(e, "username")}
          spellCheck={false}
        />
        <input
          placeholder="email"
          value={user.email}
          onChange={(e) => handleChange(e, "email")}
          spellCheck={false}
        />
        <button
          type="submit"
          className="hover:text-teal-500 border-2 border-teal-400 duration-200 mx-auto px-5"
        >
          sign me up
        </button>
        <div
          className={`text-red-600 text-sm pt-2 pb-1
          ${error.showErr ? "animate-fadeIn" : "animate-fadeOut"}`}
        >
          {error.msg}
        </div>
      </form>
    </div>
  )
}
