'use client'

import axios from 'axios'
import { ChangeEvent, FormEvent, useState } from 'react'
import EmailLink from '../../../../components/EmailLink'
import { err } from '../../../../lib/constants'
import clientSideCheck from '../../../../lib/utils/clientSideCheck'
import Link from 'next/link'

export default function Signup() {
  const [user, setUser] = useState({
    username: '',
    email: '',
  })

  // i'm going to use debounce here
  const [currentTimeout, setCurrentTimeout] = useState<NodeJS.Timeout>()
  const [error, setError] = useState<string>('')
  const [disabled, setDisabled] = useState<boolean>(false)

  function handleChange(e: ChangeEvent<HTMLInputElement>, field: 'username' | 'email') {
    if (error) setError('')
    const newUser = { ...user, [field]: e.target.value }
    setUser(newUser)
    clearTimeout(currentTimeout)
    const timeout = setTimeout(() => {
      const { err } = clientSideCheck(newUser)
      setError(err)
    }, 1000)
    setCurrentTimeout(timeout)
  }

  async function submit(e: FormEvent) {
    e.preventDefault()
    if (!clientSideCheck(user).isCorrect) return setError('All fields must be set!')
    setDisabled(true)
    axios
      .post('/api/auth/signup', { user })
      .then(() => {
        setIsFirstSection(false)
        setError('')
      })
      .catch(res => setError(res.response.data.err || err))
      .finally(() => setDisabled(false))
  }
  const [isFirstSection, setIsFirstSection] = useState<boolean>(true)

  return !isFirstSection ? (
    <EmailLink
      email={user.email}
      goBack={() => setIsFirstSection(true)}
    />
  ) : (
    <form
      onSubmit={e => submit(e)}
      className='mx-auto flex flex-col gap-5 text-center'
    >
      <h1 className='text-center font-bold text-3xl'>Sign up</h1>
      <div
        className='flex flex-col gap-2 c:rounded-md c:py-2 c:placeholder:font-bold dark:c:placeholder:text-gray-700
        c:placeholder:text-white [&>input]:text-cyan-400 focus-visible:c:outline-cyan-300 py-4 px-2
        dark:focus-visible:c:outline-teal-600 [&>input]:pl-1 [&>input]:font-bold dark:[&>input]:text-emerald-500'
      >
        <input
          className='bg-gray-900 dark:bg-white'
          placeholder='username'
          value={user.username}
          onChange={e => handleChange(e, 'username')}
          spellCheck={false}
          autoComplete='username'
          autoFocus
        />
        <input
          className='bg-gray-900 dark:bg-white'
          placeholder='email'
          value={user.email}
          onChange={e => handleChange(e, 'email')}
          spellCheck={false}
          autoComplete='email'
        />
        <button
          disabled={disabled}
          type='submit'
          className='mx-auto border-2 dark:border-teal-400 px-5 duration-200 dark:hover:text-teal-500
        disabled:bg-gray-900 border-cyan-400 hover:text-cyan-500 bg-black text-white'
        >
          Sign up
        </button>
      </div>
      <div
        className={`text-sm font-bold text-rose-700
        ${error ? 'animate-fadeIn' : 'animate-fadeOut'}`}
      >
        {error}
      </div>
      <Link
        href='/Auth/Login'
        className='mt-6 text-black font-semibold dark:text-white dark:shadow-[0_0_30px_1px_inset_white] px-4 py-2 w-fit rounded-lg'
      >
        have an account? <strong className='text-cyan-400 dark:text-emerald-700'>Login!</strong>
      </Link>
    </form>
  )
}
