'use client'

import axios from 'axios'
import { redirect, useRouter, useSearchParams } from 'next/navigation'
import { useState, useEffect } from 'react'
import { MdMarkEmailRead, MdMarkEmailUnread } from 'react-icons/md'
import { BiMessageAltError } from 'react-icons/bi'
import Link from 'next/link'
import { TypingText } from '../../../../components/CustomTexts'
import { useUserContext } from '../../../../lib/contexts/UserContext'
import { getDatabaseUser } from '../../../../lib/serverFunctions/getUser'
import { FaSpinner } from 'react-icons/fa'

export default function verify() {
  const [status, setStatus] = useState<'pending' | 'success' | 'error'>('pending')

  const searchParams = useSearchParams()
  const { setUser } = useUserContext()
  const { push } = useRouter()
  useEffect(() => {
    let user_token: string | null = ''
    if (searchParams) user_token = searchParams.get('t')
    if (user_token) {
      axios
        .post('/api/auth/verify', { user_token })
        .then(async () => {
          setStatus('success')
          const updatedUser = await getDatabaseUser()
          if (!updatedUser) return
          setUser(updatedUser)
          setTimeout(() => push('/'), 20000)
        })
        .catch(() => {
          setStatus('error')
          setTimeout(() => push('/Auth/Signup'), 10000)
        })
    } else () => setStatus('error')
  }, [])

  const icon = 'text-7xl mx-auto mb-5'

  return (
    <div className='text-center'>
      {status === 'pending' && (
        <>
          <MdMarkEmailUnread className={icon} />
          <FaSpinner className='animate-spin mx-auto' />
          <TypingText title='verifying..' />
        </>
      )}
      {status === 'success' && (
        <>
          <MdMarkEmailRead className={icon} />
          <TypingText title='Verified & logged in successfully!' />
          <Link
            href='/'
            className='mx-auto my-2 block w-fit border-2 rounded-lg border-blue-800 px-4 py-2'
          >
            Home
          </Link>
        </>
      )}
      {status === 'error' && (
        <>
          <BiMessageAltError className={icon} />
          <p className='c:font-bold c:text-blue-700 c:underline'>
            too much time passed since we sent you the verification email, please <Link href='/Auth/Login'>Login</Link> or{' '}
            <Link href='/Auth/Signup'>Sign up</Link> again
          </p>
        </>
      )}
    </div>
  )
}
