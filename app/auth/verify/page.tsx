'use client'

import axios from 'axios'
import { useSearchParams } from 'next/navigation'
import { useState, useEffect } from 'react'
import { MdMarkEmailRead, MdMarkEmailUnread } from 'react-icons/md'
import { BiMessageAltError } from 'react-icons/bi'
import Link from 'next/link'
import { TypingText } from '../../../components/CustomTexts'

export default function verify() {
  const [status, setStatus] = useState<'pending' | 'success' | 'error'>(
    'pending'
  )

  const searchParams = useSearchParams()
  useEffect(() => {
    let jwtToken: string | null = ''
    if (searchParams) jwtToken = searchParams.get('t')
    if (jwtToken) {
      axios
        .post('/api/auth/verify', { jwtToken })
        .then(() => setStatus('success'))
        .catch(() => setStatus('error'))
    } else () => setStatus('error')
  }, [])

  const icon = 'text-7xl mx-auto mb-5'

  return (
    <div className="text-center">
      {status === 'pending' && (
        <>
          <MdMarkEmailUnread className={icon} />
          <TypingText title="verifying.." />
        </>
      )}
      {status === 'success' && (
        <>
          <MdMarkEmailRead className={icon} />
          <TypingText title="Verified & logged in successfully!" />
          <Link
            href="/"
            className="block w-fit mx-auto my-2 px-4 py-2 border-blue-800"
          />
        </>
      )}
      {status === 'error' && (
        <>
          <BiMessageAltError className={icon} />
          <p className="c:text-blue-700 c:font-bold c:underline">
            too much time passed since we sent you the verification email,
            please <Link href="/auth/login">Login</Link> or{' '}
            <Link href="/auth/signup">Sign up</Link> again
          </p>
        </>
      )}
    </div>
  )
}
