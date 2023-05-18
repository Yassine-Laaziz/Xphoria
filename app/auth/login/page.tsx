'use client'

import axios from 'axios'
import { useState, FormEvent, ChangeEvent } from 'react'
import EmailLink from '../../../components/EmailLink'
import { err } from '../../../lib/constants'

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
    <form onSubmit={submit} className="flex flex-col gap-5">
      <input
        onChange={handleChange}
        placeholder="Enter your email address"
        className="text-blue-700 rounded-lg py-3 pl-2"
        autoComplete="email"
      />
      <button
        disabled={disabled}
        className="rounded-xl border-2 border-blue-700 py-2 disabled:text-gray-500"
      >
        Login
      </button>
      <div className="text-rose-700 text-center">{error}</div>
    </form>
  ) : (
    <EmailLink email={email} goBack={() => setIsFirstSection(true)} />
  )
}
