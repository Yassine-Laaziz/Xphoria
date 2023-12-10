'use client'

import axios from 'axios'
import { useState, FormEvent, ChangeEvent } from 'react'
import EmailLink from '../../../../components/EmailLink'
import { err } from '../../../../lib/constants'
import Link from 'next/link'

export default function Page() {
  const [error, setError] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [disabled, setDisabled] = useState<boolean>(false)
  const [isFirstSection, setIsFirstSection] = useState<boolean>(true)

  // debounce
  const [currentTimeout, setCurrentTimeout] = useState<NodeJS.Timeout>()
  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    if (error) setError('')
    const newEmail = e.target.value
    setEmail(newEmail)
    clearTimeout(currentTimeout)
    const timeout = setTimeout(() => testEmail(newEmail), 1000)
    setCurrentTimeout(timeout)
  }

  function submit(e: FormEvent) {
    e.preventDefault()

    setDisabled(true)
    axios
      .post('/api/auth/login', { email })
      .then(() => {
        setIsFirstSection(false)
        setError('')
      })
      .catch(res => setError(res.response.data.err || err))
      .finally(() => setDisabled(false))
  }

  function testEmail(email: string): boolean {
    if (!email) return false
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      setError('this email address is not correct!')
      return false
    }
    return true
  }

  return isFirstSection ? (
    <form onSubmit={submit} className="flex flex-col gap-5">
      <h1 className="text-center text-3xl font-bold">Login</h1>
      <div className="flex flex-col gap-1">
        <input
          onChange={handleChange}
          placeholder="Enter your email address"
          className="text-semibold rounded-lg bg-black py-3 pl-2 font-bold text-cyan-400
          shadow-2xl placeholder:font-bold placeholder:text-white dark:bg-white dark:text-emerald-500 dark:placeholder:text-black"
          autoComplete="email"
          autoFocus
        />
        <button
          disabled={disabled}
          type="submit"
          className="rounded-lg border-2 border-cyan-400 bg-black py-2 text-lg text-white
        duration-200 hover:text-cyan-500 disabled:bg-gray-900 dark:border-teal-400 dark:hover:text-teal-500"
        >
          Login
        </button>
      </div>
      <div className="text-center text-rose-700">{error}</div>
      <Link
        href="/Auth/Signup"
        className="mt-6 w-fit rounded-lg px-4 py-2 font-semibold text-black dark:text-white dark:shadow-[0_0_30px_1px_inset_white]"
      >
        no account? <span className="text-cyan-400 dark:text-emerald-700">sign up!</span>
      </Link>
    </form>
  ) : (
    <EmailLink email={email} goBack={() => setIsFirstSection(true)} />
  )
}
