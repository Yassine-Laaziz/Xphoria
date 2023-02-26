"use client"

import axios from "axios"
import { ChangeEvent, FormEvent, useState } from "react"
import EmailLink from "../../../components/EmailLink"
import clientSideCheck from "../../../lib/utils/clientSideCheck"
import { User } from "../../../types"

export default function Signup() {
  const [user, setUser] = useState<User>({
    username: "",
    email: "",
  })

  // i'm going to use debounce here
  const [currentTimeout, setCurrentTimeout] = useState<NodeJS.Timeout>()
  const [error, setError] = useState<string>("")
  const [disabled, setDisabled] = useState<boolean>(false)

  function handleChange(
    e: ChangeEvent<HTMLInputElement>,
    field: "username" | "email"
  ) {
    if (error) setError("")
    const newUser = { ...user, [field]: e.target.value }
    setUser(newUser)
    clearTimeout(currentTimeout)
    let timeout: NodeJS.Timeout
    timeout = setTimeout(() => {
      const { err } = clientSideCheck(newUser)
      setError(err)
    }, 1000)
    setCurrentTimeout(timeout)
  }

  async function submit(e: FormEvent) {
    e.preventDefault()
    if (!clientSideCheck(user).isCorrect)
      return setError("All fields must be set!")
    setDisabled(true)
    axios
      .post("/api/auth/signup", { user })
      .then(() => setIsFirstSection(false))
      .catch((err) => setError(err.response.data.msg))
      .finally(() => setDisabled(false))
  }
  const [isFirstSection, setIsFirstSection] = useState<boolean>(true)

  return (
    <main className="min-h-[calc(100vh-76px)] flex items-center justify-center">
      <div className="border-4 border-gray-700 p-8 rounded-xl text-white max-w-xs w-full">
        {isFirstSection ? (
          <form
            onSubmit={(e) => submit(e)}
            className="flex flex-col gap-5
            mx-auto text-center c:rounded-md c:py-2 c:placeholder:text-gray-700
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
              disabled={disabled}
              type="submit"
              className="hover:text-teal-500 border-2 border-teal-400 duration-200 mx-auto px-5
          disabled:bg-gray-900"
            >
              sign me up
            </button>
            <div
              className={`text-rose-700 text-sm font-bold
              ${error ? "animate-fadeIn" : "animate-fadeOut"}`}
            >
              {error}
            </div>
          </form>
        ) : <EmailLink email={user.email} goBack={() => setIsFirstSection(true)} /> }
      </div>
    </main>
  )
}
