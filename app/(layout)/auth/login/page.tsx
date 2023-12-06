'use client'

import axios from 'axios'
import { useState, FormEvent, ChangeEvent } from 'react'
import EmailLink from '../../../../components/EmailLink'
import { err } from '../../../../lib/constants'
import Link from 'next/link'

export default function () {
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
    <form
      onSubmit={submit}
      className='flex flex-col gap-5'
    >
      <h1 className='text-center font-bold text-3xl'>Login</h1>
      <div className='flex flex-col gap-1'>
        <input
          onChange={handleChange}
          placeholder='Enter your email address'
          className='rounded-lg py-3 text-semibold pl-2 dark:text-emerald-500 text-cyan-400 shadow-2xl
          bg-black dark:bg-white placeholder:text-white dark:placeholder:text-black placeholder:font-bold font-bold'
          autoComplete='email'
          autoFocus
        />
        <button
          disabled={disabled}
          type='submit'
          className='py-2 text-lg border-2 dark:border-teal-400 rounded-lg duration-200 dark:hover:text-teal-500
        disabled:bg-gray-900 border-cyan-400 hover:text-cyan-500 bg-black text-white'
        >
          Login
        </button>
      </div>
      <div className='text-center text-rose-700'>{error}</div>
      <Link
        href='/Auth/Signup'
        className='mt-6 text-black font-semibold dark:text-white dark:shadow-[0_0_30px_1px_inset_white] px-4 py-2 w-fit rounded-lg'
      >
        no account? <span className='text-cyan-400 dark:text-emerald-700'>sign up!</span>
      </Link>
    </form>
  ) : (
    <EmailLink
      email={email}
      goBack={() => setIsFirstSection(true)}
    />
  )
}
